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

export default {
    name: "RightNav",
    components: {Search},
    methods: {
        changeTheme() {
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

.changeButton {
    background: var(--bg5);
    height: 20px;
    width: 40px;

    border-radius: 20px;
    position: relative;
    cursor: pointer;
}
.changeButton span{
}
.sun {
    position: absolute;
    background: white;
    height: 16px;
    width: 16px;
    border-radius: 20px;
    left: 2px;
    top:2px;
    transition: 0.2s ;
}

.moon {
    position: absolute;
    background: black;
    height: 16px;
    width: 16px;
    border-radius: 20px;
    left: 22px;
    top: 2px;
    transition: 0.2s ;
}
.theme-transition-enter-active,
.theme-transition-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}


</style>
