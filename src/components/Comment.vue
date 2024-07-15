<template>
    <div class="commentBox">
        <div class="commentAvatar">
            <a :href="comment.url" target="_blank" v-show="comment.url&&comment.email">
                <img :src="`http://q1.qlogo.cn/g?b=qq&nk=${comment.email.split(`@`)[0]}&s=100`" loading="lazy">
            </a>
            <img src="../assets/logo.png" v-show="!comment.email" loading="lazy">
        </div>
        <div class="commentBody">
            <a class="showNickName" :href="comment.url" target="_blank">{{ comment.nickname }}</a>
            <div class="showComment">{{ comment.commentContent }}{{comment.children}}</div>
            <div class="commentFooter">
                <div class="commentTime">{{ getTime(comment.createTime) }}</div>
                <div class="thumbUp"><i class="fa fa-thumbs-o-up"></i> 666</div>
                <i class="fa fa-thumbs-o-down thumbDown"></i>
                <button @click="showReplyView(comment.id)">回复</button>
            </div>
            <!--子评论界面-->
            <div class="replyBox" v-if="currReply===comment.id">
                <div class="replyAvatar"><img src="../assets/logo.png" alt=""></div>
                <div class="replyMain">
                    <div class="replyInput">
                        <textarea :placeholder="`回复 @${comment.nickname}:`"></textarea>
                    </div>
                    <div class="replyToolBar">
                        <button class="replyButton">发布</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import common from "@/utils/timestampToTime";

export default {
    name: "Comment",
    props: ['comment'],
    data() {
        return {
            currReply: null,
            replyView: false,
        }
    },
    methods: {
        getTime(time) {
            return common.timestampToTime(time, 1)
        },
        showReplyView(commentId) {
            if (commentId === this.currReply) {
                this.currReply = null
                return
            }
            this.currReply = commentId
        },
    }
}
</script>

<style scoped>

.commentBox {
    background: #f3f3f3;
    padding-top: 30px;
    display: flex;
    border-bottom: 1px solid #adadad;

}

.commentBox img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    transition: 0.2s;
}

.commentAvatar {
    padding: 10px 25px;
    /*flex: 20%;*/

}

.commentBox img:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}

.commentBody {
    padding: 10px 25px 10px 0;
    height: 80%;
    width: 663px;
}

.showComment {
    margin: 25px 0;
    overflow-wrap: break-word;
    /*max-width: 556px;*/
}

.commentFooter {
    position: relative;
    height: 30px;
    display: flex;
    align-items: center;
    color: #707070;
}

.replyBox {
    padding-top: 25px;
    display: flex;
}

.replyAvatar {
    flex: 8%;
    padding: 0 15px;
}

.replyMain {
    flex: 92%;
}

.replyToolBar {
    margin-top: 10px;
    display: flex;
    justify-content: right;
}

.replyButton {
    padding: 6px 15px;
    background: #00b4d8;
    color: #ffffff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
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
    color: #707070;
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
    color: #707070;
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
