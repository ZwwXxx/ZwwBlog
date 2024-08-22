<template>
    <div class="homeContainer">
        <!--            整体宽度，用来控制主体内容，外层设置父盒子便于flex布局居中-->
        <div class="content">
            <!--&lt;!&ndash; 文章显示区域&ndash;&gt;-->
            <!--<div class="lside">-->
            <!--    <Article v-for="article in articleList"-->
            <!--             :key="article.id"-->
            <!--             :article="article"-->
            <!--    ></Article>-->
            <!--</div>-->


            <!--&lt;!&ndash; 侧边栏介绍 &ndash;&gt;-->
            <!--<div class="rside">-->
            <!--    <Description/>-->
            <!--</div>-->

            <!--100%为了用户ctrl+滚轮缩小视口时适应，-->
            <div style="width: 100%;">
                <el-row :gutter="25">
                    <el-col :lg="18" :md="24">
                        <ArticleList/>
                    </el-col>
                    <el-col :lg="6" :md="24">
                        <RightList/>
                    </el-col>
                </el-row>

            </div>
        </div>

    </div>
</template>

<script>
import Article from "@/views/Article/ArticleCard.vue";
import RightList from "@/views/Layout/RightList/RightList.vue";
import Footer from "@/views/Layout/Footer/Footer.vue";
import Loading from "@/components/Loading.vue";
import ArticleList from "@/views/Article/ArticleList.vue";
import DelayShow from "@/components/DelayShow.vue";

export default {
    name: "Container",
    components: {DelayShow, ArticleList, Loading, Footer, RightList, Article},
    data() {
        return {
            page: '1',
            limit: '99',
             queryParams: {},
            articleList: []
        }
    },
    activated() {
        console.log('TestComponent activated')
    },
    deactivated() {
        console.log('TestComponent deactivated')
    },
}
</script>

<style scoped>

/* 内容区 */
.homeContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    padding: 0 30px;
}

.content {
    margin: auto;
    display: flex;
    width: 100%;
    margin-top: 20px;
    padding-top: -20px;
}


.lside {
    flex: 75%;
    overflow-wrap: break-word;
}


.rside {
    flex: 25%;
    overflow: hidden;
    height: 400px;
    background: var(--bg1);
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

</style>
