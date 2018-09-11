<template>
    <div id="datumEdit">
        <mt-header title="">
            <router-link to="/mine" slot="left" @click.native="">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="account_box">
            <div class="account">
                <div>
                    <div class="head_img left">
                        <img :src="portrait" alt="">
                    </div>
                    <div class="left">
                        <span>{{nickname}}</span>
                        <span>{{selfsign}}</span>
                    </div>
                </div>
                <div class="right">
                    <mt-button v-if="isSelf" @click="toCopperImage">编辑资料</mt-button>
                    <mt-button v-if="!isSelf" @click="addFollow">关注</mt-button>
                </div>
            </div>
            <div class="note">
                <div class="note_item">
                    <span>{{fans}}</span>
                    <span>粉丝</span>
                </div>
                <div class="note_item">
                    <span>{{followAuthors}}</span>
                    <span>关注</span>
                </div>
                <div class="note_item">
                    <span>{{storeAtricles}}</span>
                    <span>收藏</span>
                </div>
            </div>
        </div>
        <mt-navbar v-model="selected" @click.native="showList" class="type_tab">
            <mt-tab-item id="帖子">帖子</mt-tab-item>
            <mt-tab-item id="关注">关注</mt-tab-item>
            <mt-tab-item id="收藏">收藏</mt-tab-item>
        </mt-navbar>
        <mt-tab-container class="content">
            <!--<router-view></router-view>-->
            <child ref="list_load"></child>
        </mt-tab-container>
    </div>
</template>

<script>
    import Child from '@/components/list_load'
    import tool from '@/assets/javascripts/commonTool'
    import fetchR from '@/assets/javascripts/fetchAsync'

    export default {
        name: "datumEdit",
        components: {
            child: Child
        },
        data() {
            return {
                selected: '帖子',
                isSelf: true
            }
        },
        created() {
            this.showList('create');
            // 展示个人信息
            console.log(this.$route.params.type);
            if (this.$route.params.type == 'other') {
                let auth = this.$route.params.auth;
                this.nickname = auth.nickname;
                this.portrait = auth.portrait;
                this.selfsign = auth.selfsign;
                this.otherId = auth.id;
                this.storeAtricles = auth.storeAtricles;
                this.followAuthors = auth.followAuthors;
                this.fans = auth.fans ? auth.fans : 0;
                this.isSelf = false;
            } else {
                tool.initUser(this);
                this.isSelf = true;
            }

        },
        methods: {
            layout() {
                this.$router.push('/');
                localStorage.removeItem('token');
            },
            toCopperImage() {
                // this.$router.push('/copperImage');
                this.$router.push('/default_s');
            },
            showList(cre) {
                let vm = this;
                // setSelftype
                vm.$store.commit('setSelftype', vm.selected);
                vm.$store.commit('setKeyword', null);
                if(!cre || cre !== 'create'){
                    vm.$nextTick(() => {
                        vm.$refs.list_load.loadTop();
                    });
                }
            },
            // 加关注
            addFollow() {
                let vm = this;
                let url = '/user/addFollow';
                let obj = {
                    id: tool.getUser().id,
                    followId: vm.otherId
                };
                fetchR.postFatch(url, obj)
                    .then((res) => {
                        if (res.status == 200) {
                            vm.$toast('关注成功');
                        }
                    }).catch((e) => {
                    console.log(e);
                    vm.$toast('连接超时，请检查网络');
                });
            }

        }
    }
</script>

<style scoped lang="scss">
    #datumEdit {
        .account_box {
            width: 100vw;
            height: 20vh;
            /*border-bottom: 1px dashed red;*/
            .account {
                position: relative;
                width: 100%;
                height: 82%;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                div {
                    display: inline-block;
                    vertical-align: middle;
                }
                .head_img {
                    width: 5rem;
                    height: 5rem;
                    img {
                        width: 5rem;
                        height: 5rem;
                    }
                }
                .left {
                    span {
                        display: block;
                        font-size: 1.2rem;
                        color: #333;
                        width: 38vw;
                        text-align: left;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    span:last-child {
                        font-size: 0.8rem;
                        color: #ccc;
                    }

                }
                .mint-button {
                    height: unset;
                    font-size: 1rem;
                    padding: 0.6rem 1rem;
                    color: #333;
                    background: #f5f7fa;
                }
            }
            .note {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .note_item {
                    padding: 0 1rem;
                    span {
                        font-size: 0.6rem;
                    }
                    span:last-child {
                        color: #ccc;
                    }
                }
            }
        }
        .type_tab {
            /*width: 62vw;*/
            width: 100vw;
            height: 5vh;
            box-sizing: border-box;
            /*margin: auto;*/
        }
        .content {
            top: 33vh;
            height: 67vh;
        }
        .mint-navbar .mint-tab-item {
            padding: unset !important;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }
</style>
