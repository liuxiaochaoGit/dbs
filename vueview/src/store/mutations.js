export default {
    setType(state, n) {
        state.type = n;
    },
    setKeyword(state, n) {
        state.keyword = n;
    },
    setSearchType(state, n) {
        state.searchType = n;
    },
    setChatUser(state,n){
        state.chatUser  = n;
    },
    setMsglist(state,n){
        state.msgList.push(n);
    },
    setSelftype(state,n){
        state.selfType = n;
    }

}
