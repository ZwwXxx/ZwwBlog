<template>
    <div class="talkBox">
        <BgBoard title="说说" content="记录生活中的点点滴滴,分享碎片化的思考。"/>
        <div class="talkMain">
            <div class="talkBody" v-for="(item ,index) in talk" :key="index">
                <div class="leftSide"><img class="avatar"
                                           src="https://cdn.zww0891.fun/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240701112347.jpg"
                                           alt=""></div>
                <div class="rightSide">
                    <div class="name">Zww</div>
                    <div class="content">{{ item.talkContent }}</div>
                    <div class="toolbar">
                        <div class="timeToNow">{{ getTime(item.createTime) }}<span>{{isDay?'天':'小时'}}</span>前</div>
                        <div class="commentNlike">
                            <div class="comment" @click="showInput(item.id)"><i class="fa fa-commenting-o "></i>
                                {{
                                item.commentNum
                                }}
                            </div>
                            <div class="like"><i class="fa fa-thumbs-o-up"></i> {{ item.likes }}</div>
                            <div class="cancelReply" v-show="currRepyTalkId===item.id" @click="currRepyTalkId=null">
                                收起
                            </div>
                        </div>
                    </div>
                    <CommentInfoInput v-show="currRepyTalkId===item.id&&!currReply"/>
                    <Comment v-for="comment  in talkComment" :key="comment.id" :comment="comment"
                             v-show="currRepyTalkId===item.id"/>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BgBoard from "@/components/BgBoard.vue";
import CommentInfoInput from "@/components/CommentInfoInput.vue";
import Comment from "@/components/Comment.vue";
import {selectList} from "@/api/talk";
import {selectList as selectTalkCommentList} from "@/api/talkComment";
// import common from "@/utils/timestampToTime";


export default {
    name: "Talk",
    components: {Comment, CommentInfoInput, BgBoard},
    data() {
        return {
            isShow: false,
            talk: [],
            talkComment: [],
            isDay: false
        }
    },
    computed: {
        currRepyTalkId: {
            get() {
                return this.$store.state.currRepyTalkId
            },
            set(talkId) {
                this.$store.commit('changeCurrReplyTalkId', talkId)
            }
        },
        currReply: {
            get() {
                return this.$store.state.currReply
            },
            set(commentId) {
                this.$store.commit('changeCurrReply', commentId)
            }
        }
    },
    mounted() {
        this.getTalkData()
    },
    methods: {
        getTime(createTime) {
            const nowTime = (new Date().getTime() - createTime) / 60 / 60 / 24 / 1000
            if (nowTime < 1) {
                this.isDay = false
                return Math.floor(nowTime * 24)
            }
            this.isDay=true
            return Math.floor(nowTime)
        },
        async showInput(id) {
            if (id === this.$store.state.currRepyTalkId) {
                this.$store.state.currRepyTalkId = null
                return
            }
            this.currRepyTalkId = id
            const res2 = await selectTalkCommentList(id, 999)
            if (res2.code === 20000) {
                this.talkComment = res2.data.records
            }
        },
        async getTalkData() {
            const res = await selectList(1, 999)
            if (res.code === 20000) {
                this.talk = res.data.records
            }

        }

    },

}
</script>

<style scoped>
.talkBox {
    padding-top: 60px;
    min-height: calc(100vh - 70px);
    border-radius: 10px;
}

.talkMain {
    width: 62%;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    background: var(--bg1);
    padding: 20px 60px;
}

.talkBody {
    margin: 0 auto;

    padding: 50px 0;
    display: flex;
    border-bottom: 1px solid var(--text-color);
}

.leftSide {
    margin-right: 15px;
}

.rightSide {
    display: flex;
    flex-direction: column;
    position: relative;
}

.name {
    margin-bottom: 20px;
}

.avatar {
    height: 60px;
    width: 60px;
}

.content {
    margin-bottom: 20px;
}

.toolbar {
    display: flex;
    width: 300px;
    justify-content: space-between;
}

.commentNlike {
    display: flex;
    align-items: center;
}

.comment {
    margin-right: 15px;
    cursor: pointer;
}

.like {
    margin-right: 15px;
    cursor: pointer;
}

.cancelReply {
    position: absolute;
    cursor: pointer;
    color: #00a2cc;
    right: 0;
}
</style>
