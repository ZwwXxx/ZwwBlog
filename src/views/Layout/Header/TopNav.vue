<template>

  <div class="navbar-main" :class="{isHide:isHide}" :style="[NavBg, scrollTopStyle]">

    <!--左侧导航栏部分-->
    <el-row>
      <el-col :xs="0">
        <LeftNav/>
      </el-col>

    </el-row>

    <el-row>
      <el-col :xs="0">
        <MidNav/>
      </el-col>
    </el-row>
    <!--右侧导航栏部分-->

    <el-row>
      <el-col :xs="0">
        <RightNav/>
      </el-col>
      <el-col :xs="24" :sm="0">
        <RightNavForMob :menuColor="menuColor"/>
      </el-col>
    </el-row>

    <!--登录弹框组件-->
  </div>
</template>

<script>
import RightNav from "@/views/Layout/Header/RightNav.vue";
import LeftNav from "@/views/Layout/Header/LeftNav.vue";
import MidNav from "@/views/Layout/Header/MidNav.vue";
import RightNavForMob from "@/views/Layout/Header/RightNavForMob.vue";
import LoginModal from "@/components/common/LoginModal.vue";

export default {
  name: "TopNav",
  components: {LoginModal, RightNavForMob, LeftNav, RightNav, MidNav},
  data() {
    return {
      isHide: false,
      lastToTop: 0,
      NavBg: {
        background: 'none'
      },
      scrollTopStyle: {
        color: 'white',
      },
      menuColor: '#000000'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollingToHideNav)
    window.addEventListener('scroll', this.scrollingToChangeTextColor)
  },
  methods: {
    scrollingToChangeTextColor() {
      // 兼容不同浏览器的距顶值
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop === 0) {
        this.scrollTopStyle.color = 'white'
        this.menuColor = '#ffffff'
      } else {
        this.scrollTopStyle.color = 'black'
        this.menuColor = '#000000'
      }
    },
    scrollingToHideNav() {
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
        this.NavBg.color = 'white'
        this.NavBg.boxShadow = ''
      } else {
        this.NavBg.background = 'linear-gradient(60deg, #ffebed 0, #c5deff 90%)'
        this.NavBg.backdropFilter = 'blur(10px)'
        this.NavBg.color = 'black'
      }
    }
  }
}
</script>

<style scoped>
/**
遮罩高度降低，否则点击不了菜单
 */


/* 顶部导航栏 */
.navbar-main {
  /*background: var(--bg1);*/
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 28px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  transition: all 0.2s;
  width: 100%;
  z-index: 1010;
  background-color: rgba(0, 0, 0, 0.2); /* 调整透明度和颜色 */

  /*backdrop-filter: blur(10px);*/
  /*opacity: 0.7;*/
}

.isHide {
  top: -76px
}
</style>
