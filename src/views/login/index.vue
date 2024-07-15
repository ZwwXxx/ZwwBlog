<template>
    <div style="background:#006509;height: 100vh;display: flex;justify-content: center;align-items: center">
        <div style="background:#bbbbbb;width: 400px;height: 400px;border-radius: 20px;box-shadow: 0 0 10px rgba(0,0,0,0.4);padding: 20px">
            <h1 style="text-align: center">登录</h1>
            <div><span style="margin-right: 20px;">用户名</span> <input type="text" v-model="loginForm.username"></div>
            <div><span style="margin-right: 20px;">密码</span> <input type="text" v-model="loginForm.password"></div>
            <div @click="login" style="background:cornflowerblue;
            width: 40px;
            height: 40px;
            line-height: 40px ;
            text-align: center;
            border-radius: 10px;
            cursor: pointer;"
            >登录
            </div>
        </div>
    </div>
</template>

<script>
import {login} from "@/api/user";
import Cookies from 'js-cookie'
export default {
    name: "index",
    data() {
        return {
            loginForm: {
                username: '1',
                password: '1'
            },
        }
    },
    methods: {
        login() {
            login(this.loginForm).then(res => {
                if (res.code === 20000) {
                    const {data} = res
                    alert('登录成功')
                    localStorage.setItem('userToken', data.token)
                    Cookies.set('userToken',data.token)
                    this.$router.push('/home')
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
