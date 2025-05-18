<template>
  <div class="historyBox">
    <BgBoard title="历程" content="记录网站的版本历程"/>
    <MyCard>

      <!--      <h1>xxxx年</h1>-->
      <!--      <h2>xxxx月</h2>-->
      <div v-for="(monthHistory,year) in historys" :key="year">
        <h1>{{ year }}</h1>
        <div v-for="(history,month) in monthHistory" :key="month">
          <h2>{{ month }}</h2>
          <el-timeline :reverse="false">
            <el-timeline-item
                v-for="(item,index) in history"
                :key="index"
                :timestamp="item.time">
              <span class="title"> {{ item.title }}</span>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>

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
      //懒得做数据库了，直接硬编码！
      historys: [
        {time: '2024-8-25', title: '后台整合若依框架，文件上传,redis,security,代码微重构，采用mybatis而非mybatisPlus'},
        {time: '2024-8-01', title: '样式1.0完毕，接下来开始整合redis,文件上传等其他功能'},
        {time: '2024-7-28', title: '个人博客1.0正式完结,接下来开始做样式了'},
        {time: '2024-7-27', title: '新增相册页面'},
        {time: '2024-7-27', title: '归档功能完毕'},
        {time: '2024-7-25', title: '新增说说和标签页功能'},
        {time: '2024-7-24', title: '新增友链和文章浏览量功能'},
        {time: '2024-7-22', title: '新增文章分类功能'},
        {time: '2024-7-22', title: '新增留言板功能'},
        {time: '2024-7-16', title: '新增主题切换功能'},
        {time: '2024-7-21', title: '给文章集成markdown编写及其前台渲染'},
        {time: '2024-7-19', title: '实现了评论的二级回复及其dom结构'},
        {time: '2024-7-15', title: '新增了评论功能，此时还没有回复功能'},
        {time: '2024-7-13', title: '点击按钮后可视区域滚动到顶部'},
        {time: '2024-7-11', title: '给文章增加了加载画面功能'},
        {time: '2024-7-10', title: '第一代文章详情页制作完毕'},
        {time: '2024-7-8', title: '设计页面布局，组件拆分'},
        {time: '2024-7-7', title: '前台后台初步搭建,将静态页面迁移至Vue'},
      ],
      handledHistory: {}
    }
  },
  mounted() {
    this.groupByTime()
  },
  methods: {
    // year:2024年,content:[{time:8月5号,title:'xxx'}]
    groupByTime() {
      // accumulator为累加盒子，history为每一次遍历的对象，如果符合则push到累加盒子里
      this.historys = this.historys.reduce((accumulator, history) => {
        // 将其划分为年月日结构并且map转为number类型并解构赋值给year month... 2023=>year
        const [year, month] = history.time.split('-')
        // 转为字符串XX月后续展示用到
        const yearStr = `${year}年`
        const monthStr = `${month}月`
        // 如果accumulator中没有该年，则创建一个新对象
        if (!accumulator[yearStr]) {
          accumulator[yearStr] = {}
        }
        if (!accumulator[yearStr][monthStr]) {
          accumulator[yearStr][monthStr] = []
        }
        // 如果都存在年和月就根据年月push到对应的数组里面
        accumulator[yearStr][monthStr].push(history)
        return accumulator;
      }, {})
      console.log(this.historys)
    },
    getMonth(time) {
      const parts = time.split('-');
      return parts[1]
    },
    // getTime(timeStr) {
    //   const date = new Date(timeStr);
    //   return date.getTime();
    // }
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
