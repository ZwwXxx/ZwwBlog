<template>
    <div class="articleDetailBox">
        <BgBoard :title="article.title" >
            <div class="titleBar">
                <div><i class=" fa fa-clock-o"/> {{ getTime(article.createTime) }}</div>
                <div><i class="fa fa-eye"/> {{ article.views }}</div>
                <div><i class="fa fa-comment"/> {{ this.$store.state.total }} </div>
                <div><i class="fa fa-folder"/> {{ article.categoryName }}</div>
                <div><i class="fa fa-tags"/> {{ article.tags}}</div>
            </div>
        </BgBoard>
       <div class="articleLayOut">
           <div v-show="!loading" class="leftSide">
               <!--文章展示区域-->
               <div class="articleBody themeBg ">
                   <!--将md转为html后渲染-->
                   <!--<div v-html="article.content" class="articleContent themeText" ref="articleContent" />-->
                   <!--直接渲染md-->
                   <!--<div ref="articleContent">-->
                   <v-md-preview :text="article.content" ref="articleContent"
                                 class="articleContent themeText"
                                 @copy-code-success="handleCopyCodeSuccess"></v-md-preview>
                   <!--</div>-->
               </div>

               <!--评论输入区域-->
               <div class="articleComment themeBg">
                   <div class="commentTitle themeText">评论({{ this.$store.state.total }})</div>
                   <CommentInfoInput :article="article" v-show="!this.$store.state.currReply"/>
               </div>

               <div class="nullComment themeBg themeText" v-show="!this.comments.length">
                   暂无评论~不如您来开个头？
               </div>


               <!--评论内容区域-->
               <div
                   style="border-radius: 20px;overflow: hidden"
               >
                   <Comment v-for="comment  in comments" :key="comment.id" :comment="comment"/>
               </div>

           </div>

           <!--文章目录-->
           <div v-show="!loading" class="rightSide" >
               <div class="directory  themeBg " ref="directory">
                   <div class="themeText" style="margin-bottom: 10px;">文章目录</div>
                   <div class="directoryItem ">
                       <!--<div-->
                       <!--        v-for="(anchor,index) in titles"-->
                       <!--        @click="handleAnchorClick(anchor)"-->
                       <!--        :key="index"-->
                       <!--        v-show="initSuccess"-->
                       <!--        class="title"-->
                       <!--&gt;-->
                       <!--    <a-->
                       <!--            style="cursor: pointer;-->
                       <!--            color: var(&#45;&#45;text-color)"-->
                       <!--            :style="{ paddingLeft: `${anchor.indent * 20}px` }"-->
                       <!--            :id="anchor.id">{{ anchor.title }}</a>-->
                       <!--</div>-->
                       <ul class="title "
                           v-show="initSuccess">
                           <li v-for="(anchor,index) in titles"
                               :key="index"
                           >
                               <!--<a :href="'#'+item.id">-->
                               <!--    {{ item.title }}-->
                               <!--</a>-->
                               <a @click="handleAnchorClick(anchor)"
                                  :id=anchor.id
                                  :style="{paddingLeft:anchor.level * 10+'px'}"
                                  style="color: var(--text-color)"
                               >
                                   {{ anchor.title }}
                               </a>
                           </li>
                       </ul>

                       <!--<ul class="title ">-->
                       <!--    <li v-for="(item,index) in titles"-->
                       <!--        :key="index"-->
                       <!--    >-->
                       <!--        &lt;!&ndash;<a :href="'#'+item.id">&ndash;&gt;-->
                       <!--        &lt;!&ndash;    {{ item.title }}&ndash;&gt;-->
                       <!--        &lt;!&ndash;</a>&ndash;&gt;-->
                       <!--        <a @click="changeHash(`#${item.id}`)"-->
                       <!--           :id=item.id-->
                       <!--           :style="{paddingLeft:item.level * 10+'px'}"-->
                       <!--           style="color: var(&#45;&#45;text-color)"-->
                       <!--        >-->
                       <!--            {{ item.title }}-->
                       <!--        </a>-->
                       <!--    </li>-->
                       <!--</ul>-->
                   </div>
               </div>
           </div>
           <div v-show="loading" class="loading-wrapper">
           </div>
           <div class="alert alert-success alertBox hidden" ref="alertBox" role="alert">
               复制成功
           </div>
       </div>
       </div>
</template>

<script>
import {selectById} from "@/api/article";
import common from "@/utils/timestampToTime";
import Loading from "@/components/Loading.vue";
import WangEditor from "@/components/WangEditor/index.vue";
import {selectList, submitComment} from "@/api/comment";
import Comment from "@/components/Comment/Comment.vue";
import CommentInfoInput from "@/components/Comment/CommentInfoInput.vue";
import BgBoard from "@/components/BgBoard.vue";
// import VueMarkdownEditor, {xss} from '@kangc/v-md-editor';

// 调用方法将 markdown 转换成 html 并使用 xss 过滤

export default {
    name: "ArticleDetail",
    components: {BgBoard, CommentInfoInput, Comment, Loading, WangEditor},
    watch: {
        '$route.params.articleId': {
            handler() {
                this.getArticleData();
            }
        }
    },
    data() {
        return {
            initSuccess: false,
//             markdown: `
// # heading 1
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
//
// ## heading 2
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
//
// contentcontentcontent
//
// ### heading 3
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
//
// ## heading 2
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
//
// ### heading 3
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// contentcontentcontent
// `,

            article: {},
            loading: false,
            limit: 5,
            titles: [],
            titlesDoms: [],
            scrollHandler: null,
            form: {
                nickname: '',
                email: '',
                url: '',
                commentContent: '',
                articleId: null,
                pid: null,
            },
            comments: [],
            total: null,
        }
    },
    created() {
        this.getArticleData()
    },
    mounted() {
        // 切换页面时滚动条自动滚动到顶部
        // window.scrollTo(0, 0);
        // 监听滚动事件,随着视口高度高亮对应的目录标签
        // window.addEventListener('scroll', this.throttle(this.handleScroll,4000))
        // 因为得等md渲染完毕，才能显示违章目录读取，否则一开始显示目录读取时由于请求还未返回值而读取空值
        this.initSuccess = true
        this.scrollHandler = this.debounce(this.handleScroll, 5)
        window.addEventListener('scroll', this.scrollHandler)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler)
    },

    methods: {
        handleCopyCodeSuccess() {
            console.log(111)
            this.$refs.alertBox.classList.remove('hidden')
            setTimeout(() => {
                this.$refs.alertBox.classList.add('hidden')
            }, 3000)
        },
        getTitles() {
            // 文章目录操作
            const anchors = this.$refs.articleContent.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
            // 给h1，2，3标签设置id
            anchors.forEach((item, index) => {
                item.setAttribute('id', 'header-' + index)
            })
            // 存数组，后续监听该标题的变化位置来高亮标题
            this.titlesDoms = anchors

            // 判断标题里是否为空
            const titles = Array.from(anchors).filter((title) => title.innerText.trim() !== null);
            if (!titles.length) {
                this.titles = [];
                return;
            }

            const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();
            this.titles = titles.map((el, index) => ({
                id: 'header-' + index,
                title: el.innerText,
                // lineIndex: el.getAttribute('data-v-md-line'),
                level: Number(el.nodeName.substring(1, 2)),
                indent: hTags.indexOf(el.tagName),
            }));
            setTimeout(() => {
                this.setClickListen()
                // 初始化高亮
            }, 50)
        },
        // 目录点击锚点跳转操作
        handleAnchorClick(anchor) {
            const {articleContent} = this.$refs;
            const heading = articleContent.$el.querySelector(`[id="${anchor.id}"]`);
            if (heading) {
                // Note: If you are using the preview mode of the editing component, the method name here is changed to previewScrollToTarget
                articleContent.scrollToTarget({
                    target: heading,
                    scrollContainer: window,
                    top: 80,
                });
            }
        },

        // 点击A标签不影响url路径为#
        // changeHash(id) {
        //     const element = document.getElementById(id)
        //     const distanceTop = element.offsetTop;
        //     window.scrollTo({
        //         top: distanceTop-82,
        //         left:0,
        //         behavior:'smooth',
        //     })
        // },
        getTime(time) {
            return common.timestampToTime(time, 1)
        },
        async getArticleData() {
            this.$store.dispatch('openLoadingPage')
            const res = await selectById(this.$route.params.articleId)
            if (res.code === 20000) {
                this.article = res.data
                // this.article.content = xss.process(VueMarkdownEditor.themeConfig.markdownParser.render(this.article.content));
                this.$nextTick(() => {
                    this.getTitles()
                })
                this.$store.state.currArticleId = res.data.id
                this.form.articleId = res.data.id
                this.getCommentList()
                this.$store.dispatch('closeLoadingPage')
            }
        },


        // 给H1,H2加自定义标签，后续检测并高亮


        // 加工目录数组
        generateCatalog() {
            // 等待所有dom标签挂载完毕
            this.$nextTick(() => {
                // 获取到文章的根标签
                const articleContent = this.$refs.articleContent;
                // 定义要分层的标签
                const titleTag = ["H1", "H2", "H3", "H4", "H5", "H6"];
                // 空数组收集所有的层级对象,id标识每一个div,标题,层级,节点标签名
                let titles = [];
                articleContent.childNodes.forEach((item, index) => {
                    if (titleTag.includes(item.nodeName)) {
                        const id = "header-" + index;
                        item.setAttribute("id", id);
                        // 后续遍历目录标签titleDom,判断顶部高度距离来高亮标签的
                        this.titlesDoms.push(item)
                        titles.push({
                            id: id,
                            title: item.innerHTML,
                            // 截取节点名H3  的数字部分作为层数,
                            // 截取下标为1的字符串,不截取下标为2的字符串,也就是左闭右开
                            // 层级作用为缩进的长度
                            level: Number(item.nodeName.substring(1, 2)),
                            nodeName: item.nodeName
                        })
                    }
                })
                // 等待a标签挂载完毕后设置监听器
                setTimeout(() => {
                    this.setClickListen()
                    // 初始化高亮
                }, 50)
                this.titles = titles
            })
        },
        // 高亮目录标题
        // 给每一个a标签设置点击监听器，点击后触发高亮方法
        setClickListen() {
            const headers = document.querySelectorAll('a');
            headers.forEach(header => {
                // 如果是id为header开始的a标签，则设置监听
                if (header.id.startsWith('header')) {
                    //监听自己，如果被点击了，就触发函数，将自己丢过去
                    header.addEventListener('click', () => {
                        // 点击时取消监听，防止点击后亮完监听滚动其他的也亮了
                        this.highlight(header)
                    })
                }
            })
        },
        highlight(header) {
            // 清空所有a标签的高亮,进行初始化
            document.querySelectorAll('a.highlight')
                .forEach(a => a.classList.remove('highlight'));
            //将此次点击的header目录进行添加高亮
            if (document.querySelector(`a#${header.id}`) === null) {
                console.log('空')
                return
            }
            document.querySelector(`a#${header.id}`).classList.add('highlight')
        },
        // 防抖，
        // 为滚动后目录定位做准备，防止多次触发scroll事件
        // 类似于加一个冷却，在这个冷却阶段过后的值才为最终值
        // 而不是滚轮持续触发并且持续判断
        //默认冷却为100ms
        // 只有在用户停止输入或滚动等操作超过 delay 毫秒后,
        // 才会触发原始函数 fn 的执行。
        // 这样可以大大减少不必要的函数调用,从而提高性能。
        // 再举个例子,好比电梯要关闭上楼,此时不断进来人,电梯门不断的重新刷新关门时间
        // 你老板疯狂给你发任务,而你只听到了最后一件事,中间的事由于你每秒只能接收一件事
        // 中间说太快了超过一件事的被clearTimeOut了
        debounce(fn, delay = 100) {
            let timer = null;
            // 封装一个闭包,内部函数使用外部timer定时器,防止全局污染
            // 该闭包函数有debounce调用后返回
            // 且其返回值作为防抖函数给scroll事件多次调用
            // 同时该函数还能用到timer变量,防止变量名的外部占用
            // 好比开了一个小空间,将变量timer共享在所有调用debounce返回的新fn函数里
            // 绕这么大一圈就是为了不污染全局变量名
            return function (...args) {
                // 下次触发时定时器清空,冷却时间重置
                // 重新计时delay
                clearTimeout(timer);
                timer = setTimeout(() => {
                    // 调用需要防抖的函数fn
                    fn.apply(this, args);
                }, delay)
            }
        },

        handleScroll() {
            // 遍历所有item,获取其位置
            const rects = Array.from(this.titlesDoms).map(titleDom => {
                // 将所有位置信息封装成新的数组
                return titleDom.getBoundingClientRect()
            })
            const range = 200;
            // 每次滚动遍历判断每一个的位置是否满足条件
            for (let i = 0; i < this.titlesDoms.length; i++) {
                // 保存单个的位置和标签
                const titleDom = this.titlesDoms[i];
                const rect = rects[i];
                // console.log(titleDom,'距顶值',rect.top)
                // console.log(rects[i+1].top)
                // 判头顶法
                // 当top大于0时说明目录在视窗内,如果距顶小于范围则高亮

                // 70为顶部导航栏的高度，这里以70为起点说明必须距顶为70 说明在视觉窗口内，同时距顶小于range范围则高亮
                if (rect.top >= 70 && rect.top <= range) {
                    this.highlight(titleDom)
                    // 结束循环,后续标签不用管位置了
                    break;
                }
                //判身体法.
                //判断下一个目录的距顶大于视口,也就是在视口外面,且在当前目录里面

                // 当dom在视口上时,且下一个值有值,下一个值的距顶大于了视口高度
                // 也就是说不一定非要距顶小于range,
                // 还要当下一个标题存在且在视口外也就是大于视口高度
                // 且当前的标签内容在视口上面,也就是说正在看标题内容时
                if (rect.top < 70
                    && rects[i + 1]
                    && rects[i + 1].top > document.documentElement.clientHeight) {
                    this.highlight(titleDom)
                    break
                }



            }
            // 判断距顶值是否大于banner，如果是则固定目录
            const toTop=document.documentElement.scrollTop || document.body.scrollTop
            if (toTop>350){
                this.$refs.directory.classList.add('directoryFixed')
            }else {
                this.$refs.directory.classList.remove('directoryFixed')
            }
        },
        // 节流
        // ,类似于技能冷却,第一次可以使用,后续刷新冷却值起点last为now,now经过了interval秒后
        // 也就是now-last 要大于间隔时间interval,冷却才结束,两段时间间隔大于interval
        // 总的来说,函数一直在变,变量不变,条件达到则更新变量触发函数
        // 而防抖是函数一直在引起变量timer为空,当条件达到,则触发函数
        throttle(fn, interval) {
            // 第一个上车的人
            let last = 0
            // 闭包
            return function () {
                // 保存调用函数的this上下文，也就是window
                let context = this
                let args = arguments
                // 记录最新乘客
                let now = +new Date()
                // 如果第一个和最后一个上车的间隔超过规定发车时间
                // 则调用函数,这里第一次last为0直接调用
                // 因此也称第一次调用后一段时间不能使用.技能冷却
                if ((now - last) > interval) {
                    // 更新最新时间,
                    // 然后随着now大到第一次调用last,则可调用下一次
                    last = now
                    fn.apply(context, args)
                }
            }
        },


        // 提交评论
        submitComment() {
            // if (!this.form.commentContent || !this.form.nickname) {
            //     alert('评论内容和昵称不能为空哦~')
            //     return
            // }
            this.$store.dispatch('openLoadingPage')
            submitComment(this.form).then(res => {
                window.location.reload()
                if (res === 20000) {
                    console.log('提交评论成功！')
                    this.$store.dispatch('closeLoadingPage')
                }
            }).catch(err => {
                console.log('提交失败,错误信息为', err)
            })
        },
        // 获取评论
        getCommentList() {
            selectList(this.article.id, this.limit).then(res => {
                // console.log(res)
                if (res.code === 20000) {
                    this.comments = res.data.records
                    this.$store.state.total = res.data.total
                }
            })
        },
    }

}
</script>

