<template>
  <div class="right-navbox">
    <!--                输入框组件-->
    <!--<Search/>-->
    <!--<div class="NavAvatar">-->
    <!--&lt;!&ndash; 头像&ndash;&gt;-->
    <!--    <img src="@/assets/logo.png" alt="">-->
    <!--</div>-->
    <!--夜间模式区域-->
    <el-autocomplete
        v-model="keyWord"
        :fetch-suggestions="querySearch"
        placeholder="搜索文章标题"
        style="width: 120px"
        @select="handleSelect"
    />
    
  
    
    
    <!-- 个人中心弹框组件 -->
  </div>
</template>

<script>
import Search from "@/views/Layout/Header/Search.vue";
import {selectList} from "@/api/article";
import { mapActions } from 'vuex';
import UserCenterModal from "@/components/common/UserCenterModal.vue";

export default {
  name: "RightNav",
  components: {
    Search,
    UserCenterModal
  },
  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 99,
      },
      articleList: [],
      keyWord: '',
      titlesTest: [{value: "1"}],
      titles: JSON.parse(localStorage.getItem("articles")) || [],
      userAvatar: require('@/assets/images/default-avatar.png') // 默认头像
    }
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('userToken') !== null;
    }
  },
  created() {
    this.getArticleList();
    // 如果已登录，获取用户信息（包括头像）
    if (this.isLoggedIn) {
      this.getUserInfo();
    }
  },
  methods: {
    ...mapActions('auth', ['showLoginModal']),
    ...mapActions('user', ['showUserCenter']),
    transfer() {
      this.titles = this.articleList.map(item => {
        return {
          value: item.title,
          id: item.id
        }
      })
    },
    getArticleList() {
      // 已经存在本地存储则返回
      if (localStorage.getItem("articles")!== null) {
        return
      }
      // 获取文章列表给搜索栏跳转用的
      selectList(this.queryParams).then(res => {
        if (res.code === 200) {
          console.log(res.rows)
          this.articleList = res.rows
          this.transfer()
          localStorage.removeItem("articles")
          localStorage.setItem("articles", JSON.stringify(this.titles))
        }
      })
    },
    querySearch(queryString, cb) {
      if (queryString.trim() === '') {
        return
      }
      var titles = this.titles
      console.log(titles)
      var results = queryString ? titles.filter((title) => {
        return (title.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
      }) : titles
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelect(item) {
      if (item.id != this.$route.params.articleId) {
        this.$router.push(`/articleDetail/${item.id}`)
      }
    },
    // 新增方法
    showLogin() {
      this.showLoginModal();
    },
    handleCommand(command) {
      if (command === 'userCenter') {
        // 显示个人中心弹框，而不是路由跳转
        this.showUserCenter();
      } else if (command === 'logout') {
        this.logout();
      }
    },
    logout() {
      localStorage.removeItem('userToken');
      this.$message.success('退出登录成功');
      location.reload(); // 刷新页面以更新登录状态
    },
    getUserInfo() {
      // 调用获取用户信息的API
      import('@/api/user').then(module => {
        module.getUserInfo().then(res => {
          if (res.code === 200 && res.data.avatar) {
            this.userAvatar = res.data.avatar;
          }
        });
      });
    }
  }
}
</script>

<style scoped>
/* 将菜单项和搜索款夜间模式头像至右 */
.right-navbox {
}

.NavAvatar img {
  width: 40px;
  height: 40px;
}

.changeButton {
  background: var(--bg5);
  height: 20px;
  width: 40px;

  border-radius: 20px;
  position: relative;
  cursor: pointer;
}

.changeButton span {
}

.sun {
  position: absolute;
  background: white;
  height: 16px;
  width: 16px;
  border-radius: 20px;
  left: 2px;
  top: 2px;
  transition: 0.2s;
}

.moon {
  position: absolute;
  background: black;
  height: 16px;
  width: 16px;
  border-radius: 20px;
  left: 22px;
  top: 2px;
  transition: 0.2s;
}

.theme-transition-enter-active,
.theme-transition-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

/* 添加用户头像样式 */
.user-avatar {
  margin-left: 15px;
  cursor: pointer;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
