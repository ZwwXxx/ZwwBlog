<template>
    <div class="bgImg">
        <!-- 顶部导航区域 -->
        <TopNav/>
        <!-- banner区域 -->
        <Banner/>
        <!--侧边栏-->

        <!-- 内容区域 -->
        <router-view></router-view>
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
import TopNav from "@/components/Header/TopNav.vue";
import Banner from "@/components/Banner/Banner.vue";
import Footer from "@/components/Footer/Footer.vue";
import Loading from "@/components/Loading.vue";

export default {
    name: 'LayOut',
    components: {Loading, Container, TopNav, Banner, Footer},
    data() {
        return {
            page: '1',
            limit: '5',
            searchObj: {},
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

    /*绿色渐变*/
    background: linear-gradient(to right, #A0E4CB, #C4E3E5, #BDDFF0);
    /*肉色渐变*/
    /*background: linear-gradient(to right bottom, #c7be98, #ccb1bb, #9fbbbe, #96af7b);*/
    background-size: 400% 400%;
    animation: gradientAnimation 30s ease infinite;
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
