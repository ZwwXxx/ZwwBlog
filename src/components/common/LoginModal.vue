<!--
*@LoginModal
*@author niemengshi
*@date 2025/5/16 8:48
-->
<template>
  <!-- 全屏红色背景层（用于测试） -->
  <div
    v-if="visible"
    style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 9999"
    @mousedown.stop
  >
    <!-- Element UI 的对话框 -->
    <el-dialog 
      :visible.sync="visible" 
      width="400px" 
      :before-close="beforeDialogClose"
      :close-on-click-modal="true">
      <!-- 自定义加粗标题 -->
      <template slot="title">
        <span style="font-weight: bolder; font-size: 24px">{{ isLogin ? '登录' : '注册' }}</span>
      </template>
      <!-- 切换提示文本 -->
      <div style="margin: 0 0 40px 0">
        <span v-if="isLogin">
          还没有账号？
          <a href="#" @click.prevent="toggleTab" style="color: #00a2cc">去注册</a>
        </span>
        <span v-else>
          已有账号？
          <a href="#" @click.prevent="toggleTab" style="color: #00a2cc">去登录</a>
        </span>
      </div>
      <!-- 统一表单容器 -->
      <div class="simple-login-form">
        <!-- 用户名（始终显示） -->
        <el-input placeholder="用户名" v-model="formData.username" style="margin-bottom: 15px"></el-input>

        <!-- 昵称（仅注册显示） -->
        <el-input v-if="!isLogin" placeholder="昵称" v-model="formData.nickname" style="margin-bottom: 15px"></el-input>

        <!-- 密码（始终显示） -->
        <el-input placeholder="密码" type="password" v-model="formData.password" style="margin-bottom: 15px"></el-input>

        <!-- 确认密码（仅注册显示） -->
        <el-input v-if="!isLogin" placeholder="确认密码" type="password" v-model="formData.confirmPassword"></el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">
          {{ isLogin ? '登录' : '注册' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
        mousedownCls: [],
        mouseupCls: [],
        formData: {
          username: '',
          password: '',
          nickName: '',
          confirmPassword: ''
        },
        isLogin: true,
        dialogVisible: true
      }
    },
    computed: {
      ...mapState('auth', ['loginModalVisible']),
      visible: {
        get() {
          return this.loginModalVisible
        },
        set(value) {
          this[value ? 'showLoginModal' : 'hideLoginModal']()
        }
      }
    },
    methods: {
      ...mapActions('auth', ['showLoginModal', 'hideLoginModal']),
      dialogMousedown(e) {
        this.mousedownCls = [...e.target.classList]
        console.log('鼠标按下',this.mousedownCls);
        
      },
      dialogMouseup(e) {
        this.mouseupCls = [...e.target.classList]
          console.log('鼠标抬起',this.mouseupCls);
      },
      beforeDialogClose(done) {
        const isWrapper =
          this.mousedownCls.includes('el-dialog__wrapper') && this.mouseupCls.includes('el-dialog__wrapper')
        const isClose = this.mousedownCls.includes('el-dialog__close') && this.mouseupCls.includes('el-dialog__close')
        if (isWrapper || isClose) {
          done()
        }
      },
      toggleTab() {
        this.isLogin = !this.isLogin
      },
      handleClose() {
        this.hideLoginModal()
      },
      submitForm() {
        if (this.isLogin) {
          this.handleLogin()
        } else {
          this.handleRegister()
        }
      },

      handleLogin() {
        console.log('登录数据:', {
          username: this.formData.username,
          password: this.formData.password
        })
      },
      handleRegister() {
        if (this.formData.password !== this.formData.confirmPassword) {
          this.$message.error('两次密码输入不一致')
          return
        }
        console.log('注册数据:', this.formData)
      }
    }
  }
</script>
<style></style>
