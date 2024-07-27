<template>
    <div class="aboutBox">
        <BgBoard title="归档" content="用文字留下岁月的痕迹"/>
        <el-card class="box-card cardBox">
            <div v-for="(item,index) in archive" :key="index">
                <h1>{{ item.year }}</h1>
                <el-timeline :reverse="reverse">
                    <el-timeline-item
                            v-for="(article, index) in item.articles"
                            :key="index"
                            :timestamp="getTime(article.createTime)">
                        <div class="title" @click="jumpTo(article.id)"> {{ article.title }}</div>
                    </el-timeline-item>
                </el-timeline>
                <!--<div v-for="article in item.articles" :key="article.id">-->
                <!--    <span>{{article.createTime}}</span>{{ article.title }}-->
                <!--</div>-->
            </div>
        </el-card>
    </div>
</template>

<script>
import BgBoard from "@/components/BgBoard.vue";

export default {
    name: "About",
    components: {BgBoard}
}
</script>

<style scoped>
.archiveBox {
    padding-top: 60px;
    min-height: calc(100vh - 70px);
}

.cardBox {
    width: 60%;
    margin: auto;
    padding: 0 !important;

}
</style>
