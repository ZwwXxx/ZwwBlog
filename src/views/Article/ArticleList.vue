<template>
    <div>

        <!--内容-->
        <el-row :gutter="25">
            <!--大屏占四分之一，小占1/2，极小就占全部-->
            <el-col v-for="article in articleList" :lg="8" :sm="12" :xs="24" :key="article.id">
                <ArticleCard :article="article"/>
            </el-col>
        </el-row>

        <!--分页插件-->
        <el-row style="margin-top: 20px">
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
            searchObj: {},
            articleList: [],
            articleTotal: 0,
            queryParams: {
                pageNum: 1,
                pageSize: 9,
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
            selectList(this.queryParams.pageNum, this.queryParams.pageSize, this.searchObj).then(res => {
                this.articleList = res.data.records
                this.articleTotal = res.data.total
            })
            this.$store.dispatch('closeLoadingPage')
        },
        getArticleList() {
            this.$store.dispatch('openLoadingPage')
            selectList(this.queryParams.pageNum, this.queryParams.pageSize, this.searchObj).then(res => {
                // console.log(res)
                if (res.code === 20000) {
                    this.articleList = res.data.records
                    this.articleTotal = res.data.total
                    this.$store.state.total = res.data.total
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
