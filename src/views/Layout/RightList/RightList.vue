<template>
    <div class="rightlistBox">
        <DelayShow>
            <myAside v-show="!$store.state.loading"/>
        </DelayShow>
        <DelayShow>
            <PublishBoard v-show="!$store.state.loading"/>
        </DelayShow>
        <DelayShow>
            <NewArticle/>
        </DelayShow>
         <!--右侧上滑小图片 -->
        <div >
            <div
                :class="showScroll ? 'toTop' : 'toTop outWindow'"
                @click="toTop"
            >
                <img src="@/assets/images/scroll.png" alt=""/>
            </div>
        </div>
        <!--&lt;!&ndash; 右侧上滑小图片 &ndash;&gt;-->
        <!--<div class="hua-dong">-->
        <!--    <div-->
        <!--        v-if="this.$store.state.themeObj.user_start !== 0"-->
        <!--        :class="gotoTop ? 'toTop hidden' : 'toTop goTop hidden'"-->
        <!--        @click="toTopfun"-->
        <!--    >-->
        <!--        <img :src="this.$store.state.themeObj.right_img ?-->
        <!--  this.$store.state.themeObj.right_img: 'static/img/scroll.png'" alt=""/>-->
        <!--    </div>-->
        <!--    <div v-else :class="gotoTop ? 'toTophui hidden' : 'toTophui goTophui hidden'" @click="toTopfun">-->
        <!--        <img :src="this.$store.state.themeObj.right_img-->
        <!--    ? this.$store.state.themeObj.right_img: 'static/img/scroll.png'" alt=""/>-->
        <!--    </div>-->
        <!--</div>-->
    </div>
</template>

<script>
import DelayShow from "@/components/DelayShow.vue";
import MyAside from "@/views/Layout/RightList/myAside.vue";
import PublishBoard from "@/views/Layout/RightList/publishBoard.vue";
import NewArticle from "@/views/Layout/RightList/newArticle.vue";

export default {
    name: "RightList",
    components: {NewArticle, PublishBoard, MyAside, DelayShow},
    data(){
      return{
          showScroll:false,
      }
    },
    methods:{
        handleWindowScroll() {
            if (window.scrollY > document.documentElement.clientHeight / 2) {
                this.showScroll=true
            }
            else {
                this.showScroll=false
            }

        },
        toTop() {
            scrollTo(0, 0)
        }
    },
    mounted() {
        // 当所有组件都挂载好后，监听窗口的滚动事件，触发回调
        window.addEventListener('scroll', this.handleWindowScroll)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleWindowScroll);
    },
}
</script>

<style scoped>
.rightlistBox {
    position: relative;
}
/*上滑图标样式*/
.toTop{
    position: fixed;
    right: -7px;
    bottom: 0px;
    z-index: 1009;
    width: 70px;
    height: 900px;
    transition: all 0.5s  ease-in-out;
    cursor: pointer;
}

.outWindow{
    bottom: 950px;
}

</style>
