<script>
import {selectList} from "@/api/article";

export default {
    name: "index",
    data() {
        return {
            page:'1',
            limit:'5',
            searchObj:{},
            articleList: []
        }
    },
    created() {
        selectList(this.page,this.limit,this.searchObj).then(res=>{
            // console.log(res)
            if (res.code===20000){
                this.articleList=res.data.records
                console.log(this.articleList)
                console.log(res.data.records)
            }
        })
    },
    methods: {
        scrollTo() {
            const container = document.getElementById("container")
            container.scrollIntoView({
                block: "start",
                behavior: "smooth"
            })
        }
    }
}

</script>
<template>
    <div class="background">
        <!-- 导航区域 -->
        <div class="navbar-main">

            <div class="left-nav">
                <!-- logo区域 -->
                <div class="nav-title">Zww</div>
                <!-- 菜单区域 -->
                <div class="menu">
                    <a href=""><i class="fa fa-home"></i>首页</a>
                    <a href=""><i class="fa fa-book"></i>文章</a>
                    <a href=""><i class="fa fa-comment"></i>说说</a>
                    <a href=""><i class="fa fa-comments"></i>留言板</a>
                    <a href=""><i class="fa fa-archive"></i>归档</a>
                    <a href=""><i class="fa fa-info"></i>关于</a>
                    <a href=""><i class="fa fa-sign-in"></i>登录</a>
                    <a href=""><i class="fa fa-gear"></i>功能</a>
                </div>
            </div>


            <div class="right-nav">


                <!-- 输入框/头像/夜间模式区域 -->
                <div class="right-nav2">
                    <!-- 搜索框 -->
                    <div class="search-box">
                        <input type="text" class="search-input" placeholder="搜索什么...">
                        <a class="search-btn">
                            <i class="fa fa-search"></i>
                        </a>
                    </div>
                </div>


            </div>
        </div>

        <!-- banner区域 -->
        <div class="banner">
            <div class="banner-title">
                <span>Zww</span>
            </div>
            <div class="banner-subtitle">
                Man proposes,God disposes
            </div>
            <a class="arrow" @click="scrollTo()"></a>
        </div>

        <!-- 内容区域 -->

        <section class="container" id="container">
            <div class="content">

                <!-- 文章内容和页脚区域-->
                <div class="lside">
                    <div class="article" v-for="article in articleList" :key="article.id">
                        <div class="article-title">{{ article.title }}</div>
                        <div class="article-content">
                            {{ article.content }}
                        </div>
                    </div>

                </div>


                <!-- 侧边栏介绍 -->
                <div class="rside">
                    <div class="desc">
                        <img src="@/assets/images/微信图片_20240701112347.jpg" class="avatar" alt="avatar">
                        <div class="author-name">Zww</div>
                        <div class="saying">尽人事，听天命</div>
                    </div>
                </div>

            </div>
            <!-- 页脚区域 -->
            <div class="footer">
                <div>
                    <a href="https://beian.miit.gov.cn/">备案号：粤ICP备2023129239号</a>
                </div>
            </div>
        </section>
    </div>
</template>


<style scoped>


.background {
    background: url('@/assets/images/house.png') no-repeat fixed center bottom;
    /* 不重复图片铺满body */
    /*background-repeat: no-repeat;*/
    background-size: cover;
    /* 固定在视窗上，不会随滚动条和缩放的变化而变化 */
    /*background-attachment: fixed;*/
    /* 显示背景图的中心，靠下位置 */
    /*background-position: center bottom;*/
}


a {
    text-decoration: none;
    color: rgb(0, 0, 0);
}

li {
    list-style: none;
}

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

.menu a {
    /* 使用块级元素，方便给a设置宽高，让其占位置*/
    display: flex;
    padding: 16px 20px;
    font-size: 16px;
    align-items: center;
}

.menu a i {
}


/* 将菜单项和搜索款夜间模式头像至右 */
.right-nav {
    display: flex;
    align-items: center;
}

/* 右导航总空间 */
.right-nav2 {
    width: 200px;
    transition: 0.3s;
}

/* 搜索框样式 */
.search-box {
    border-radius: 20px;
    height: 30px;
    float: right;
    overflow: hidden;
    background: #e1dfdf;

}

.search-input {
    float: left;
    width: 0;
    outline: none;
    border: none;
    background: #e1dfdf;
    padding: 2px 0 0 0;
    line-height: 30px;
    transition: 0.3s;
}

.search-btn {
    float: right;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
}

.search-box:hover .search-input {
    float: right;
    width: 150px;
    /* border-radius: 0; */
}

.search-box:hover .search-btn {
    color: #ff004c;
}

/* banner区域 */
.banner {
    height: 100vh;
    position: relative;
    overflow: hidden;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}

.banner-title {
    font-size: 66px;
    font-weight: bolder;
    margin-bottom: 20px;
    text-shadow: 0 0px 5px #fffb00;
    /* box-shadow: 0 0 8px #fffb00; */
    /* color: transparent; */
}

.banner-subtitle {
    background: linear-gradient(to right, rgb(255, 196, 0), rgb(99, 255, 169));
    -webkit-background-clip: text;
    box-sizing: border-box;
    color: transparent;
    white-space: nowrap;
    font-weight: bold;
    overflow: hidden;
    font-size: 35px;
    width: 0;
    border-right: 2px solid transparent;
    animation: grow 2s steps(20) 1 0.5s normal both, blink 500ms 8 steps(44) both;
    text-shadow: 0 0px 4px #00ffbb;
}

@keyframes grow {
    0% {
        width: 0;
    }
    100% {
        width: 420px;
    }

    /* 40%,
    60% {
      width: 225px;
    }
    100% {
      width: 0;
    } */
}

@keyframes blink {
    from {
        border-right-color: #eee;
    }
    to {
        border-right-color: transparent;
    }
}

.arrow {
    display: block;
    position: absolute;
    width: 40px;
    height: 50px;
    cursor: pointer;
    bottom: 10px;
}

.arrow::before {
    content: '';
    position: absolute;
    bottom: 15px;
    left: 50%;
    width: 14px;
    height: 14px;
    border-bottom: 5px solid #fff;
    border-right: 5px solid #fff;
    opacity: 0.9;
    transform: translateX(-50%) rotate(45deg);
}

/* 内容区 */
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 82px;
    margin-top: -82px;
}

.content {
    display: flex;
    width: 60%;
}

.lside {
    flex: 70%;
}

.article {
    border-radius: 20px;
    background: #fff;
    margin-bottom: 30px;
    height: 400px;
    overflow: hidden;
}

.article-title {
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    margin: 15px 0;
    cursor: pointer;
}


.article-content {
    padding: 0 15px;
}

.article-content p {
    margin: 6px;
}

.desc {
    text-align: center;
}

.rside {
    overflow: hidden;
    flex: 30%;
    height: 400px;
    background: #fff;
    margin-left: 20px;
    border-radius: 20px;
}

.avatar {
    margin: 45px 0 15px 0;
    padding: 5px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0 0 10px black;
}

.author-name {
    padding: 20px 0;
    background-image: linear-gradient(to right, #ff6b6b, #ffa500, #ffff00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 20px;
    font-weight: bolder;
}

.saying {
    padding: 20px 0;
    background-image: linear-gradient(to right, #00b4d8, #0077b6, #0096c7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Times New Roman', Times, serif;
    text-shadow: 0 0px 3px #ffc400;
}

/* 页脚 */
.footer {
    text-align: center;
    width: 100%;
    background: #fff;
    opacity: 0.6;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-size: 20px;
    font-weight: bolder;
}

</style>
