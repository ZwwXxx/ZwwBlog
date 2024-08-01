<template>
    <div class="new-article"  v-show="!$store.state.loading">
        <div class="new-article-title tada_parent">
            <svg t="1701008609344" width="25" height="25" class="icon tada" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="7903">
                <path d="M512 0c282.752 0 512 229.248 512 512s-229.248 512-512 512S0 794.752 0 512 229.248 0 512 0z m-21.333333 170.666667A64 64 0 0 0 426.666667 234.666667v298.666666l0.426666 7.68 0.981334 5.632 1.706666 6.570667c1.152 3.413333 2.56 6.698667 4.181334 9.813333l0.597333 1.152 3.114667 5.034667 3.413333 4.693333 2.688 2.986667 2.773333 2.773333 4.266667 3.754667 4.693333 3.413333 3.157334 1.92 221.696 128a64 64 0 0 0 64-110.848L554.666667 496.384V234.666667A64 64 0 0 0 490.666667 170.666667z"
                      fill="#39C5BB" p-id="7904"></path>
            </svg>
            <p>最新文章</p>
        </div>
        <NewArticleCard  v-for="(article,index) in newList" :key="index" :article="article" />
    </div>
</template>

<script>
import {getHotArticleList, getNewArticleList} from "@/api/article";
import NewArticleCard from "@/views/Layout/RightList/newArticleCard.vue";

export default {
    name: "newArticle",
    components: {NewArticleCard},
    data() {
        return {
            hotList: null,
            newList: null,
        }
    },
    methods: {
        getHotArticleList() {
            getHotArticleList().then((response) => {
                if (response.code === 20000) {
                    this.hotList = response.data;
                }
            });
        },
        getNewArticleList() {
            getNewArticleList().then((response) => {
                if (response.code === 20000) {
                    this.newList = response.data;
                }
            });
        },
    },
    created() {
        this.getHotArticleList();
        this.getNewArticleList();
    }
}
</script>

<style scoped>
.new-article {
    padding: 10px;
    background: white;
    margin: 20px 0px;
    border-radius: 20px;
}
.new-article-title {
    display: flex;
    align-items: flex-end;
    margin: 20px 10px;
}
</style>
