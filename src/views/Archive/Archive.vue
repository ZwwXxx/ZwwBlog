<template>
    <div class="archiveBox">
        <BgBoard title="归档" content="用文字留下岁月的痕迹"/>
        <MyCard>
            <div v-for="(item,index) in archive" :key="index">
                <h1>{{ item.year }}</h1>
                <el-timeline :reverse="false">
                    <el-timeline-item
                            v-for="(article, index) in item.articles"
                            :key="index"
                            :timestamp="getTime(article.createTime)">
                        <span class="title" @click="jumpTo(article.id)"> {{ article.title }}</span>
                    </el-timeline-item>
                </el-timeline>
                <!--<div v-for="article in item.articles" :key="article.id">-->
                <!--    <span>{{article.createTime}}</span>{{ article.title }}-->
                <!--</div>-->
            </div>
        </MyCard>
    </div>
</template>

<script>
import BgBoard from "@/components/BgBoard.vue";
import {getArchive} from "@/api/article";
import common from "@/utils/timestampToTime";
import MyCard from "@/components/MyCard.vue";

export default {
    name: "Archive",
    components: {MyCard, BgBoard},
    data() {
        return {
            archive: []
        }
    },
    created() {
        getArchive().then(res => {
            if (res.code === 200) {
                this.archive = res.data
            }
        })
    },
    methods: {
        getTime(time) {
            return common.timestampToTime(time, 0)
        },
        jumpTo(articleId){
            // 存id，评论指向对应文章id,归为该文章下的评论
            this.$store.commit('changeArticle', articleId)
            sessionStorage.setItem("ArticleId", articleId);
            this.$router.push({
                name: 'ArticleDetail',
                params: {articleId}
                // path:'/articleDetail',
                // query: {articleId}
            })
        }
    }
}
</script>

<style scoped>
.archiveBox {
    min-height: calc(100vh - 70px);
}
.title{
    cursor: pointer
}
.title:hover{
    color: #c9001e;
}
</style>
