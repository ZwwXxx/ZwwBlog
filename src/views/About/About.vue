<template>
    <div class="aboutBox">
        <BgBoard title="关于" content=""/>
        <MyCard>
           <div>
               <h2>技术栈</h2>
               <ul>
                   <li>前端框架: <a href="https://v2.cn.vuejs.org/v2/guide/">VUE2</a></li>
                   <li>前端脚手架: <a href="https://cli.vuejs.org/zh/">Vue-Cli</a></li>
                   <li>UI组件:
                       <a href="">Element UI</a> +
                       <a href="https://v5.bootcss.com/docs/getting-started/introduction/">Bootstrap5</a>
                   </li>
                   <li>后端框架: <a href="https://spring.io/">Spring</a></li>
                   <li>后端脚手架: <a href="https://spring.io/guides/gs/spring-boot">SpringBoot</a></li>
                   <li>后端工具包: <a href="https://www.hutool.cn/docs/#/">hutool</a></li>
                   <li>存储服务: <a href="https://www.mysql.com/cn/">MySQL</a></li>
                   <li>对象存储加速云: <a href="https://www.qiniu.com/">七牛云</a></li>
                   <li>部署服务器平台: <a href="https://cn.aliyun.com/">阿里云</a></li>
               </ul>
               <h2>关于我</h2>
               <ul>
                   <li>昵称: Zww</li>
                   <li>性别: 男</li>
                   <li>出生年份: 2004</li>
                   <li>身份: 大三在读学生</li>
                   <li>地点: 广东省汕头市</li>
                   <li>邮箱: 1626016153@qq.com</li>
                   <li>掌握: Java,Vue2,docker,AdobeEffect,AdobePremiere</li>
                   <li>爱好: <a href="https://www.minecraft.net/zh-hans">Minecraft</a>,羽毛球</li>
               </ul>
           </div>
        </MyCard>
    </div>
</template>

<script>
import BgBoard from "@/components/BgBoard.vue";
import MyCard from "@/components/MyCard.vue";

export default {
    name: "About",
    components: {MyCard, BgBoard}
}
</script>

<style scoped>
.aboutBox {
    padding-top: 60px;
    min-height: calc(100vh - 70px);
}


</style>
