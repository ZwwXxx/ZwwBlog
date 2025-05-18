<template>
  <div class="mid-nav">
    <!-- 菜单区域 -->
    <div class="menu" v-for="(m, index) in menu" :key="index">
      <div
        @click="handleMenuClick(m)"
        :class="{ articleHover: articleHoverIndex === index }"
        style="font-weight: bold"
        class="tada_parent hvr-underline-from-left singleLinkForStyle"
      >
        <img v-if="m.svgUrl" :src="m.svgUrl" alt="" class="menu-svg-img tada" />
        <span>{{ m.name }}</span>
        <svg
          v-show="m.nodes"
          class="icon drop-img"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- 您的SVG路径 -->
        </svg>
      </div>

      <!-- 当出现有子结点的时候的渲染 -->
      <div class="nav-drop-down-wrapper">
        <div class="nav-drop-down my-card">
          <div v-for="(node, nodeIndex) in m.nodes" :key="nodeIndex" class="down-item hvr-fade">
            <div class="down-item-wrapper" @click="handleMenuClick(node)">
              <span>{{ node.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router'
  import { mapState, mapActions } from 'vuex'
  import LoginModal from '@/components/common/LoginModal.vue'
  export default {
    name: 'Midnav',
    components: { LoginModal },

    data() {
      return {
        menu: [
          {
            name: '首页',
            // icon: 'fa fa-home',
            url: '/home',
            svgUrl: require('@/assets/svg/menuHome.svg')
          },
          {
            name: '文章',
            // icon: 'fa fa-book',
            svgUrl: require('@/assets/svg/menuarticle.svg'),
            nodes: [
              {
                name: '📖分类',
                url: '/category/分类'
                // svgUrl:require("@/assets/svg/menulovephoto.svg")
              },
              {
                name: '🏷️标签',
                url: '/tag/标签'
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
          },
          {
            name: '登录',
            // icon: 'fa fa-info',
            //不做跳转页面了，而是做一个弹框，方便一点
            // url: '/auth',
            svgUrl: require('@/assets/svg/登录2.svg'),
            isModal: true
          }
        ],
        category: [
          {
            name: '📖分类',
            url: '/category/分类'
            // svgUrl:require("@/assets/svg/menulovephoto.svg")
          },
          {
            name: '🏷️标签',
            url: '/tag/标签'
          }
        ],
        articleHoverIndex: 1,
        scrollTopStyle: {
          color: 'white'
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.scrolling)
    },
    computed: {
      ...mapState('auth', ['loginModalVisible'])
    },
    methods: {
      ...mapActions('auth', ['showLoginModal', 'hideLoginModal']),
      router() {
        return router
      },
      scrolling() {
        // 兼容不同浏览器的距顶值
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop === 0) {
          this.scrollTopStyle.color = 'white'
        } else {
          this.scrollTopStyle.color = 'black'
        }
      },

      handleMenuClick(menuItem) {
        if (menuItem.isModal) {
          console.log('跳转！')
          this.showLoginModal() // 直接使用映射的 action
          console.log(this.$store.state.auth.loginModalVisible)
          return
        }
        this.jumpTo(menuItem.url)
      },
      jumpTo(url) {
        if (url === this.$route.path || !url) {
          return
        }
        this.$router.push(`${url}`)
      }
    }
  }
</script>

<style scoped>
  .mid-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: color 0.2s ease-in-out;
  }

  .menu {
    /* 由于子元素的a变成行内块元素有左右间隙，
  使用弹性布局往左浮动 */
    display: flex;
    white-space: nowrap;
    position: relative;
    cursor: pointer;
    /* 使用块级元素，方便给a设置宽高，让其占位置*/
    padding: 10px 0px;
    font-size: 16px;
    align-items: center;
    /*color: var(--text-color);*/
  }

  .singleLinkForStyle {
    padding: 10px 5px;
  }

  /*菜单悬浮下面的线*/
  /*hover.css样式*/
  /*hover.css样式*/
  .hvr-underline-from-left {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    overflow: hidden;
  }

  .hvr-underline-from-left:before {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    right: 100%;
    bottom: 0;
    background: #00b4d8;
    height: 5px;
    -webkit-transition-property: right;
    transition-property: right;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }

  .hvr-underline-from-left:hover:before,
  .hvr-underline-from-left:focus:before,
  .hvr-underline-from-left:active:before {
    right: 0;
  }

  .hvr-underline-from-left:hover {
    /*color: #2098D1 !important;*/
    -webkit-transition-property: right;
    transition-property: right;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }

  /*下拉箭头icon*/
  .drop-img {
    height: 15px !important;
    width: 15px !important;
    margin-left: 5px;
    transform: rotate(180deg);
  }

  /*下拉箭头悬浮时旋转*/
  .menu:hover .drop-img {
    transform: rotate(0deg);
    transition: transform 0.4s;
  }

  /*下拉菜单整体*/
  .menu .nav-drop-down-wrapper {
    position: absolute;
    top: 64px;
    left: 0;
    /*display: none;*/
    opacity: 0;
    transition: 0.4s;
  }

  /*下拉菜单body*/
  .nav-drop-down {
    background: white;
    color: black;
    min-width: 93px;
    font-weight: bold;
    font-size: 14px;
  }

  /*下拉菜单每个item*/
  .down-item-wrapper {
    padding: 15px 10px;
    text-align: center;
  }

  /*下拉菜单每个item*/
  .down-item-wrapper:hover {
    color: white;
    background: #39c5bb;
  }

  /*当鼠标悬浮式下拉菜单显示*/
  .nav-drop-down-wrapper {
    display: none;
    opacity: 0;
  }

  .menu:hover .nav-drop-down-wrapper {
    display: block;
    opacity: 1;
  }

  .menu i {
    margin-right: 5px;
  }

  .menu-svg-img {
    margin-right: 10px;
    width: 21px;
    height: 21px;
  }
</style>