<style scoped>


.themeText {
    color: var(--text-color);
}

.themeBg {
    background: var(--bg1);
}

.articleDetailBox {
    min-height: calc(100vh - 70px);
}
.articleLayOut{
    overflow: hidden;
    max-width: 1324px;
    margin: auto;
    overflow-wrap: break-word;
    min-height: calc(100vh - 100px);
    display: flex;
    position: relative;
    justify-content: center;
}

.articleBody {
    border-radius: 20px;
    min-height: 400px;
    margin-bottom: 20px;
    overflow: hidden;
}


.titleBar {
    display: flex;
    justify-content: center;
    z-index: 10;
}

.titleBar div {
    margin: 0 10px;
}


.articleContent {
    min-height: 300px;
    margin-bottom: 20px;
    padding-top: 40px;
}


.leftSide {
    flex: 1;
    margin-right: 20px;
}

.rightSide {
    width: 223px;
    position: relative;
}

.loading-wrapper {
    position: absolute;
    width: 100%;
}

.directory {
    border-radius: 20px;
    min-height: 400px;
    padding: 10px;
    color: #414141;
    width: 223px;
}


.title {
    padding-left: 0px;
    cursor: pointer;
}

.title a {
    display: block;
    padding: 10px;
    color: #414141;
}

.title a:hover {
    background: var(--bg4);
}

/*高亮时的样式*/
.highlight {
    color: #ff1265 !important;
    font-weight: bolder;
}

.articleComment {
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
}

.commentTitle {

    text-align: center;
    font-size: 30px;
    padding: 0 20px;
}

.nullComment {
    margin-top: 20px;
    border-radius: 20px;
    padding: 24px;
}

.alertBox {
    transition: 0.2s;
    position: fixed;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    z-index: 999;
}

.hidden {
    opacity: 0;
    top: 0;
}
.directoryFixed{
    position: fixed;
    z-index: 99;
    top: 20px;
    width: 223px;
}
</style>
