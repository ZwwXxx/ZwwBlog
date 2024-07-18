<template>
    <div style="max-width: 100%">
        <div class="commentTextarea">
                    <textarea class="commentContent"
                              :placeholder="this.$store.state.currReply?`回复@${this.$store.state.currReplyName}`:this.placeholder"
                              v-model="form.commentContent"/>
        </div>
        <div class="commentorInfo">
            <div style="position: relative">
                <i class="fa fa-user"
                   style="position:absolute;top: 50%;transform: translateY(-50%)translateX(8px)"></i>
                <input type="text" placeholder="请输入你的网名..." required
                       v-model="form.nickname">
            </div>
            <div style="position: relative">
                <i class="fa fa-envelope"
                   style="position:absolute;top: 50%;transform: translateY(-50%)translateX(8px)"></i>
                <input type="text" placeholder="请输入email（选填）..." v-model="form.email">
            </div>
            <div style="position: relative">
                <i class="fa fa-paperclip "
                   style="position:absolute;top: 50%;transform: translateY(-50%)translateX(8px)"></i>
                <input type="text" placeholder="请输入主页地址（选填）..." v-model="form.url">
            </div>
        </div>
        <div class="submit">
            <button @click="submitComment">
                提交评论
            </button>
        </div>
    </div>
</template>

<script>
import {submitComment} from "@/api/comment";

export default {
    name: "CommentInfoInput",
    props: ['article'],
    data() {
        return {
            form: {
                nickname: 'Zww',
                replyname: '',
                email: '',
                url: '',
                commentContent: '',
                articleId: null,
                pid: null,
            },
            placeholder: '你的每一条评论我都会look的~~'
        }
    },
    methods: {
        // 发起请求后刷新评论区域,回填数据
        commentRefrash() {
            this.$store.state.componentKey=this.$store.state.componentKey+1
        },
        // 提交评论
        submitComment() {
            // if (!this.form.commentContent || !this.form.nickname) {
            //     alert('评论内容和昵称不能为空哦~')
            //     return
            // }

            // 由于请求是异步的，articleId如果放在data里会出现赋予null的情况
            this.form.articleId = this.$store.state.currArticleId
            this.form.pid = this.$store.state.currReply
            this.form.replyname = this.$store.state.currReplyName
            submitComment(this.form).then(res => {

                window.location.reload()
                if (res === 20000) {
                    console.log('提交评论成功！')

                }
            }).catch(err => {
                console.log('提交失败,错误信息为', err)
            })
        },
    }
}
</script>

<style scoped>

.commentContent {
    width: 100%;
    height: 100px;
    margin: 20px 0;
    outline: none;
    border: none;
    resize: none;
    padding: 15px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.commentorInfo {
    display: flex;
    justify-content: space-between;
    outline: none;
    border: none;
}

.commentorInfo input {
    border-radius: 5px;
    padding: 10px 10px 10px 30px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}


.submit {
    margin: 20px 0 0;
    display: flex;
    justify-content: right;
}

.submit button {
    padding: 10px;
    border: none;
    cursor: pointer;
    background: #cb1433;
    color: white;
    border-radius: 5px;
}

</style>
