<template>
  <!--组件的结构-->
    <transition name="fade" class="fade-enter-active fade-leave-active">
    <div class="loading-bg">
        <div class="loading-img"></div>
        <div class="loading-image-dot"></div>
    </div>
    </transition>
</template>
<script>
//组件交互相关的代码(数据、方法等等)
export default {
    name: 'pageLoading',
    data() {
        return {}
    },
    methods: {},
}
</script>

<style>
.loading-bg {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000;
    background: #CFF6F7EA;
    transition: all 0.3s ;
    opacity: 1;
}

.loading-img {
    width: 100px;
    height: 100px;
    background: url('https://cdn.zww0891.fun/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240701112347.jpg') center center;
    background-size: cover;
    border-radius: 50%;
    border: 4px solid #f0f0f2;
    animation: loadingAction infinite ease 0.7s;
}

.loading-image-dot:before {
    content: '';
    position: absolute;
    background: #6bdf8f;
    border: 4px solid #f0f0f2;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    top: 50%;
    left: 50%;
    transform: translateX(20px) translateY(20px);
}
.fade-enter-active{
    transition: opacity 2.4s;
}
.fade-leave-active{
    transition: opacity 1s;
}


.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}



@keyframes loadingAction {
    0% {
        opacity: 1;
        /*-ms-filter: none;*/
        /*filter: none;*/
    }
    100% {
        opacity: 0.4;
    }
}


/*@keyframes blink {*/
/*    0% {*/
/*        opacity: 0.4;*/
/*    }*/
/*    50% {*/
/*        opacity: 1;*/
/*    }*/
/*    100%{*/
/*        opacity: 0.4;*/
/*    }*/
/*}*/

</style>
