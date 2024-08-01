<template>
    <div id="app">
        <!--<page-loading v-show="$store.state.loading"/>-->
        <PageLoading v-show="$store.state.loading"/>
        <!--<PageLoading />-->
        <router-view/>
    </div>
</template>

<script>
import PageLoading from "@/components/pageLoading.vue";
export default {
    name: 'App',
    components: {PageLoading},
    comments:{PageLoading}
}
</script>

<style >

@import '@/assets/css/theme/theme.css';
body{
    font-family: ZhuZiAWan2, Arial, "STHeiti", Helvetica, sans-serif !important;
}
p {
    margin-bottom: 0 !important;
}
#app {
    background: url("https://cdn.zww0891.fun/20247291703.png") no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
    /*!*绿色渐变*!*/
    /*background: linear-gradient(100deg, #c6ffe5, #e0f0ff, #ffeaf1, #fff1d1);*/
    /*!*肉色渐变*!*/
    /*!*background: linear-gradient(to right bottom, #c7be98, #ccb1bb, #9fbbbe, #96af7b);*!*/
    /*background-size: 400% 400%;*/
    /*animation: gradientAnimation 30s ease infinite;*/
}

@-webkit-keyframes tada {
    0% {
        -webkit-transform: scale(1);
    }

    10%,
    20% {
        -webkit-transform: scale(0.8) rotate(-3deg);
    }

    30%,
    50%,
    70%,
    90% {
        -webkit-transform: scale(1.3) rotate(3deg);
    }

    40%,
    60%,
    80% {
        -webkit-transform: scale(1.3) rotate(-3deg);
    }

    100% {
        -webkit-transform: scale(1) rotate(0);
    }
}
@keyframes tada {
    0% {
        transform: scale(1);
    }

    10%,
    20% {
        transform: scale(0.8) rotate(-3deg);
    }

    30%,
    50%,
    70%,
    90% {
        transform: scale(1.3) rotate(3deg);
    }

    40%,
    60%,
    80% {
        transform: scale(1.3) rotate(-3deg);
    }

    100% {
        transform: scale(1) rotate(0);
    }
}



/* menu图标鼠标悬停时触发动画 */
.tada_parent:hover .tada {
    -webkit-animation-name: tada;
    animation-name: tada;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}
</style>
