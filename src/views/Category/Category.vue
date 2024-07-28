<template>
    <div class="categoryBox">
        <BgBoard :title="this.$route.params.cname"/>
        <MyCard v-show="this.$route.params.cname==='分类'">
            <div class="title">分类-4</div>
            <div class="contentBox">
                <span
                        class="primaryContent"
                        v-for="category in categoryList" :key="category"
                        @click="jumpTo(category)"
                        :style="{
                          color:colorArray[randomNumForColor()],
                          fontSize:randomNumForFontSize()+'px',
                      }"
                >{{ category }}</span>
            </div>
        </MyCard>
        <MyCard  v-show="this.$route.params.cname!='分类'">
        <!--展示具体文章-->
            <Article v-for="article in articleList"
                     :key="article.id"
                     :article="article"

            ></Article>
        </MyCard>
    </div>
</template>

<script>
import Article from "@/views/Article/Article.vue";
import {selectList} from "@/api/article";
import Description from "@/components/SideBar/Description.vue";
import BgBoard from "@/components/BgBoard.vue";
import ArticleDetail from "@/views/Article/ArticleDetail.vue";
import MyCard from "@/components/MyCard.vue";

export default {
    name: "Category",
    data() {
        return {
            loading: false,
            page: '1',
            limit: '15',
            searchObj: {},
            articleList: [],
            categoryList: ['Java', 'MySQL', 'Vue2'],
            colorArray: ['#cc0035', '#a2af00', '#0077d5', ' #00a81f', '#7500bb', '#f66500'],
        }
    },
    watch: {
        '$route.params.cname': {
            handler() {
                this.getArticleList();
            }
        }
    },
    components: {MyCard, ArticleDetail, BgBoard, Description, Article},
    mounted() {
    },
    created() {
        this.getArticleList()
    },
    methods: {
        randomNumForFontSize() {
            return Math.random() * 21 + 15
        },
        randomNumForColor() {
            return Math.floor(Math.random() * 6)
        },
        jumpTo(categoryName) {
            this.$router.push(`/category/${categoryName}`)
        },
        getArticleList() {
            if (this.$route.params.cname === '分类') {
                return
            }
            this.loading = true
            this.searchObj.categoryName = this.$route.params.cname
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
    padding-top: 60px;
    min-height: calc(100vh - 70px);
}

.title {
    text-align: center;
    font-size: 26px;
    font-weight: bolder;
}

.contentBox {
    text-align: center;
    padding: 20px 0;
}

.primaryContent {
    margin: 0 20px;
    font-weight: bolder;
    cursor: pointer;
    transition: background-size 0.3s;
    background: linear-gradient(to right, #000000, #000000) no-repeat right bottom;
    background-size: 0 2px;

}

.primaryContent:hover {
    background-position-x: left;
    background-size: 100% 2px;
}
</style>
