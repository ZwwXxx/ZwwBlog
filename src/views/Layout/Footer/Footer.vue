<template>
    <div class="footer">
        <div class="title">尽人事,听天命</div>
        <div class="beian">
            备案号：<a href="https://beian.miit.gov.cn/">粤ICP备2023129239号</a>
        </div>
        <!--<div class="toTop themeBg themeText" :style="dynamicStyles" @click="toTop">-->
        <!--    <i class="fa fa-arrow-up"></i>-->
        <!--</div>-->
        <p id="ghbdages">
            <a class="github-badge" target="_blank" href="https://cn.vuejs.org/"
               style="margin-inline:5px" title="前端框架为vue2">
                <img alt="Static Badge" src="https://img.shields.io/badge/Frontend-vue-blue?logo=Vue.js">
            </a>
            <a class="github-badge" target="_blank" href="https://spring.io/" style="margin-inline:5px"
               title="后端框架采用Spring">
                <img alt="Static Badge" src="https://img.shields.io/badge/Backend-Spring-green?logo=Spring">
            </a>
            <!--<a class="github-badge" target="_blank" href="https://www.elastic.co/cn/elasticsearch" style="margin-inline:5px"-->
            <!--   title="本站全文检索基于ElasticSearch">-->
            <!--    <img alt="Static Badge" src="https://img.shields.io/badge/Search-ES-%23005571?logo=ElasticSearch">-->
            <!--</a>-->
            <!--<a class="github-badge" target="_blank" href="https://redis.io/"-->
            <!--   style="margin-inline:5px" title="使用redis作为数据缓存">-->
            <!--    <img alt="Static Badge" src="https://img.shields.io/badge/Cache-Redis-%23DC382D?logo=Redis&logoColor=white">-->
            <!--</a>-->
            <a class="github-badge" target="_blank" href="https://spring.io/projects/spring-boot" style="margin-inline:5px"
               title="后端脚手架采用SpringBoot">
                <img alt="Static Badge" src="https://img.shields.io/badge/Scaffold-SpringBoot-%236DB33F?logo=SpringBoot">
            </a>
            <a class="github-badge" target="_blank" href="https://cn.aliyun.com/" style="margin-inline:5px"
               title="阿里云提供云服务">
                <img alt="Static Badge" src="https://img.shields.io/badge/Cloud-Aliyun-orange">
            </a>
            <a class="github-badge" target="_blank" href="https://www.qiniu.com/" style="margin-inline:5px"
               title="七牛云提供对象存储">
                <img alt="Static Badge" src="https://img.shields.io/badge/OOS-qiniu-%2307BEFF">
            </a>
            <a class="github-badge" target="_blank" href="https://gitee.com/"
               style="margin-inline:5px" title="本网站源码由Gitee提供存储仓库">
                <img alt="Static Badge" src="https://img.shields.io/badge/Source-Gitee-%23DC382D?logo=Gitee">
            </a>
        </p>
    </div>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            dynamicStyles: {
                opacity: 0
            }
        }
    },
    mounted() {
        // 当所有组件都挂载好后，监听窗口的滚动事件，触发回调
        window.addEventListener('scroll', this.handleWindowScroll)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleWindowScroll);
    },
    methods: {
        handleWindowScroll() {
            if (window.scrollY > document.documentElement.clientHeight / 2) {
                this.dynamicStyles.opacity = 1
            } else {
                this.dynamicStyles.opacity = 0
            }
        },
        toTop() {
            scrollTo(0, 0)
        }
    }
}
</script>

<style scoped>
.themeText {
    color: var(--text-color);
}

.themeBg {
    background: var(--bg3);
}

/* 页脚 */
.footer {
    text-align: center;
    width: 100%;
    /*background: var(--bg1);*/
    /*背景渐变动画*/
    background: linear-gradient(-90deg, #f17a4f, #e17394, #40a2c7, #18d0a4);
    background-size: 300% 300%;
    animation: gradientAnimation 20s ease infinite;
    padding: 15px;
    /*font-weight: bolder;*/
    margin-top: 40px;
    border-radius: 30px 30px 0 0;
}

@keyframes gradientAnimation {
    0% {
        background-position: 0 0%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 0%;
    }
}

.toTop {
    position: fixed;
    bottom: 80px;
    right: 30px;
    display: block;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-radius: 100%;
    transition: 0.3s ease;
    cursor: pointer;
}
.title{
    color: #ffffff;
}
p{
    margin: 0;
}
.beian a {
    transition: 0.2s ease-in-out;
    color: var(--text-color);

}
.beian a:hover {
    color: orange;

}
</style>
