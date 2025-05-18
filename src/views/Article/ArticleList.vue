<template>
  <div>

    <!--内容-->
    <el-row :gutter="25">
      <!--大屏占四分之一，小占1/2，极小就占全部-->
      <el-col v-for="article in articleList"
              style="transition: all 0.5s ease-in-out"
              :lg="8" :sm="12" :xs="24"
              :key="article.id">
        <ArticleCard :article="article"/>
      </el-col>
    </el-row>

    <!--分页插件-->
    <el-row style="margin: 20px 0">
      <div class="article-page">
        <el-pagination
            background
            :page-size.sync="queryParams.pageSize"
            layout=" prev, pager, next"
            :total="articleTotal"
            :current-page.sync="queryParams.pageNum"
            @current-change="getList"
            @size-change="getList"
        />
      </div>
    </el-row>
  </div>
</template>

<script>
import {selectList} from "@/api/article";
import DelayShow from "@/components/DelayShow.vue";
import ArticleCard from "@/views/Article/ArticleCard.vue";

export default {
  name: "ArticleList",
  components: {ArticleCard, DelayShow},
  data() {
    return {
      articleList: [],
      articleTotal: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 12,
        categoryId: null
      },
      hasMore: true,
      carouselArticleList: [],
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    getList() {
      this.$store.dispatch('openLoadingPage')
      selectList(this.queryParams).then(res => {
        this.articleList = res.rows
        this.articleTotal = res.total
      })
      this.$store.dispatch('closeLoadingPage')
    },
    getArticleList() {
      this.$store.dispatch('openLoadingPage')
      selectList(this.queryParams).then(res => {
        if (res.code === 200) {
          this.articleList = res.rows
          this.articleTotal = res.total
          this.$store.state.total = res.total
        }
        this.$store.dispatch('closeLoadingPage')
      })
    },

  }
}
</script>

<style scoped>
.article-page {
  width: 100%;
  min-height: 35px;
  text-align: center;
}
</style>
