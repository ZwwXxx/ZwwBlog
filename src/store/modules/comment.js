const state = {
    currReply: null,
    currReplyName: '',
    currReplyTalkId: null,
    total: null
}

const mutations = {
    CHANGE_CURR_REPLY(state, id) {
        state.currReply = id
    },
    CHANGE_CURR_REPLY_TALK_ID(state, id) {
        state.currReplyTalkId = id
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
