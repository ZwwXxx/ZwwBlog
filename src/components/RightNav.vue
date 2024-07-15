<template>
    <div class="right-navbox">
        <!--                输入框组件-->
        <!--<Search/>-->
        <!--<div class="NavAvatar">-->
        <!--&lt;!&ndash; 头像&ndash;&gt;-->
        <!--    <img src="@/assets/logo.png" alt="">-->
        <!--</div>-->
        <!--夜间模式区域-->
        <div>
            <button @click="changeTheme">当前主题{{this.$store.state.theme}}</button>
        </div>
    </div>
</template>

<script>
import Search from "@/components/Search.vue";

export default {
    name: "RightNav",
    components: {Search},
    methods:{
        changeTheme(){
            this.$store.commit('changeTheme')
        }
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
</style>
