<template>
    <div class="articleDetailBox">
        <div class="articleHeader">
            <div class="title">《{{ article.title }}》</div>
            <div class="createTime"><strong>发布日期</strong> : {{ getTime(article.createTime) }}</div>
            <div class="updateTime"><strong>更新日期</strong> : {{ getTime(article.updateTime) }}</div>
        </div>
        <div v-html="article.content" class="content">
        </div>

    </div>
</template>

<script>
import {selectById} from "@/api/article";
import common from "@/utils/timestampToTime";

export default {
    name: "ArticleDetail",
    data() {
        return {
            article: {},
            loading:false
        }
    },
    created() {
        this.loading=true
        selectById(this.$route.params.articleId).then(res => {
            if (res.code === 20000) {
                this.article = res.data
            }
        })
    },
    methods: {
        scrollTo() {
            const container = document.getElementById("container")
            container.scrollIntoView({
                block: "start",
                behavior: "smooth"
            })
        },
        getTime(time) {
            return common.timestampToTime(time, 1)
        }

    }

}
</script>

<style scoped>

.articleDetailBox {
    background: #fff;
    overflow: hidden;
    max-width: 1024px;
    margin: 0 auto 100px;
    overflow-wrap: break-word;
    border-radius: 20px;
    position: relative;
    top: 80px;
    min-height: calc(100vh - 163px);
}

.articleHeader {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid black;
}

.title {
    font-size: 40px;
    font-weight: bolder;
}

.content {
    padding: 0px 40px;
}

.createTime {
    margin: 15px 0;
}

</style>
