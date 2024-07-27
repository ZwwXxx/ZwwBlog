<template>
    <div class="right-navbox">
        <!--                输入框组件-->
        <!--<Search/>-->
        <!--<div class="NavAvatar">-->
        <!--&lt;!&ndash; 头像&ndash;&gt;-->
        <!--    <img src="@/assets/logo.png" alt="">-->
        <!--</div>-->
        <!--夜间模式区域-->
        <el-autocomplete
                v-model="keyWord"
                class="inline-input"
                :fetch-suggestions="querySearch"
                placeholder="搜索文章标题"
                style="margin-right: 10px"
                @select="handleSelect"
        />
        <div>
            <div class="changeButton" @click="changeTheme">
                <transition name="theme-transition">
                <span :class="{'sun':this.$store.state.theme==='light','moon':this.$store.state.theme==='dark'}">
                </span>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Search from "@/components/Header/Search.vue";
import {selectList} from "@/api/article";

export default {
    name: "RightNav",
    components: {Search},
    data() {
        return {
            keyWord: '',
            titlesTest: [{value: "1"}],
            titles: JSON.parse(localStorage.getItem("articles")) || [],
        }
    },
    created() {
        this.getArticleList()
    },
    methods: {
        transfer() {
            this.titles = this.titles.map(item => {
                return {
                    value: item.title,
                    id: item.id
                }
            })
        },
        getArticleList() {
            if (localStorage.getItem("articles")) {
                console.log('本地存储有数据，不读取')
                return
            }
            console.log('本地存储无数据，读取')
            selectList(1, 99).then(res => {
                if (res.code === 20000) {
                    this.articleList = res.data.records
                    this.transfer()
                    localStorage.setItem("articles", JSON.stringify(this.titles))
                }
            })
        },
        querySearch(queryString, cb) {
            if (queryString.trim() === '') {
                return
            }
            var titles = this.titles
            var results = queryString ? titles.filter((title) => {
                return (title.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
            }) : titles
            // 调用 callback 返回建议列表的数据
            cb(results)
        },

        createStateFilter(queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) > 0);
            };
        },
        handleSelect(item) {
            if (item.id != this.$route.params.articleId) {
                this.$router.push(`/articleDetail/${item.id}`)
            }
            // window.location.reload()
        },
        changeTheme() {
            this.$store.commit('changeTheme')
        },
    }
}
</script>

<style scoped>
/* 将菜单项和搜索款夜间模式头像至右 */
.right-navbox {
    display: flex;
    align-items: center;
}

.NavAvatar img {
    width: 40px;
    height: 40px;
}

.changeButton {
    background: var(--bg5);
    height: 20px;
    width: 40px;

    border-radius: 20px;
    position: relative;
    cursor: pointer;
}

.changeButton span {
}

.sun {
    position: absolute;
    background: white;
    height: 16px;
    width: 16px;
    border-radius: 20px;
    left: 2px;
    top: 2px;
    transition: 0.2s;
}

.moon {
    position: absolute;
    background: black;
    height: 16px;
    width: 16px;
    border-radius: 20px;
    left: 22px;
    top: 2px;
    transition: 0.2s;
}

.theme-transition-enter-active,
.theme-transition-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}


</style>
