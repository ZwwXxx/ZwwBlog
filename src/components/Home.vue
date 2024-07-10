<template>
    <div class="container" id="container">
        <!--            整体宽度，用来控制主体内容，外层设置父盒子便于flex布局居中-->
        <div class="content">

            <!-- 文章显示区域-->
            <div class="lside">
                <Article v-for="article in articleList"
                         :key="article.id"
                         :article="article"
                ></Article>
            </div>


            <!-- 侧边栏介绍 -->
            <div class="rside">
                <Description/>
            </div>


        </div>

    </div>
</template>

<script>
import Article from "@/components/Article.vue";
import Description from "@/components/Description.vue";
import Footer from "@/components/Footer.vue";
import {selectList} from "@/api/article";

export default {
    name: "Container",
    components: {Footer, Description, Article},
    data() {
        return {
            page: '1',
            limit: '5',
            searchObj: {},
            articleList: []
        }
    },
    activated() {
        console.log('TestComponent activated')
    },
    deactivated() {
        console.log('TestComponent deactivated')
    },
    created() {
        selectList(this.page, this.limit, this.searchObj).then(res => {
            // console.log(res)
            if (res.code === 20000) {
                this.articleList = res.data.records
            }
        })
    },
}
</script>

<style scoped>

/* 内容区 */
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 82px;
    margin-top: -82px;
}

.content {
    display: flex;
    width: 60%;
}


.lside {
    flex: 70%;
    max-width: 70%;
    overflow-wrap: break-word;
}


.rside {
    overflow: hidden;
    flex: 30%;
    height: 400px;
    background: #fff;
    margin-left: 20px;
    border-radius: 20px;
}

</style>
