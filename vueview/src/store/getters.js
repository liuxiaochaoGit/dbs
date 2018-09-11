/*export default (state) => {
    return {
        getType() {
            return '1344444';
        }
    }
};*/
export const getKeyword = (state) => {
    return state.keyword
};
//
export const getType = (state) => {
    return state.type
};
// 搜索类型  用户/帖子   默认是帖子
export const getSearchType = (state) => {
    return state.searchType
};
// 默认的话题列表
export const getGamitList = (state) => {
    return state.gamitList
};
// 当前聊天的用户
export const getChatUser = (state) => {
    return state.chatUser;
};
// 当前的聊天记录
export const getMsglist = (state) => {
    return state.msgList;
};
// getSelftype
export const getSelftype = (state) => {
    return state.selfType;
};


