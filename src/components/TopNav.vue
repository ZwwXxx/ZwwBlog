<template>

    <div class="navbar-main">

        <!--左侧导航栏部分-->
        <LeftNav/>


        <!--右侧导航栏部分-->
        <RightNav/>


    </div>
</template>

<script>
import RightNav from "@/components/RightNav.vue";
import LeftNav from "@/components/LeftNav.vue";

export default {
    name: "TopNav",
    components: {LeftNav, RightNav}
}
</script>

<style scoped>

/* 顶部导航栏 */
.navbar-main {
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 60px;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    z-index: 999;
    /*opacity: 0.7;*/
}



</style>
