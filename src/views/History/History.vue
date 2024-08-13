<template>
    <div class="historyBox">
        <BgBoard title="历程" content="记录网站的版本历程"/>
        <MyCard>
            <h1>2024</h1>
            <h2>7月</h2>
            <el-timeline :reverse="true">
                <el-timeline-item
                        v-for="(road, index) in historys"
                        :key="index"
                        :timestamp="getTime(road.time)">
                    <span class="title" > {{ road.title }}</span>
                </el-timeline-item>
            </el-timeline>
            <!--<div v-for="article in item.articles" :key="article.id">-->
            <!--    <span>{{article.createTime}}</span>{{ article.title }}-->
            <!--</div>-->
        </MyCard>
    </div>
</template>

<script>
import BgBoard from "@/components/BgBoard.vue";
import MyCard from "@/components/MyCard.vue";
import common from "@/utils/timestampToTime";

export default {
    name: "History",
    components: {MyCard, BgBoard},
    data() {
        return {
            historys: [
                {time:'2024-7-7',title:'前台后台初步搭建,将静态页面迁移至Vue'},
                {time:'2024-7-8',title:'设计页面布局，组件拆分'},
                {time:'2024-7-10',title:'第一代文章详情页制作完毕'},
                {time:'2024-7-11',title:'给文章增加了加载画面功能'},
                {time:'2024-7-13',title:'点击按钮后可视区域滚动到顶部'},
                {time:'2024-7-15',title:'新增了评论功能，此时还没有回复功能'},
                {time:'2024-7-16',title:'新增主题切换功能'},
                {time:'2024-7-19',title:'实现了评论的二级回复及其dom结构'},
                {time:'2024-7-21',title:'给文章集成markdown编写及其前台渲染'},
                {time:'2024-7-22',title:'新增留言板功能'},
                {time:'2024-7-22',title:'新增文章分类功能'},
                {time:'2024-7-24',title:'新增友链和文章浏览量功能'},
                {time:'2024-7-25',title:'新增说说和标签页功能'},
                {time:'2024-7-27',title:'新增相册页面'},
                {time:'2024-7-27',title:'归档功能完毕'},
                {time:'2024-7-28',title:'个人博客1.0正式完结,接下来开始做样式了'},
                {time:'2024-8-1',title:'样式1.0完毕，接下来开始整合redis,文件上传等其他功能'},
            ]
        }
    },
    methods:{
        getTime(time) {
            return common.timestampToTime(time, 0)
        },
    }
}
</script>

<style scoped>

.historyBox {
    min-height: calc(100vh - 70px);
}

</style>
