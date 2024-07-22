<template>
    <div class="categoryBox">
        <div class="introduce">{{ this.$route.params.cname }}</div>
        <!--            整体宽度，用来控制主体内容，外层设置父盒子便于flex布局居中-->
        <div class="content" v-show="!loading">

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
import Article from "@/views/Article/Article.vue";
import {selectList} from "@/api/article";
import Description from "@/components/Description.vue";

export default {
    name: "Category",
    data() {
        return {
            loading: false,
            page: '1',
            limit: '15',
            searchObj: {},
            articleList: []
        }
    },
    components: {Description, Article},
    mounted() {
        console.log(this.$route.params.cname)
    },
    created() {
        this.getArticleList()
    },
    methods: {
        getArticleList() {
            this.loading = true
            this.searchObj.categoryName=this.$route.params.cname
            selectList(this.page, this.limit, this.searchObj).then(res => {
                // console.log(res)
                if (res.code === 20000) {
                    this.articleList = res.data.records
                    this.$store.state.total = res.data.total
                }
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>
.categoryBox {
    padding-top: 76px;
    min-height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.introduce {
    width: 100%;
    height: 200px;
    line-height: 200px;
    font-size: 40px;
    background: var(--bg1);
    color: var(--text-color);
    text-align: center;
    margin-bottom: 50px;
}

.content {
    display: flex;
    width: 68%;
}


.lside {
    flex: 70%;
    overflow-wrap: break-word;
}


.rside {
    overflow: hidden;
    flex: 30%;
    height: 400px;
    background: var(--bg1);
    margin-left: 20px;
    border-radius: 20px;
}
</style>
