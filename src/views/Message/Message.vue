<template>
    <div class="messageBox">
        <BgBoard title="留言" content="心情不好?那就来这里吐槽一下,保证你会觉得好多了!"/>
        <el-card class="box-card cardBox">
            <div class="messageInput" v-show="!this.$store.state.currReply">
                <CommentInfoInput :custom-placeholder="'留个言再走呗~'"/>
            </div>
            <div class="messageBody">
                <Comment v-for="(message,index) in messages" :comment="message" :key="index"
                         style="border-radius: 10px"/>
            </div>
        </el-card>
    </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
import Comment from "@/components/Comment.vue";
import CommentInfoInput from "@/components/CommentInfoInput.vue";
import BgBoard from "@/components/BgBoard.vue";
import Loading from "@/components/Loading.vue";
import {selectListByPage} from "@/api/message";

export default {
    name: "Message",
    components: {Loading, BgBoard, CommentInfoInput, Comment, Banner},
    data() {
        return {
            messages: [
                // { nickname: '',
                //     email: '',
                //     url: '',
                //     commentContent: '',
                //     articleId: null,
                //     pid: null,}
            ]
        }
    },
    created() {
        this.getAllMessages()
    },
    methods: {
        async getAllMessages() {
            this.loading = true
            const res = await selectListByPage(1, 999)
            // const res = await selectList()
            if (res.code === 20000) {
                this.messages = res.data.records
            }
            this.loading = false
        }
    }
}
</script>

<style scoped>
.cardBox {
    width: 60%;
    margin: auto;
    padding: 0 !important;

}

.messageBox {
    margin: 0 auto;
    padding-top: 60px;
    min-height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;

}

.messageInput {
    padding: 10px;
    height: 300px;
    background: white;
    width: 800px;
}

.messageBody {
    background: red;
    overflow: hidden;
    width: 800px;
}
</style>
