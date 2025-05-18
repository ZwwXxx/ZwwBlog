<template>
  <div v-if="visible">
    <el-dialog
      title="个人中心"
      :visible.sync="visible"
      width="600px"
      :before-close="handleClose"
    >
      <el-tabs v-model="activeTab">
        <el-tab-pane label="个人资料" name="profile">
          <div class="user-header">
            <div class="avatar-container">
              <el-avatar :size="80" :src="userInfo.avatar || defaultAvatar"></el-avatar>
              <div class="avatar-upload">
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :http-request="handleAvatarUpload"
                  :show-file-list="false"
                  accept="image/*"
                >
                  <el-button size="mini" type="primary">更换头像</el-button>
                </el-upload>
              </div>
            </div>
            <div class="user-info">
              <h3>{{ userInfo.nickName || userInfo.userName }}</h3>
              <p>{{ userInfo.email || '未设置邮箱' }}</p>
            </div>
          </div>

          <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="userForm.userName" disabled></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="userForm.nickName"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="个性签名" prop="signature">
              <el-input type="textarea" v-model="userForm.signature"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateProfile">保存修改</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="修改密码" name="password">
          <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm" label-width="100px">
            <el-form-item label="原密码" prop="oldPassword">
              <el-input type="password" v-model="passwordForm.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input type="password" v-model="passwordForm.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input type="password" v-model="passwordForm.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changeUserPassword">修改密码</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo, changePassword, uploadAvatar } from '@/api/user';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserCenterModal',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.passwordForm.confirmPassword !== '') {
          this.$refs.passwordForm.validateField('confirmPassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    
    return {
      defaultAvatar: require('@/assets/images/default-avatar.png'),
      activeTab: 'profile',
      userInfo: {},
      userForm: {
        userName: '',
        nickName: '',
        email: '',
        signature: ''
      },
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      },
      passwordRules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState('user', ['userCenterVisible']),
    visible: {
      get() {
        return this.userCenterVisible;
      },
      set(value) {
        this[value ? 'showUserCenter' : 'hideUserCenter']();
      }
    }
  },
  watch: {
    userCenterVisible(val) {
      if (val) {
        this.fetchUserInfo();
      }
    }
  },
  methods: {
    ...mapActions('user', ['showUserCenter', 'hideUserCenter']),
    fetchUserInfo() {
      getUserInfo().then(res => {
        if (res.code === 200) {
          this.userInfo = res.data;
          // 复制用户信息到表单
          this.userForm = {
            userName: this.userInfo.userName,
            nickName: this.userInfo.nickName,
            email: this.userInfo.email,
            signature: this.userInfo.signature
          };
        }
      });
    },
    updateProfile() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          updateUserInfo(this.userForm).then(res => {
            if (res.code === 200) {
              this.$message.success('个人资料更新成功');
              this.fetchUserInfo();
            } else {
              this.$message.error(res.msg || '更新失败');
            }
          });
        }
      });
    },
    changeUserPassword() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          changePassword(this.passwordForm).then(res => {
            if (res.code === 200) {
              this.$message.success('密码修改成功，请重新登录');
              this.passwordForm = {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
              };
              // 清除登录状态，关闭弹窗
              localStorage.removeItem('userToken');
              this.visible = false;
              location.reload(); // 刷新页面更新登录状态
            } else {
              this.$message.error(res.msg || '密码修改失败');
            }
          });
        }
      });
    },
    handleAvatarUpload(options) {
      const formData = new FormData();
      formData.append('file', options.file);
      
      uploadAvatar(formData).then(res => {
        if (res.code === 200) {
          this.$message.success('头像上传成功');
          this.fetchUserInfo();
        } else {
          this.$message.error(res.msg || '头像上传失败');
        }
      });
    },
    handleClose() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.user-header {
  display: flex;
  margin-bottom: 30px;
}

.avatar-container {
  margin-right: 20px;
  text-align: center;
}

.avatar-upload {
  margin-top: 10px;
}

.user-info {
  flex: 1;
}

.user-info h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.user-info p {
  color: #666;
  margin: 5px 0;
}
</style>