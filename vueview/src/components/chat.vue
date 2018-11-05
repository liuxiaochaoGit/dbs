<template>
    <div>
        <mt-header :title="chatUser.name">
            <router-link to="/groom" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="content">
            <div class="message_box" id="msgBox">
                <div v-for="msg,index in msgList" :key="index"
                     :class="msg.align == 'right' ? 'message message_right' : 'message message_left'">
                    <div class="head_img">
                        <img src="../assets/images/touxiang.png" alt="">
                    </div>
                    <p>{{msg.msg}}</p>
                </div>
            </div>
            <div class="input_box">
                <input type="text" v-model="message" @keyup.enter="senMsg">
                <mt-button size="small" @click="senMsg">发送</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import tool from '@/assets/javascripts/commonTool';

    export default {
        name: "v-chat",
        data() {
            return {
                id: '',
                message: '',
                // msgList:[]
            }
        },
        created() {
            // this.sockets.connect();
            // this.$socket.emit('join','');
        },
        computed: {
            chatUser() {
                return this.$store.getters.getChatUser;
            },
            msgList() {
                return this.$store.getters.getMsglist;
            }
        },

        watch: {
            'msgList': 'scrollToBottom'
        },
        sockets: {
            connect: function () {
                let vm = this;
                this.id = this.$socket.id;
                let userObj = {
                    userId: tool.getUser().id,
                    userName: tool.getUser().name,
                    portrait: tool.getUser().portrait,
                    socketId: this.$socket.id
                };
                this.$socket.emit('join', userObj);
                this.$socket.on('joined', (res) => {
                    console.log(res);
                });
                this.$socket.on('reciveMsg', (res) => {
                    console.log(res);
                    vm.receiveMsg(res);
                });

            },
            customEmit: function (val) {
                console.log(val);
            }
        },
        mounted(){
            // this.$socket.emit('connect', '');
        },
        methods: {
            senMsg() {
                let vm = this;
                let obj = {
                    msg: vm.message,
                    user: vm.chatUser.name,
                    msf: new Date().getTime()
                };
                vm.$socket.emit('sendMsg', obj);
                let msgObj = {
                    msg: vm.message,
                    align: 'right'
                };
                // setMsglist
                vm.$store.commit('setMsglist', msgObj);
                vm.message = '';
                // vm.msgList.push(msgObj);
                // console.log(vm.msgList);
            },
            receiveMsg(res) {
                console.log(res);
                let vm = this;
                let msgObj = {
                    msg: res.msg,
                    align: 'left'
                };
                vm.$store.commit('setMsglist', msgObj);
                // vm.msgList.push(msgObj);
                // console.log(vm.msgList);

            },
            // 控制始终显示最新的一条信息
            scrollToBottom: function () {
                this.$nextTick(() => {
                    var div = document.getElementById('msgBox');
                    div.scrollTop = div.scrollHeight
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .content {
        background: #f5f7fa;
        .message_box {
            position: relative;
            width: 100vw;
            height: calc(100% - 2.5rem);
            /*border: 1px solid red;*/
            box-sizing: border-box;
            padding: 0.6rem;
            overflow-y: auto;
            .message {
                text-align: left;
                margin-bottom: 0.6rem;
                div, p {
                    display: inline-block;
                    vertical-align: top;
                }
                p {
                    width: auto;
                    max-width: calc(100% - 2.5rem);
                    padding: 0.3rem;
                    border-radius: 3px;
                    background: #fff;
                    box-sizing: border-box;
                    word-break: break-all;
                }
            }
            .message_right {
                text-align: right;
                .head_img {
                    float: right;
                    margin-left: 0.3rem;
                }
                p {
                    background: #00B7FF;
                    color: #fff;
                }
            }
        }
        .input_box {
            text-align: center;
            input {
                padding: 0.5rem;
                border-radius: 3px;
                border: none;
                width: calc(100% - 6rem);
                text-align: left;
            }
        }
    }

</style>
