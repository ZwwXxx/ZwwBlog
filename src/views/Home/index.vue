<script>
import {selectList} from "@/api/article";
import Banner from "@/components/Banner.vue";
import Footer from "@/components/Footer.vue";
import TopNav from "@/components/TopNav.vue";
import Container from "@/components/Container.vue";

export default {
    name: "index",
    components: {Container, TopNav, Banner ,Footer},
    data() {
        return {
            page: '1',
            limit: '5',
            searchObj: {},
            articleList: []
        }
    },
    created() {
        selectList(this.page, this.limit, this.searchObj).then(res => {
            // console.log(res)
            if (res.code === 20000) {
                this.articleList = res.data.records
                console.log(this.articleList)
                console.log(res.data.records)
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
        }
    }
}

</script>
<template>
    <div class="background">
        <!-- 顶部导航区域 -->
        <TopNav/>

        <!-- banner区域 -->
        <Banner/>

        <!-- 内容区域 -->
        <!--        身体部位，用来控制主体区的flex居中-->
        <Container :articleList="articleList"/>
        <!-- 页脚区域 -->
        <Footer/>
    </div>
</template>


<style scoped>


.background {
    background: url('@/assets/images/house.png') no-repeat fixed center bottom;
    /* 不重复图片铺满body */
    /*background-repeat: no-repeat;*/
    background-size: cover;
    /* 固定在视窗上，不会随滚动条和缩放的变化而变化 */
    /*background-attachment: fixed;*/
    /* 显示背景图的中心，靠下位置 */
    /*background-position: center bottom;*/
}



</style>
