<template>
    <div class="left-nav">
        <!-- logo区域 -->
        <div class="nav-title">Zww</div>
        <!-- 菜单区域 -->
        <div class="menu " v-for="(m,index) in menu" :key="index">
            <div @click="menuSkip(index)"
                 :class="{articleHover:articleHoverIndex===index}"
            >
                <i :class="`fa ${m.icon}`"></i> {{ m.name }}
            </div>

            <!--文章分类下拉菜单-->
            <ul class="dropdown-menu"
                style="position: absolute;top: 60px"
            >
                <li v-for="(item,index) in category"
                    :key="index">
                    <button class="dropdown-item" type="button" @click="dropDownSkip(item)">{{ item }}</button>
                </li>
            </ul>
            <!--<a href=""><i class="fa fa-home" @click="skip()"></i>首页</a>-->
            <!--<a href=""><i class="fa fa-book"></i>文章</a>-->
            <!--<a href=""><i class="fa fa-comment"></i>说说</a>-->
            <!--<a href=""><i class="fa fa-comments"></i>留言板</a>-->
            <!--<a href=""><i class="fa fa-archive"></i>归档</a>-->
            <!--<a href=""><i class="fa fa-info"></i>关于</a>-->
            <!--<a><i class="fa fa-sign-in"></i>登录</a>-->
            <!--<a href=""><i class="fa fa-gear"></i>功能</a>-->
        </div>
        <div class="dropdown ">

        </div>
    </div>

</template>

<script>
import Article from "@/views/Article/Article.vue";

export default {
    name: "Leftnav",
    components: {Article},
    data() {
        return {
            menu: [
                {
                    name: '首页',
                    icon: 'fa fa-home'
                },
                {
                    name: '文章',
                    icon: 'fa fa-book'
                },
                {
                    name: '留言板',
                    icon: 'fa fa-comments'
                },
                {
                    name: '友链',
                    icon: 'fa fa-chain'
                },
                {
                    name: '说说',
                    icon: 'fa fa-comment'
                },
                {
                    name: '相册',
                    icon: 'fa fa-file-text-o'
                },
                {
                    name: '归档',
                    icon: 'fa fa-archive'
                },
                {
                    name: '关于',
                    icon: 'fa fa-info'
                },
            ],
            category: [
                'Java',
                'Vue',
                'JavaScript'
            ],
            articleHoverIndex: 1
        }
    },
    methods: {
        menuSkip(index) {
            switch (index) {
                case 0:
                    if (this.$route.path !== '/home') {
                        this.$router.push("/home")
                    } else {
                        window.location.reload()
                    }
                    break;
                case 1:
                    break;
                case 2:
                    if (this.$route.path !== '/message') {
                        this.$router.push("/message")
                    } else {
                        window.location.reload()
                    }
                    break;
                case 3:
                    if (this.$route.path !== '/friends') {
                        this.$router.push("/friends")
                    } else {
                        window.location.reload()
                    }
                    break;
                case 4:
                    if (this.$route.path !== '/talk') {
                        this.$router.push("/talk")
                    } else {
                        window.location.reload()
                    }
                    break;
                case 5:
                    if (this.$route.path !== '/album') {
                        this.$router.push("/album")
                    } else {
                        window.location.reload()
                    }
                    break;
                case 6:
                    if (this.$route.path !== '/archive') {
                        this.$router.push("/archive")
                    } else {
                        window.location.reload()
                    }
                    break;
                case 7:
                    if (this.$route.path !== '/about') {
                        this.$router.push("/about")
                    } else {
                        window.location.reload()
                    }
                    break;
            }
        },
        dropDownSkip(item) {
            if (item===this.$route.params.cname){
                return
            }
            console.log(item)
            this.$router.push({
                // 这里使用name不使用path使用path需要这样写
                // path: `/category/${item}`,
                name: 'Category',
                params: {
                    cname: item
                }
            }).then(()=>{
                window.location.reload()
            })
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

.menu i {
    margin-right: 5px;
}

.dropdown-menu {
    border: none;
}

.articleHover:hover ~ .dropdown-menu {
    display: block;
    border: none;
}

.dropdown-menu:before {
    content: '';
    position: absolute;
    border-top: 10px solid transparent;
    border-bottom: 10px solid #ffffff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    top: -19px;
    left: 19px;
}

.dropdown-menu:hover {
    display: block;
}
</style>
