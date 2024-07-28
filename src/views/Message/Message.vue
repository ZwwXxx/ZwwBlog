<template>
    <div class="messageBox">
        <BgBoard title="留言" content="心情不好?那就来这里吐槽一下,保证你会觉得好多了!"/>
        <MyCard>
            <CommentInfoInput :custom-placeholder="'留个言再走呗~'" v-show="!this.$store.state.currReply"/>
            <Comment v-for="(message,index) in messages" :comment="message" :key="index"/>
        </MyCard>
    </div>
</template>

<script>
import Banner from "@/components/Banner/Banner.vue";
import Comment from "@/components/Comment/Comment.vue";
import CommentInfoInput from "@/components/Comment/CommentInfoInput.vue";
import BgBoard from "@/components/BgBoard.vue";
import Loading from "@/components/Loading.vue";
import {selectListByPage} from "@/api/message";
import MyCard from "@/components/MyCard.vue";

export default {
    name: "Message",
    components: {MyCard, Loading, BgBoard, CommentInfoInput, Comment, Banner},
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
.messageBox {
    padding-top: 60px;
    min-height: calc(100vh - 70px);

}

</style>
