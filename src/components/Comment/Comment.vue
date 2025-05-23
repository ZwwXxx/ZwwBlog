<template>
  <div class="commentBox">
    <el-row>
      <el-col :span="2" :xs="4" class="commentAvatar">
        <a :href="comment.url" target="_blank" v-if="comment.email">
          <el-avatar
            v-if="comment.email"
            :src="`http://q1.qlogo.cn/g?b=qq&nk=${comment.email ? comment.email.split(`@`)[0] : ''}&s=100`"
          />
        </a>
        <a v-else href="https://www.zww0891.fun" target="_blank">
          <el-avatar :src="require('../../assets/logo.png')" />
        </a>
      </el-col>
      <el-col :span="22" :xs="20">
        <el-row>{{ comment.nickname }}</el-row>
        <el-row style="word-wrap: break-word">
          {{ comment.commentContent }}
        </el-row>
        <el-row style="white-space: nowrap; display: flex; justify-content: space-between">
          <el-col>
            <span style="color: gray">IP:广东</span>
          </el-col>
          <el-col style="display: flex; justify-content: flex-end">
            <!--<div style="margin-right: 10px;">-->
            <!--  👍???-->
            <!--</div>-->
            <div style="cursor: pointer; color: #49b1f5" @click="showReplyView(comment.id, comment.nickname)">
              {{ this.$store.state.comment.currReply === comment.id ? '取消回复' : '回复' }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div style="color: gray">{{ getTime(comment.createTime) }}</div>
        </el-row>
      </el-col>
    </el-row>

    <!--回复框-->
    <el-row v-show="this.$store.state.comment.currReply === comment.id">
      <div class="replyBox">
        <!--<div class="replyAvatar"><img src="../assets/logo.png" alt=""></div>-->
        <div class="replyMain">
          <CommentInfoInput />
        </div>
      </div>
    </el-row>

    <!--二级评论-->
    <el-row>
      <div v-show="comment.children && comment.children.length > 0">
        <div class="sub-comment" v-for="subComment in comment.children" :key="subComment.id">
          <el-row>
            <el-col :span="2" :offset="2" :xs="{ span: 4, offset: 4 }">
              <a :href="subComment.url" target="_blank" v-if="subComment.email">
                <el-avatar
                  v-if="subComment.email"
                  :src="`http://q1.qlogo.cn/g?b=qq&nk=${subComment.email ? subComment.email.split(`@`)[0] : ''}&s=100`"
                />
              </a>
              <a v-else href="https://www.zww0891.fun" target="_blank">
                <el-avatar :src="require('../../assets/logo.png')" />
              </a>
            </el-col>
            <el-col :span="20" :xs="16">
              <el-row>
                {{ subComment.nickname }}
                <a style="color: #00b4d8; cursor: pointer" v-if="subComment.replyname !== subComment.nickname">
                  <!--当回复人为一级评论人的名字时不需要显示，自己脑补b站评论效果吧，或者调一下看下不解释了-->
                  <span v-show="subComment.replyname !== comment.nickname">回复@{{ subComment.replyname }}</span>
                </a>
              </el-row>
              <el-row style="word-wrap: break-word">
                {{ subComment.commentContent }}
              </el-row>
              <el-row style="white-space: nowrap; display: flex; justify-content: space-between">
                <el-col>
                  <span style="color: gray">IP:广东</span>
                </el-col>
                <el-col style="display: flex; justify-content: flex-end">
                  <!--<div style="margin-right: 10px;">-->
                  <!--  👍???-->
                  <!--</div>-->
                  <div
                    style="cursor: pointer; color: #49b1f5"
                    @click="showReplyView(subComment.id, subComment.nickname)"
                  >
                    {{ currReply === subComment.id ? '取消回复' : '回复' }}
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <div style="color: gray">{{ getTime(comment.createTime) }}</div>
              </el-row>
            </el-col>
          </el-row>
          <!--二级评论回复框-->
          <el-row>
            <!--子评论回复输入界面-->
            <div v-show="currReply === subComment.id">
              <div>
                <CommentInfoInput />
              </div>
            </div>
          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  import common from '@/utils/timestampToTime'
  import CommentInfoInput from '@/components/Comment/CommentInfoInput.vue'
  import { commentLike } from '@/api/comment'

  export default {
    name: 'Comment',
    components: { CommentInfoInput },
    props: ['comment'],
    // 计算属性设置值时改变，且获取值时获取，避免v-for里读取不到this.$store问题
    // 动态变化
    computed: {
      currReply: {
        get() {
          return this.$store.state.comment.currReply
        },
        set(commentId) {
          this.$store.commit('comment/CHANGE_CURR_REPLY', commentId)
        }
      }
    },
    methods: {
      async handleLike(cid) {
        const res = await commentLike(cid)
        if (res.code === 200) {
          window.location.reload()
        }
      },
      getTime(time) {
        return common.timestampToTime(time, 1)
      },
      showReplyView(commentId, nickName) {
        if (commentId === this.$store.state.comment.currReply) {
          this.$store.state.comment.currReply = null
          return
        }
        this.currReply = commentId
        this.$store.state.comment.currReplyName = nickName
      }
    }
  }
</script>

<style scoped>
  .commentBox {
    background: #ffffff;
    padding: 20px 20px 0;
  }

  .sub-comment {
    margin: 20px 0;
    gitpadding-left: 60px;
  }
  .commentAvatar img:hover {
    box-shadow: 0 0 10px black;
  }
</style>
