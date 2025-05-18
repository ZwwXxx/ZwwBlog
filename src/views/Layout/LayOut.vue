<template>
  <div class="bgImg">
    <!--登录弹框-->
    <LoginModal/>
    <!-- 顶部导航区域 -->
    <TopNav/>
    <!-- banner区域 -->
    <Banner/>
    <!--侧边栏-->
    <!-- 内容区域 -->
    <keep-alive exclude="Photos">
      <!--整体的身体来点左右距不然太贴了不好看~-->
      <router-view ></router-view>
    </keep-alive>
    <!--      <router-view ></router-view>-->
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
import {getWebsiteInfo} from "@/api/website";
import LoginModal from "@/components/common/LoginModal.vue";

export default {
  name: 'LayOut',
  components: {LoginModal, Loading, Container, TopNav, Banner, Footer},
  computed: {
    websiteInfo() {
      return this.$store.state.websiteInfo
    },
  },
  data() {
    return {
      page: '1',
      limit: '5',
      queryParams: {},
      articleList: [],
      // 初始化网站统计信息
      webTotals: [
        {
          totalName: '文章',
          total: 0,
          path: "",
          totalKey: 'articleTotal'
        },
        {
          totalName: '标签',
          total: 0,
          path: "",
          totalKey: 'tagTotal'
        },
        {
          totalName: '分类',
          total: 0,
          path: "",
          totalKey: 'categoryTotal'
        }
      ]
    }
  },
  mounted() {
    // 之前没有存数据的情况下
    if (this.websiteInfo === null || !this.websiteInfo) {
      getWebsiteInfo().then(res => {
        if (res.code === 200) {
          console.log('右侧个人介绍为空!')
          this.rawTotal = res.data
          this.addTotal()

        }
      })
      return
    }
    // 之前有存数据的情况下.直接加工
    this.addTotal()

  },
  methods: {
    addTotal() {
      this.webTotals.forEach(item => {
        item.total = this.rawTotal[item.totalKey]
      })
      this.$store.commit('site/SET_WEBSITE_INFO', this.webTotals)
    }
  }
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
