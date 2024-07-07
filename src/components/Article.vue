<template>
  <!-- 文章内容-->

    <div class="article">
        <div class="article-title">{{ article.title }}</div>
        <div class="article-content">
            {{ article.content }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Article",
    props: ['article']
}
</script>

<style scoped>



.article-title {
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    margin: 15px 0;
    cursor: pointer;
}


.article-content {
    padding: 0 15px;
}
</style>
