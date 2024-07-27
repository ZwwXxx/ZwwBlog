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
                    <div class="content" v-html="item.talkContent">{{ item.talkContent }}</div>
                    <div class="toolbar">
                        <div class="timeToNow">
                            <span v-if="item.toNow >= 31536000000">{{ Math.floor(item.toNow / 31536000000) }} 年</span>
                            <span v-else-if="item.toNow >= 2592000000">{{ Math.floor(item.toNow / 2592000000) }} 月</span>
                            <span v-else-if="item.toNow >= 86400000">{{ Math.floor(item.toNow / 86400000) }} 天</span>
                            <span v-else-if="item.toNow >= 3600000">{{ Math.floor(item.toNow / 3600000) }} 小时</span>
                            <span v-else-if="item.toNow >= 60000">{{ Math.floor(item.toNow / 60000) }} 分钟</span>
                            <span v-else>{{ Math.floor(item.toNow / 1000) }} 秒</span>前
                        </div>
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
            isDay: false,
            isHour: false,
            isMinute: false,
            isSecond: false,
            now: null,
            nowDeep:null,
            test:1
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
        },
    },
    mounted() {
        this.getTalkData()
    },
    methods: {
        getTime(toNow) {
            // 天数
            const day = toNow / 60 / 60 / 24 / 1000
            // 小时
            const hour = toNow / 60 / 60 / 1000
            // 分钟
            const minute = toNow / 60 / 1000
            //秒
            const second = toNow / 1000

            if (day < 1 && hour < 1 && minute < 1) {
                return Math.floor(second)
            }
            if (day < 1 && hour < 1) {
                return Math.floor(minute)
            }
            // 天数小于1返回小时
            if (day < 1) {
                return Math.floor(hour)
            }
            this.isDay=true
            return Math.floor(day)
        },
        showInput(id) {
            if (id === this.currRepyTalkId) {
                this.$store.state.currRepyTalkId = null
                return
            }
            this.currRepyTalkId = id
            this.$nextTick(() => {
                this.getTalkComment(id)
            })

        },
        getTalkData() {
            selectList(1, 999).then(res => {
                if (res.code === 20000) {
                    this.talk = res.data.records
                }
            })
        },
        getTalkComment(id) {
            selectTalkCommentList(id, 999).then(res => {
                if (res.code === 20000) {
                    this.talkComment = res.data.records
                }
            })
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
    color: var(--text-color);

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
