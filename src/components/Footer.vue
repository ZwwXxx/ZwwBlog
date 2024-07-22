<template>
    <div class="footer">
        <div class="beian">
            <a href="https://beian.miit.gov.cn/">备案号：粤ICP备2023129239号</a>
        </div>
        <div class="toTop themeBg themeText" :style="dynamicStyles" @click="toTop">
            <i class="fa fa-arrow-up"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "Footer",
    data(){
      return{
          dynamicStyles:{
              opacity:0
          }
      }
    },
    mounted() {
        // 当所有组件都挂载好后，监听窗口的滚动事件，触发回调
        window.addEventListener('scroll',this.handleWindowScroll)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleWindowScroll);
    },
    methods:{
        handleWindowScroll(){
            if (window.scrollY>document.documentElement.clientHeight/2){
                this.dynamicStyles.opacity=1
            }else{
                this.dynamicStyles.opacity=0
            }
        },
        toTop(){
            scrollTo(0,0)
        }
    }
}
</script>

<style scoped>
.themeText{
    color: var(--text-color);
}
.themeBg{
    background: var(--bg3);
}
/* 页脚 */
.footer {
    text-align: center;
    width: 100%;
    background: var(--bg1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-size: 20px;
    font-weight: bolder;

}

.toTop{
    position: fixed;
    bottom: 80px;
    right: 30px;
    display: block;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-radius: 100%;
    transition: 0.3s ease;
    cursor: pointer;
}
.beian a{
    color: var(--text-color);
}
</style>
