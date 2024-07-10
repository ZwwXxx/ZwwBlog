<template>
    <div class="right-navbox">
        <!-- 输入框/头像/夜间模式区域 -->
        <!--                输入框组件-->
        <Search/>
    </div>
</template>

<script>
import Search from "@/components/Search.vue";

export default {
    name: "RightNav",
    components: {Search}
}
</script>

<style scoped>
/* 将菜单项和搜索款夜间模式头像至右 */
.right-navbox {
    display: flex;
    align-items: center;
}

</style>
