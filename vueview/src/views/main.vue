<template>
    <div id="main">
        <div class="tab_contant">
            <router-view></router-view>
        </div>
        <mt-tabbar>
            <mt-tab-item id="" :class="isSelect == 0 ? 'is-selected' : ''" @click.native="changeLink(0)">
                <router-link to="/list">
                    <i class="icon icon-mailchimp"></i>
                    <!--帖子-->
                </router-link>
            </mt-tab-item>
            <mt-tab-item id="" :class="isSelect == 1 ? 'is-selected' : ''" @click.native="changeLink(1)">
                <router-link to="/finder">
                    <i class="icon icon-themeisle"></i>
                    <!--发现-->
                </router-link>
            </mt-tab-item>
            <mt-tab-item id="" :class="isSelect == 2 ? 'publish_box is-selected' : 'publish_box'" @click.native="changeLink(2)">
                <router-link class="publish" to="/publish">
                    <i class="icon icon-plus"></i>
                </router-link>
            </mt-tab-item>

            <mt-tab-item id="" :class="isSelect == 3 ? 'is-selected' : ''" @click.native="changeLink(3)">
                <router-link to="/groom">
                    <i class="icon icon-cool"></i>
                    <!--消息-->
                </router-link>
            </mt-tab-item>

            <mt-tab-item id="" :class="isSelect == 4 ? 'is-selected' : ''" @click.native="changeLink(4)">
                <router-link to="/mine">
                    <i class="icon icon-user"></i>
                    <!--我的-->
                </router-link>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    import fetchR from '@/assets/javascripts/fetchAsync'

    export default {
        name: "v-main",
        data() {
            return {
                linkTab: '/list',
                isSelect: 0
            }
        },
        created() {
            let vm = this;
            let urlList = ['/list', '/finder', '/publish', '/groom', '/mine'];
            let path = vm.$route.path;
            urlList.map((item,index) => {
                if(path == item){
                    vm.isSelect = index;
                }
            });
        },
        computed: {
            type() {
                return this.$store.getters.getType;
            }
        },
        methods: {
            selectTab(id) {
                console.log(12344);
            },
            testVuex() {
                this.$store.commit('setType', '美食');
            },
            toList(type) {
                console.log(type);
                this.$store.commit('setType', type);
                // this.$router.push({path: '/list', query: {type: type}});
            },
            submit() {
                var $this = this;
                fetchR.postFatch('/user/testToken', {name: 'test'})
                    .then((result) => {
                        console.log(result);
                        if (result.msg = 'err') {
                            $this.$router.push('/login');
                        }
                    }).catch((e) => {
                    console.log(e)
                })
            },
            changeLink(linkType) {
                var vm = this;
                vm.isSelect = linkType;
            }
        }
    }
</script>

<style scoped lang="scss">
    #main {
        height: 100%;
        ul {
            width: 100%;
            li {
                width: auto;
                p {
                    text-align: left;
                }
            }
        }
        .tab_contant {
            position: absolute;
            width: 100%;
            height: calc(100% - 27px);
        }
        .mint-tabbar {
            z-index: 10;
            .mint-tab-item {
                position: relative;
                padding: 0.84rem;
                .publish {
                    position: absolute;
                    top: 20px;
                    left: 50%;
                    width: 1.6rem;
                    height: 1.6rem;
                    padding: 0.8rem;
                    background: #fff;
                    border-radius: 50%;
                    /*filter: blur(1px);*/
                    box-shadow: 0px 3px 5px #ccc inset;
                    -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    .icon {
                        font-size: 1.6rem;
                    }
                }
                .icon{
                    font-size: 1.5rem;
                }
            }
            .publish_box {
                background: rgba(0, 0, 0, 0) !important;
                .is-selected {
                    background: rgba(0, 0, 0, 0) !important;
                }
            }
        }
    }

</style>
