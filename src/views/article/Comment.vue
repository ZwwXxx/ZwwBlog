<template>
    <div>
        <!--一级评论-->
        <div class="commentBox">
            <div class="commentAvatar">
                <a :href="comment.url" target="_blank" v-show="comment.url&&comment.email">
                    <img :src="`http://q1.qlogo.cn/g?b=qq&nk=${comment.email.split(`@`)[0]}&s=100`" loading="lazy">
                </a>
                <img src="../../assets/logo.png" v-show="!comment.email" loading="lazy">
            </div>
            <div class="commentBody">
                <a class="showNickName" :href="comment.url" target="_blank">{{ comment.nickname }}</a>
                <div class="showComment themeText">{{ comment.commentContent }}</div>
                <div class="commentFooter">
                    <div class="commentTime">{{ getTime(comment.createTime) }}</div>
                    <div class="thumbUp"><i class="fa fa-thumbs-o-up"></i> 666</div>
                    <i class="fa fa-thumbs-o-down thumbDown"></i>
                    <!--当用户点击回复时，如果针对当前回复对象显示 取消回复选项-->
                    <button @click="showReplyView(comment.id,comment.nickname)">
                        {{ this.$store.state.currReply === comment.id ? '取消回复' : '回复' }}
                    </button>
                </div>
            </div>
        </div>

        <!--评论回复输入界面-->
        <div class="replyBox" v-show="this.$store.state.currReply===comment.id">
            <!--<div class="replyAvatar"><img src="../assets/logo.png" alt=""></div>-->
            <div class="replyMain">
                <CommentInfoInput/>
            </div>
        </div>

        <!--二级评论-->
        <div v-show="comment.children&&comment.children.length>0">
            <div class="commentBox" v-for="subComment in comment.children" :key="subComment.id"
                 style="padding-left: 50px">
                <div class="commentAvatar">
                    <a :href="subComment.url" target="_blank" v-show="subComment.url&&subComment.email">
                        <!--<img :src="`http://q1.qlogo.cn/g?b=qq&nk=${subComment.email.split(`@`)[0]}&s=100`" loading="lazy">-->
                    </a>
                    <img src="../../assets/logo.png" v-show="!subComment.email" loading="lazy">
                </div>
                <div class="commentBody">

                    <div class="showComment themeText" style="margin-top: 0">
                        <a
                            class="showNickName" :href="subComment.url" target="_blank" style="margin-right: 5px">{{
                                subComment.nickname
                            }}
                        </a>
                        <a style="color: #00b4d8 ;cursor: pointer" v-if="subComment.replyname!==subComment.nickname">
                            回复
                            @{{ subComment.replyname }}
                        </a>
                        <!--文章内容区域-->
                        {{ subComment.commentContent }}
                    </div>
                    <div class="commentFooter">
                        <div class="commentTime">{{ getTime(subComment.createTime) }}</div>
                        <div class="thumbUp"><i class="fa fa-thumbs-o-up"></i> 666</div>
                        <i class="fa fa-thumbs-o-down thumbDown"></i>
                        <!--当用户点击回复时，如果针对当前回复对象显示 取消回复选项-->
                        <button @click="showReplyView(subComment.id,subComment.nickname)">
                            {{ currReply === subComment.id ? '取消回复' : '回复' }}
                        </button>
                    </div>
                </div>
                <!--子评论回复输入界面-->
                <div class="replyBox" v-show="currReply===subComment.id">
                    <!--<div class="replyAvatar"><img src="../assets/logo.png" alt=""></div>-->
                    <div class="replyMain">
                        <CommentInfoInput/>
                    </div>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
import common from "@/utils/timestampToTime";
import CommentInfoInput from "@/views/article/CommentInfoInput.vue";

export default {
    name: "Comment",
    components: {CommentInfoInput},
    props: ['comment'],
    // 计算属性设置值时改变，且获取值时获取，避免v-for里读取不到this.$store问题
    // 动态变化
    computed: {
        currReply: {
            get() {
                return this.$store.state.currReply
            },
            set(commentId) {
                this.$store.commit('changeCurrReply', commentId)
            }
        }
    },
    methods: {
        getTime(time) {
            return common.timestampToTime(time, 1)
        },
        showReplyView(commentId, nickName) {
            if (commentId === this.$store.state.currReply) {
                this.$store.state.currReply = null
                return
            }
            this.currReply = commentId
            this.$store.state.currReplyName = nickName
        },
    }
}
</script>

<style scoped>
.themeText {
    color: var(--text-color);
}

.commentBox {
    background: var(--bg1);
    padding-top: 10px;
    display: flex;
    border-bottom: 1px solid #adadad;
    flex-wrap: wrap;
}

.commentBox img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    transition: 0.2s;
}

.commentAvatar {
    padding: 10px 20px;
    /*flex: 20%;*/

}

.commentBox img:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}

.commentBody {
    padding: 10px 25px 10px 0;
    height: 80%;
    width: 663px;
    flex: 1;
}

.showComment {
    margin: 10px 0 5px ;
    overflow-wrap: break-word;
    /*max-width: 556px;*/
}

.commentFooter {
    position: relative;
    height: 30px;
    display: flex;
    align-items: center;
    color: var(--text-color);
}

.replyBox {
    background: var(--bg1);
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #adadad;
    flex: 1;
}

.replyAvatar {
    flex: 8%;
    margin-right: 20px;
}

.replyMain {
    flex: 92%;
}


.replyInput textarea {
    resize: none;
    width: 100%;
    height: 52px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 5px;
    border: none;
    outline: none;
}

.showNickName {
    color: #a4a4a4;
    transition: 0.2s;
}

.showNickName:hover {
    color: #bb0000;
}

.commentFooter button {
    border: none;
    cursor: pointer;
    height: 16px;
    margin-left: 130px;
    background: transparent;
    color: var(--text-color);
    padding: 0;
}

.thumbUp {
    position: absolute;
    left: 150px;
    cursor: pointer;
}

.thumbDown {
    position: absolute;
    left: 210px;
    cursor: pointer;
}

.thumbUp:hover {
    color: #00b4d8;
}

.thumbDown:hover {
    color: #00b4d8;
}
</style>
