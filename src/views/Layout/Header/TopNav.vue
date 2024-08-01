<template>

    <div class="navbar-main" :class="{isHide:isHide}" :style="NavBg">

        <!--左侧导航栏部分-->
        <LeftNav/>


        <!--右侧导航栏部分-->
        <RightNav/>


    </div>
</template>

<script>
import RightNav from "@/views/Layout/Header/RightNav.vue";
import LeftNav from "@/views/Layout/Header/LeftNav.vue";

export default {
    name: "TopNav",
    components: {LeftNav, RightNav},
    data() {
        return {
            isHide: false,
            lastToTop: 0,
            NavBg: {
                background: 'none'
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrolling)
    },
    methods: {
        scrolling() {
            // console.log(document.documentElement.scrollTop||document.body.scrollTop)
            // 可视窗口顶部距离文档顶部的距离
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            // 与上次滚动所更新的距顶值做对比，如果是小于0，说明这次对比上次的距顶小，说明用户正在往上滚动，反之则反
            let compareLast = scrollTop - this.lastToTop
            this.lastToTop = scrollTop
            if (compareLast > 0) {
                this.isHide = true
            } else {
                this.isHide = false
            }

            if (scrollTop === 0) {
                this.NavBg.background = 'rgba(0, 0, 0, 0.2)'
                this.NavBg.color='white'
                this.NavBg.boxShadow = ''
            } else {
                this.NavBg.background = 'linear-gradient(60deg, #ffebed 0, #c5deff 90%)'
                this.NavBg.backdropFilter='blur(10px)'
                this.NavBg.color='black'
            }
        }
    }
}
</script>

<style scoped>

/* 顶部导航栏 */
.navbar-main {
    /*background: var(--bg1);*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 60px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    transition: all 0.3s;
    width: 100%;
    z-index: 8889;
    background-color: rgba(0, 0, 0, 0.2); /* 调整透明度和颜色 */
    /*backdrop-filter: blur(10px);*/
    /*opacity: 0.7;*/
}

.isHide {
    top: -76px
}
</style>
