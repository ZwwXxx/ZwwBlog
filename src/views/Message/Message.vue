<template>
    <div class="messageBox">
        <div class="messageInput" v-show="!this.$store.state.currReply">
            <CommentInfoInput :custom-placeholder="'留个言再走呗~'"/>
        </div>
        <div class="messageBody">
            <Comment v-for="(message,index) in messages" :comment="message" :key="index" style="border-radius: 10px"/>
        </div>
    </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
import Comment from "@/components/Comment.vue";
import CommentInfoInput from "@/components/CommentInfoInput.vue";
import {selectList} from "@/api/message";

export default {
    name: "Message",
    components: {CommentInfoInput, Comment, Banner},
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
            const res = await selectList(999)
            if (res.code === 20000) {
                console.log(res.data.records)
                this.messages = res.data.records
            }
            this.loading = false
        }
    }
}
</script>

<style scoped>
.messageBox {
    padding-top: 82px;
    min-height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
}

.messageInput {
    border-radius: 10px;
    padding: 10px;
    height: 300px;
    background: white;
    min-width: 400px;
}

.messageBody {
    border-radius: 10px;
    background: red;
    overflow: hidden;
    max-width: 800px;
}
</style>
