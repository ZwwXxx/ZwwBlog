<template>
   <div>
     <el-button @click="dialogVisible = true">打开登录</el-button>
     <el-dialog
       title="登录"
       :visible.sync="dialogVisible"
       width="30%">
       <div>
         <h3>欢迎登录!</h3>
         <p>请输入您的账号密码</p>
         <el-form :model="loginForm" ref="loginForm">
           <el-form-item label="用户名" prop="username">
             <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
           </el-form-item>
           <el-form-item label="密码" prop="password">
             <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
           </el-form-item>
         </el-form>
       </div>
       <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click="login">登录</el-button>
       </span>
     </el-dialog>
   </div>
</template>

<script>
import {login} from "@/api/user";
import Cookies from 'js-cookie'
export default {
    name: "index",
    data() {
        return {
            dialogVisible: false,
            loginForm: {
                username: '',
                password: ''
            },
        }
    },
    methods: {
        login() {
            login(this.loginForm).then(res => {
                if (res.code === 200) {
                    const {data} = res
                    this.$message.success('登录成功');
                    localStorage.setItem('userToken', data.token)
                    Cookies.set('userToken',data.token)
                    this.dialogVisible = false;
                    this.$router.push('/home')
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
