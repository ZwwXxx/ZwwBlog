<template>
    <div class="bgImg">
        <!-- 顶部导航区域 -->
        <TopNav/>
        <!-- banner区域 -->
        <Banner/>
        <!--侧边栏-->

        <!-- 内容区域 -->
        <router-view ></router-view>
        <!-- 页脚区域 -->
        <Footer/>
        <!--提示框组件-->
        <!--<div class="alert alert-success alertBox hidden" ref="alertBox" role="alert">-->
        <!--    复制成功-->
        <!--</div>-->
    </div>
</template>

<script>
import Container from "@/views/Home/Home.vue";
import TopNav from "@/views/Layout/Header/TopNav.vue";
import Banner from "@/views/Layout/Banner/Banner.vue";
import Footer from "@/views/Layout/Footer/Footer.vue";
import Loading from "@/components/Loading.vue";

export default {
    name: 'LayOut',
    components: {Loading, Container, TopNav, Banner, Footer},
    data() {
        return {
            page: '1',
            limit: '5',
             queryParams: {},
            articleList: []
        }
    },
}
</script>

<style scoped>
.bgImg {
    /*background: linear-gradient(to right, #A0E4CB, #C4E3E5);*/
    /*background: url('@/assets/images/house.png') no-repeat fixed center bottom;*/
    /* 不重复图片铺满body */
    /*background-repeat: no-repeat;*/
    /*background-size: cover;*/
    /* 固定在视窗上，不会随滚动条和缩放的变化而变化 */
    /*background-attachment: fixed;*/
    /* 显示背景图的中心，靠下位置 */
    /*background-position: center bottom;*/


}
@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
