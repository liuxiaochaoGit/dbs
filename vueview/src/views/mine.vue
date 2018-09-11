<template>
    <div id="v-mine">
        <div class="account_box">
            <div class="account" @click="toDatum">
                <div class="head_img left">
                    <img :src="portrait" alt="">
                </div>
                <div class="acc_sh">
                    <span>{{nickname}}</span>
                    <span>{{selfsign}}</span>
                </div>
                <i class="mint-cell-allow-right"></i>
            </div>
            <div class="note">
                <div class="note_item">
                    <span class="note_num">{{fans}}</span>
                    <span>粉丝</span>
                </div>
                <div class="note_item">
                    <span class="note_num">{{followAuthors}}</span>
                    <span>关注</span>
                </div>
                <div class="note_item">
                    <span class="note_num">{{storeAtricles}}</span>
                    <span>收藏</span>
                </div>
            </div>
        </div>
        <div class="page_part">
            <mt-cell title="帮助与反馈" to="" is-link class="cell_init">
                <img slot="icon" src="../assets/images/touxiang.png" width="24" height="24">
            </mt-cell>
        </div>
        <div class="page_part">
            <mt-cell title="我的发帖" to="" is-link class="cell_init">
                <img slot="icon" src="../assets/images/touxiang.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="我的关注" to="" is-link class="cell_init">
                <img slot="icon" src="../assets/images/touxiang.png" width="24" height="24">
            </mt-cell>
            <mt-cell title="我的收藏" to="" is-link class="cell_init">
                <img slot="icon" src="../assets/images/touxiang.png" width="24" height="24">
            </mt-cell>
        </div>
        <div class="page_part">
            <mt-cell title="设置" to="" is-link class="cell_init">
                <img slot="icon" src="../assets/images/touxiang.png" width="24" height="24">
            </mt-cell>
        </div>
        <div class="page_part button_part">
            <mt-button type="danger" size="large" @click.native="layout">切换账号</mt-button>
        </div>
    </div>
</template>

<script>
    import tool from '@/assets/javascripts/commonTool'

    export default {
        name: "v-mine",
        data() {
            return {
                nickname: '',
                portrait: require('../assets/images/timg.jpeg'),
                selfsign: '这个人太懒了...'

            }
        },
        created() {
            tool.initUser(this);
        },
        methods: {
            layout() {
                this.$router.push('/login');
                localStorage.removeItem('token');
            },
            toDatum() {
                this.$router.push('/datumEdit');
            }
        }
    }
</script>

<style scoped lang="scss">
    #v-mine {
        width: 100vw;
        height: 100vh;
        background: #f5f7fa;
    }

    .account_box {
        width: 100vw;
        height: 20vh;
        background: #fff;
        .account {
            position: relative;
            width: 100%;
            height: 62%;
            padding: 0.8rem;
            text-align: left;
            box-sizing: border-box;
            div {
                display: inline-block;
                vertical-align: middle;
            }
            .head_img {
                width: 3.3rem;
                height: 3.3rem;
                img {
                    width: 3.3rem;
                    height: 3.3rem;
                }
            }
            .acc_sh {
                width: auto;
                span {
                    display: block;
                    text-align: left;
                    font-size: 1rem;
                    color:#333;
                }
                span:last-child{
                    font-size: 0.8rem;
                    color:#ccc;
                }

            }
        }
        .note {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .note_item {
                width: 33vw;
                span {
                    display: block;
                    color: #ccc;
                    font-size: 0.6rem;
                }
                .note_num {
                    color: #333;
                    font-size: 1rem;
                }
            }
        }
    }

    .page_part {
        background: #fff;
        margin-top: 1rem;
        .mint-cell .mint-cell-title {
            margin-left: 0;
        }
        .cell_init {
            border-radius: 0;
            border-bottom: 1px solid #f5f7fa;
        }
        .mint-cell {
            margin-left: -2.5rem;
        }
        .mint-cell:last-child {
            background: unset;
        }
    }

    .button_part {
        width: 66vw;
        display: inline-block;
        /*position: absolute;
        width: 66vw;
        left: 50%;
        transform: translateX(-50%);
        bottom: 2rem;*/
    }


</style>
