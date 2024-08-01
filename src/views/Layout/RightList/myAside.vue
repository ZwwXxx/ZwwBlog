<template>
    <div class="desc" v-show="!$store.state.loading">
        <img src="../../../assets/images/微信图片_20240701112347.jpg" class="avatar" alt="avatar">
        <div class="author-name">Zww🍟</div>
        <div class="saying">尽人事，听天命🍩🍩</div>
        <div class="web-total">
            <el-row :gutter="10">
                <el-col :span="8" v-for="(item,index) in webTotals " :key="index">
                    <el-row class="totalName">{{ item.totalName }}</el-row>
                    <el-row class="totalCount">{{ item.total }}</el-row>
                </el-col>
            </el-row>
        </div>
        <!--各个网站主页-->
        <div class="web-other-home">
            <div class="home-item tada_parent" @click="openNewTab(catchMeObj.wechat)">
                <svg t="1700921934939" class="icon tada" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="9422" width="28" height="28">
                    <path
                            d="M669.3 369.4c9.8 0 19.6 0 29.4 1.6C671 245.2 536.9 152 383.2 152 211.6 152 71 269.7 71 416.8c0 85 45.8 156.9 124.2 210.9l-31.1 93.2L273.6 667c39.2 8.2 70.3 16.3 109.5 16.3 9.8 0 19.6 0 31.1-1.6-6.5-21.3-9.8-42.5-9.8-65.4 0.1-135.7 116.2-246.9 264.9-246.9z m-168.4-85c24.5 0 39.2 16.3 39.2 39.2 0 22.9-16.3 39.2-39.2 39.2-24.5 0-47.4-16.4-47.4-39.2 0-24.5 24.6-39.2 47.4-39.2z m-216.3 73.1c-24.7 0-47.8-16.2-47.8-38.8 0-24.3 24.7-38.8 47.8-38.8s39.5 16.2 39.5 38.8c0.1 22.7-16.4 38.8-39.5 38.8z"
                            fill="#24DB5A" p-id="9423"></path>
                    <path
                            d="M953.8 613c0-125.9-124.2-227.2-264.8-227.2-148.8 0-266.5 103-266.5 227.2 0 125.9 117.7 227.2 266.5 227.2 31.1 0 62.1-8.2 93.2-16.3l85 47.4-22.9-78.5c62.1-47.4 109.5-109.5 109.5-179.8z m-351.5-39.2c-14.7 0-31.1-14.7-31.1-31.1 0-14.7 16.3-31.1 31.1-31.1 22.9 0 39.2 16.3 39.2 31.1 0 16.4-14.7 31.1-39.2 31.1z m178-7.6c-14.8 0-31.3-14.6-31.3-30.7 0-14.6 16.5-30.7 31.3-30.7 23.1 0 39.5 16.2 39.5 30.7 0 16.2-16.4 30.7-39.5 30.7z"
                            fill="#24DB5A" p-id="9424"></path>
                </svg>
            </div>
            <div class="home-item tada_parent" @click="openNewTab(catchMeObj.biliBili)">
                <svg t="1700922255550" class="icon tada" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="15521" width="28" height="28">
                    <path
                            d="M306.005333 117.646222L444.359111 256h135.281778l138.353778-138.296889a42.666667 42.666667 0 1 1 60.359111 60.302222L700.302222 256h89.031111A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.390222 149.390222 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.974222L245.646222 177.948444a42.666667 42.666667 0 0 1 60.359111-60.359111zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.715556 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.715555l6.144 0.284445h554.666666a64 64 0 0 0 63.715556-57.856l0.284444-6.144v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0V512A42.666667 42.666667 0 0 1 341.333333 469.333333z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0V512a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                            p-id="15522" fill="#1FAFE2"></path>
                </svg>
            </div>
            <div class="home-item tada_parent" @click="openNewTab(catchMeObj.letCode)">
                <svg fill="none" t="1700922403916" class="icon tada" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="25404" width="28" height="28">
                    <path
                            d="M1023.522548 511.96634c0 163.697987 0 327.395973 0.477452 491.093959 0 17.051874-3.887827 20.939701-20.939701 20.871494q-491.09396-0.81849-982.187919 0c-17.051874 0-20.939701-3.81962-20.871493-20.871494q0.81849-491.09396 0-982.187919C-0.067321 3.820506 3.820506-0.067321 20.87238 0.000887q491.09396 0.81849 982.187919 0c17.051874 0 21.007908 3.81962 20.939701 20.871493-0.477452 163.697987-0.477452 327.395973-0.477452 491.09396z"
                            fill="none" p-id="25405"></path>
                    <path
                            d="M454.876667 321.735638c-61.386745 61.386745-124.819715 121.068303-184.774103 184.160235-44.403079 46.722134-40.924497 113.906516 5.593015 161.924591 55.179863 56.680428 111.996706 111.723876 168.063266 167.449399 21.212531 21.962813 20.939701 47.063171 5.388392 70.390134-14.391781 21.485361-35.058652 34.649407-63.091932 22.576681a132.663577 132.663577 0 0 1-35.67252-25.577811c-51.769488-52.315148-104.766711-103.470769-155.990539-156.399784-89.897478-92.8304-90.92059-232.451141-0.477453-324.667673C320.985355 291.72434 449.965727 163.903496 578.400439 35.536991c28.30611-28.30611 63.842215-30.147713 87.032763-6.002259s21.007908 55.657315-6.411504 84.509085q-43.175344 45.426191-86.691726 90.443138c-30.693372 47.608831-71.822492 84.645501-117.453305 117.248683z"
                            fill="#070706" p-id="25406"></path>
                    <path
                            d="M677.028476 641.014919H493.413901c-40.924497 0-70.185512-24.75932-69.503437-58.112785 0.613867-32.262145 27.965073-55.998353 68.207495-56.134768q187.02495-0.886697 374.049899 0c39.833177 0 62.34165 22.031021 62.682687 56.475805 0 35.740727-23.054133 57.294295-64.933534 57.70354-62.137027 0.54566-124.546885 0.068207-186.888535 0.068208z"
                            fill="#B4B2B1" p-id="25407"></path>
                    <path
                            d="M386.055305 928.100263c60.568255-7.366409 79.052486-37.241292 57.70354-92.966815 63.842215 33.48988 110.837178 26.055263 162.470252-25.57781 26.464508-26.464508 52.519771-53.338261 79.598146-79.188901s57.43071-26.464508 81.439748-2.7283 23.531586 54.565996-1.978017 81.439748c-34.103747 35.195067-67.457212 70.594757-103.470769 103.266147-76.938054 69.776267-199.916166 75.914941-275.7629 15.755931z"
                            fill="#EAA240" p-id="25408"></path>
                    <path
                            d="M454.876667 321.735638a1295.942393 1295.942393 0 0 1 117.453305-117.248683c89.692855 27.828658 142.349041 101.151714 202.371636 164.925721 19.575551 20.871493 11.663482 53.747506-10.776784 72.777397a53.338261 53.338261 0 0 1-73.868717-2.18264 821.627477 821.627477 0 0 1-74.414376-74.277961c-44.130249-52.315148-96.854642-66.502307-160.765064-43.993834z"
                            fill="#EAA340" p-id="25409"></path>
                </svg>
            </div>
            <div class="home-item tada_parent" @click="openNewTab(catchMeObj.git)">
                <svg t="1700923115128" class="icon tada" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="28707" width="28" height="28">
                    <path
                            d="M850.016 438.016H471.008q-14.016 0-23.488 9.504t-9.504 23.488v82.016q0 14.016 9.504 23.488t23.488 9.504h230.016q14.016 0 23.488 9.504t9.504 23.488v16.992q0 19.008-7.488 37.504t-20.992 32-32 20.992-37.504 7.488h-314.016q-12.992 0-23.008-9.504t-10.016-23.488v-312.992q0-19.008 8-37.504t21.504-32 32-20.992 37.504-7.488h462.016q12.992 0 23.008-10.016t10.016-23.008V173.984q0-12.992-10.016-23.008t-23.008-10.016H388q-67.008 0-123.488 33.504T174.496 264.48t-33.504 123.488v462.016q0 12.992 10.016 23.008t23.008 10.016h486.016q44.992 0 85.504-16.992t72-48.512 48.512-72 16.992-85.504v-188.992q0-14.016-10.016-23.488t-23.008-9.504z"
                            p-id="28708" fill="#d81e06"></path>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import {getWebsiteInfo} from "@/api/website";

