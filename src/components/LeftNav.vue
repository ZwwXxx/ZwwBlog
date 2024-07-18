<template>
    <div class="left-nav">
        <!-- logo区域 -->
        <div class="nav-title">Zww</div>
        <!-- 菜单区域 -->
        <div class="menu " v-for="(m,index) in menu" :key="index">
            <div @click="skip(index)"><i :class="`fa ${m.icon}`"></i> {{m.name}}</div>
            <!--<a href=""><i class="fa fa-home" @click="skip()"></i>首页</a>-->
            <!--<a href=""><i class="fa fa-book"></i>文章</a>-->
            <!--<a href=""><i class="fa fa-comment"></i>说说</a>-->
            <!--<a href=""><i class="fa fa-comments"></i>留言板</a>-->
            <!--<a href=""><i class="fa fa-archive"></i>归档</a>-->
            <!--<a href=""><i class="fa fa-info"></i>关于</a>-->
            <!--<a><i class="fa fa-sign-in"></i>登录</a>-->
            <!--<a href=""><i class="fa fa-gear"></i>功能</a>-->
        </div>
    </div>
</template>

<script>
export default {
    name: "Leftnav",
    data(){
        return{
            menu:[
                {
                    name:'首页',
                    icon:'fa fa-home'
                },
                // {
                //     name:'登录',
                //     icon:'fa fa-sign-in'
                // }
            ]
        }
    },
    methods:{
        skip(index){
            switch (index){
                case 0:
                    if (this.$route.path!=='/home'){
                        this.$router.push("/home")
                    }
                    else{
                        window.location.reload()
                    }
                    break;
                case 1:
                    this.$router.push("/login")
            }
        }
    }
}
</script>

<style scoped>


.left-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 100px;
}

/* 顶部导航栏左侧的标题 */
.nav-title {
    color: rgb(255, 98, 0);
    text-shadow: 0 0px 6px #ffc400;
    text-align: center;
    font-size: 25px;
    font-weight: 800;
    margin-right: 80px;
}

/* 导航栏菜单 */
.menu {
    /* 由于子元素的a变成行内块元素有左右间隙，
    使用弹性布局往左浮动 */
    display: flex;
}

.menu div {
    cursor: pointer;
    /* 使用块级元素，方便给a设置宽高，让其占位置*/
    display: flex;
    padding: 16px 20px;
    font-size: 16px;
    align-items: center;
    color: var(--text-color);
}

.menu i{
    margin-right: 5px;
}
</style>
