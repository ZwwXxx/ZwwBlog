<template>
  <!-- 文章内容-->

    <div class="article">
        <div class="article-title" @click="openArticle(article.id)">《{{ article.title }}》</div>
        <div class="article-summary" v-html="article.summary" />
        <div class="createTime">发布时间:{{ getTime(article.createTime) }}</div>
        <div class="updateTime">修改时间:{{ getTime(article.updateTime) }}</div>
        <div class="category">分类名:{{ article.categoryName }}</div>
    </div>
</template>


<script>
import common from "@/utils/timestampToTime";

export default {
    name: "Article",
    props: ['article'],
    methods: {
        getTime(createTime) {
            return common.timestampToTime(createTime, 1)
        },
        openArticle(articleId) {
            this.$store.commit('changeArticle', articleId)
            sessionStorage.setItem("ArticleId", articleId);
            this.$router.push({
                name:'ArticleDetail',
                params: {articleId}
                // path:'/articleDetail',
                // query: {articleId}
            })
        },

    }
}
</script>

<style scoped>

.article {
    border-radius: 20px;
    background: #fff;
    margin-bottom: 30px;
    height: 400px;
    overflow: hidden;
    position: relative;
}

.article-title {
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    padding: 15px 0;
    cursor: pointer;
    border-bottom: 3px solid black;
}

.article-summary{
    padding: 0 15px;
    height: 65%;
    overflow: hidden;
    margin-top: 20px;
    max-height: 220px;
}

.createTime {
    position: absolute;
    bottom: 50px;
}

.updateTime {
    position: absolute;
    bottom: 20px;
}

.category {
    position: absolute;
    bottom: 20px;
    right: 10px;
}
</style>