export default {
    name: "myAside",
    data() {
        return {
            catchMeObj: {
                //个人信息
                git: "https://gitee.com/zww0891",
                wechat: "/static/img/qq.jpg",
                // letCode: "https://leetcode.cn/u/jin-tian-huan-ge-zi-shi-fan-shen/",
                biliBili: "https://space.bilibili.com/668503446?spm_id_from=333.1007.0.0"
            },
            webTotals: [
                {
                    totalName: '文章',
                    total: 0,
                    path: "",
                    totalKey: 'articleTotal'
                },
                {
                    totalName: '标签',
                    total: 0,
                    path: "",
                    totalKey: 'tagTotal'
                },
                {
                    totalName: '分类',
                    total: 0,
                    path: "",
                    totalKey: 'categoryTotal'
                }
            ]
        }
    },
    computed: {
        totalInfo() {
            return this.$store.state.websiteInfo
        },
    },
    mounted() {
        // 之前没有存数据的情况下
        if (this.$store.state.websiteInfo === null || !this.$store.state.websiteInfo) {
            getWebsiteInfo().then(res => {
                if (res.code === 20000) {
                    console.log('空!')
                    this.$store.commit('setWebsiteInfo', res.data)
                    this.addTotal()

                }
            })
            return
        }
        // 之前有存数据的情况下.直接加工
        this.addTotal()

    },
    methods: {
        openNewTab(url) {
            window.open(url)
        },
        addTotal() {
            this.webTotals.forEach(item => {
                item.total = this.totalInfo[item.totalKey]
            })
        }
    }
}
</script>

<style scoped>
.desc {
    text-align: center;
    background: white;
    overflow: hidden;
    min-height: 400px;
    background: var(--bg1);
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);

}

.avatar {
    margin: 20px 0 15px 0;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0 0 10px black;
    transition: all 0.4s;
    animation: huxi_dark 4s ease-in-out infinite;
}

.avatar:hover {
    transform: rotate(360deg);
}

@keyframes huxi_dark {
    0% {
        box-shadow: 0px 0px 1px 1px #39c5bb;
    }
    50% {
        box-shadow: 0px 0px 5px 5px #39c5bb;
    }
    100% {
        box-shadow: 0px 0px 1px 1px #39c5bb;
    }
}

.author-name {
    color: black;
    padding: 10px 0;
    font-size: 20px;
}

.saying {
    padding: 10px 0;
    margin-bottom: 10px;
}

.web-total {
    padding: 0 30px;
}

.totalName {
    font-size: 15px;
}

.totalCount {
    font-size: 25px;
}

.web-other-home {
    margin-top: 20px;
    display: flex; /* 使用 flexbox 布局 */
    justify-content: center; /* 水平居中对齐 */
    align-items: center; /* 垂直居中对齐 */
}

.home-item {
    margin: 0 10px;
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

/* 鼠标悬停时触发动画 */
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
