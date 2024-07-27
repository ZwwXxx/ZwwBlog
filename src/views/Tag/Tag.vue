<template>
    <div class="TagBox">
        <BgBoard :title="this.$route.params.tname"/>
        <el-card class="box-card cardBox" v-show="this.$route.params.tname==='标签'">
            <div class="title">分类-4</div>
            <div class="contentBox">
                <span
                        class="primaryContent"
                        v-for="tag in tagList" :key="tag"
                        @click="jumpTo(tag)"
                        :style="{
                          color:colorArray[randomNumForColor()],
                          fontSize:randomNumForFontSize()+'px',
                      }"
                >{{ tag }}</span>
            </div>
        </el-card>
        <!--展示具体文章-->
        <el-card class="box-card cardBox" v-show="this.$route.params.tname!='标签'">
            <Article v-for="article in articleList"
                     :key="article.id"
                     :article="article"

            ></Article>
        </el-card>
    </div>
</template>

<script>
import BgBoard from "@/components/BgBoard.vue";
import { selectListByTag} from "@/api/article";
import Article from "@/views/Article/Article.vue";

export default {
    name: "Tag",
    components: {Article, BgBoard},
    data(){
        return{
            page: '1',
            limit: '15',
            searchObj:{},
            tagList: ['Java','MySQL'],
            articleList:[],
            colorArray: ['#cc0035', '#a2af00', '#0077d5', ' #00a81f', '#7500bb', '#f66500'],
        }
    },
    methods:{
        randomNumForFontSize() {
            return Math.random() * 21 + 15
        },
        randomNumForColor() {
            return Math.floor(Math.random() * 6)
        },
        jumpTo(tag) {
            this.$router.push(`/tag/${tag}`)
            this.getArticleList()
        },
        getArticleList() {
            if (this.$route.params.cname === '标签') {
                return
            }
            this.loading = true
            this.searchObj.tags = this.$route.params.tname
            selectListByTag(this.page, this.limit, this.searchObj).then(res => {
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
.TagBox {
    padding-top: 60px;
    min-height: calc(100vh - 70px);
}
.cardBox {
    width: 60%;
    margin: auto;
    padding: 40px 30px;
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
