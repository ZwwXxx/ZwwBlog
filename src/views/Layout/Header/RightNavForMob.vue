<script>
  export default {
    name: 'RightNavForMob',
    props: { menuColor: String },
    computed: {
      websiteInfo() {
        return this.$store.state.websiteInfo
      }
    },
    data() {
      return {
        //侧边菜单开关
        drawer: false,
        webTotals: [
          {
            totalName: '文章',
            total: 0,
            path: '',
            totalKey: 'articleTotal'
          },
          {
            totalName: '标签',
            total: 0,
            path: '',
            totalKey: 'tagTotal'
          },
          {
            totalName: '分类',
            total: 0,
            path: '',
            totalKey: 'categoryTotal'
          }
        ],
        menu: [
          {
            name: '首页',
            // icon: 'fa fa-home',
            url: '/home',
            svgUrl: require('@/assets/svg/menuHome.svg')
          },
          {
            name: '文章',
            url: '/article',
            // icon: 'fa fa-book',
            svgUrl: require('@/assets/svg/menuarticle.svg'),
            nodes: [
              {
                name: '分类',
                url: '/category/分类',
                // svgUrl:require("@/assets/svg/menulovephoto.svg")
                svgUrl: require('@/assets/svg/分类.svg')
              },
              {
                name: '标签',
                url: '/tag/标签',
                svgUrl: require('@/assets/svg/标签.svg')
              }
            ]
          },
          {
            name: '留言',
            // icon: 'fa fa-comments',
            url: '/message',
            svgUrl: require('@/assets/svg/留言-01.svg')
          },
          {
            name: '友链',
            // icon: 'fa fa-chain',
            url: '/friends',
            svgUrl: require('@/assets/svg/menufriend.svg')
          },
          {
            name: '说说',
            // icon: 'fa fa-comment',
            url: '/talk',
            svgUrl: require('@/assets/svg/靶子.svg')
          },
          {
            name: '相册',
            // icon: 'fa fa-file-text-o',
            url: '/album',
            svgUrl: require('@/assets/svg/相册2.svg')
          },
          {
            name: '归档',
            // icon: 'fa fa-archive',
            url: '/archive',
            svgUrl: require('@/assets/svg/archive.svg')
          },
          {
            name: '历程',
            // icon: 'fa fa-map',
            url: '/history',
            svgUrl: require('@/assets/svg/历史.svg')
          },
          {
            name: '关于',
            // icon: 'fa fa-info',
            url: '/about',
            svgUrl: require('@/assets/svg/关于.svg')
          }
        ],
        articleHoverIndex: 1,
        scrollTopStyle: {
          color: 'white'
        }
      }
    },
    methods: {
      // jumpTo(url) {
      //   this.drawer = false
      //   if (url === this.$route.path || !url) {
      //     return
      //   }
      //   this.$router.push(`${url}`)
      // }
      menuJumpTo() {
        this.drawer = false
      }
    }
  }
</script>

<template>
  <div>
    <div class="mobileMenu">
      <svg
        @click="drawer = true"
        style="cursor: pointer"
        t="1724639305783"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4273"
        width="30"
        height="30"
      >
        <path
          d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
          :fill="menuColor"
          p-id="4274"
        ></path>
      </svg>
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :append-to-body="true"
      size="300px"
      direction="rtl"
      :with-header="false"
    >
      <!--头像区域-->
      <div style="text-align: center; padding: 12px">
        <el-avatar :size="100" src="https://cdn.zww0891.fun/tree20247291655.png"></el-avatar>
      </div>
      <div class="web-total">
        <el-row :gutter="10">
          <el-col :span="8" v-for="(item, index) in websiteInfo" :key="index">
            <el-row class="totalName">{{ item.totalName }}</el-row>
            <el-row class="totalCount">{{ item.total }}</el-row>
          </el-col>
        </el-row>
      </div>
      <!--菜单区域-->
      <div class="menu">
        <el-menu router :default-active="this.$route.path" style="border-radius: 10px" @select="menuJumpTo">
          <div v-for="item in menu" :key="item.name">
            <!--一级菜单-->
            <el-menu-item :index="item.url" class="menu-item tada_parent" v-if="!item.nodes">
              <img v-if="item.svgUrl" :src="item.svgUrl" alt="" class="menu-svg-img tada" />
              <span>{{ item.name }}</span>
            </el-menu-item>
            <!--二级菜单目录-->
            <el-submenu :index="item.url" v-if="item.nodes" class="tada-parent">
              <template #title>
                <img v-if="item.svgUrl" :src="item.svgUrl" alt="" class="menu-svg-img tada" />
                <span>{{ item.name }}</span>
              </template>
              <!--节点-->
              <div v-for="subitem in item.nodes" :key="subitem.name">
                <el-menu-item :index="subitem.url" class="menu-item tada_parent">
                  <img v-if="subitem.svgUrl" :src="subitem.svgUrl" alt="" class="menu-svg-img tada" />
                  <span>{{ subitem.name }}</span>
                </el-menu-item>
              </div>
            </el-submenu>
          </div>
        </el-menu>
      </div>
    </el-drawer>
  </div>
</template>

<style scoped>
  .el-submenu /deep/ .el-submenu__title {
    border-radius: 10px;  
  }

  .el-submenu /deep/ .el-submenu__title:hover .tada {
    -webkit-animation-name: tada;
    animation-name: tada;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  .el-submenu /deep/ .el-submenu__title:hover {
    background-color: #5ecbc7;
  }
  @keyframes tada {
    0% {
      transform: scale(1);
    }

    10%,
    20% {
      transform: scale(0.8) rotate(-3deg);
    }

    30%,
    50%,
    70%,
    90% {
      transform: scale(1.3) rotate(3deg);
    }

    40%,
    60%,
    80% {
      transform: scale(1.3) rotate(-3deg);
    }

    100% {
      transform: scale(1) rotate(0);
    }
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    border-radius: 10px;
    cursor: pointer;
  }

  .menu-item:hover {
    background-color: #5ecbc7;
  }

  .menu-svg-img {
    margin-right: 10px;
    width: 21px;
    height: 21px;
  }

  .menu {
    padding: 0px 10px;
  }

  .web-total {
    padding: 0 30px;
    text-align: center;
    margin-bottom: 10px;
  }

  .totalName {
    font-size: 15px;
  }

  .totalCount {
    font-size: 25px;
  }

  /**
修改抽屉背景色
 */
  ::v-deep .el-drawer.rtl {
    background: linear-gradient(60deg, #ffebed 0, #c5deff 90%);
  }

  .mobileMenu {
    color: white;
    display: flex;
    height: 64px;
    justify-content: center;
    align-items: center;
  }
</style>
