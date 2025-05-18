<template>
  <div class="TagBox">
    <BgBoard :title="this.$route.params.tname"/>
    <MyCard v-show="this.$route.params.tname==='标签'">
      <div class="title">标签-{{ tagList.length }}</div>
      <div class="contentBox">
                <span
                    class="primaryContent"
                    v-for="(tag,index) in tagList" :key="index"
                    @click="jumpTo(tag)"
                    :style="{
                          color:colorArray[randomNumForColor()],
                          fontSize:randomNumForFontSize()+'px',
                      }"
                >{{ tag.tagName }}</span>
      </div>
    </MyCard>
    <!--展示具体文章-->
    <MyCard v-show="this.$route.params.tname!='标签'">
      <Article v-for="article in articleList"
               :key="article.id"
               :article="article"

      ></Article>
    </MyCard>
  </div>
</template>

<script>
import BgBoard from "@/components/BgBoard.vue";
import {selectListByTag} from "@/api/article";
import Article from "@/views/Article/ArticleCard.vue";
import {selectList} from "@/api/tag";
import MyCard from "@/components/MyCard.vue";
import index from "vuex";

export default {
  name: "Tag",
  computed: {
    index() {
      return index
    }
  },
  components: {MyCard, Article, BgBoard},
  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 99
      },
      tagList: ['Java', 'MySQL'],
      articleList: [],
      colorArray: ['#cc0035', '#a2af00', '#0077d5', ' #00a81f', '#7500bb', '#f66500'],
    }
  },
  created() {
    selectList(this.queryParams).then(res => {
      if (res.code === 200) {
        this.tagList = res.rows
      }

    })
  },
  methods: {
    randomNumForFontSize() {
      return Math.random() * 21 + 15
    },
    randomNumForColor() {
      return Math.floor(Math.random() * 6)
    },
    jumpTo(tag) {
      this.$router.push(`/tag/${tag.tagName}`)
      this.getArticleList()
    },
    getArticleList() {
      //
      if (this.$route.params.tname === '标签') {
        console.log("666")
        return
      }
      this.$store.dispatch('openLoadingPage')
      this.queryParams.tags = this.$route.params.tname
      selectListByTag(this.queryParams).then(res => {
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
.TagBox {
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
