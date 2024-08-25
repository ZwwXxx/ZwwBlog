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
import Banner from "@/views/Layout/Banner/Banner.vue";
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
      queryParams: {
        pageNum: 1,
        pageSize: 99,
      },
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
  mounted() {
    this.getAllMessages()
  },
  methods: {
    getAllMessages() {
      // this.$store.dispatch('openLoadingPage')
      selectListByPage(this.queryParams).then(res => {
        if (res.code === 200) {
          this.messages = res.rows
        }
        // this.$store.dispatch('closeLoadingPage')
      })
    }
  }
}
</script>

<style scoped>
.messageBox {
  min-height: calc(100vh - 70px);

}

</style>
