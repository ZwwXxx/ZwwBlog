<template>
  <div class="categoryBox">
    <BgBoard :title="this.$route.params.cname"/>
    <MyCard v-show="this.$route.params.cname==='分类'">
      <div class="title">分类-{{ categoryList.length }}</div>
      <div class="contentBox">
                <span
                    class="primaryContent"
                    v-for="category in categoryList" :key="category.categoryName"
                    @click="jumpTo(category.categoryName)"
                    :style="{
                          color:colorArray[randomNumForColor()],
                          fontSize:randomNumForFontSize()+'px',
                      }"
                >{{ category.categoryName }}</span>
      </div>
    </MyCard>


    <MyCard v-show="this.$route.params.cname!='分类'" style="min-height: 100vh">
      <div class="reactLay">
        <Article v-for="article in articleList"
                 :key="article.id"
                 :article="article"
        ></Article>
      </div>
    </MyCard>
  </div>
</template>

<script>
import Article from "@/views/Article/ArticleCard.vue";
import {selectList} from "@/api/article";
import {listCategory} from "@/api/category";
import Description from "@/views/Layout/RightList/RightList.vue";
import BgBoard from "@/components/BgBoard.vue";
import ArticleDetail from "@/views/Article/ArticleDetail.vue";
import MyCard from "@/components/MyCard.vue";

export default {
  name: "Category",
  data() {
    return {
      loading: false,
      page: '1',
      limit: '15',
      queryParams: {
        page: '1',
        limit: '15'
      },
      articleList: [],
      // categoryList: ['Java', 'MySQL', 'Vue2'],
      categoryList: [],
      colorArray: ['#cc0035', '#a2af00', '#0077d5', ' #00a81f', '#7500bb', '#f66500'],
    }
  },
  watch: {
    '$route.params.cname': {
      handler() {
        this.getArticleList();
      }
    }
  },
  components: {MyCard, ArticleDetail, BgBoard, Description, Article},
  mounted() {
  },
  created() {
    this.getArticleList()
  },
  methods: {
    randomNumForFontSize() {
      return Math.random() * 21 + 15
    },
    randomNumForColor() {
      return Math.floor(Math.random() * 6)
    },
    jumpTo(categoryName) {
      this.$router.push(`/category/${categoryName}`)
    },
    getArticleList() {
      this.$store.dispatch('openLoadingPage')
      if (this.$route.params.cname === '分类') {
        // 查分类列表
        listCategory(this.queryParams).then(res => {
              // console.log(res)
              if (res.code === 200) {
                this.categoryList = res.rows
              }
              this.$store.dispatch('app/closeLoadingPage')
            }
        )
        return
      }
      this.queryParams.categoryName = this.$route.params.cname
      selectList(this.queryParams.pageNum, this.queryParams.pageSize, this.queryParams).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.articleList = res.rows
          this.$store.state.total = res.total
        }
        this.$store.dispatch('app/closeLoadingPage')
      })
    }
  }
}
</script>

<style scoped>
.reactLay {
  display: grid;
  grid-gap: 10px;
}

@media (min-width: 708px) {
  .reactLay{
  grid-template-columns: repeat(2, 1fr);
  }
}

.categoryBox {
  min-height: calc(100vh - 70px);
}

.title {
  text-align: center;
  font-size: 26px;
  font-weight: bolder;
}

.contentBox {
  text-align: center;
  padding: 20px 0;
}

.primaryContent {
  margin: 0 20px;
  font-weight: bolder;
  cursor: pointer;
  transition: background-size 0.3s;
  background: linear-gradient(to right, #000000, #000000) no-repeat right bottom;
  background-size: 0 2px;

}

.primaryContent:hover {
  background-position-x: left;
  background-size: 100% 2px;
}
</style>
