<template>
    <mt-loadmore :top-method="loadTop" :topDistance="topDistance" ref="loadmore">
        <ul>
            <!--v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"-->
            <!--<div v-if="isData">暂无数据</div>-->
            <li v-for="(item,index) in list" :key="index">
                <div class="top" @click="toAuthor(item)">
                    <div>
                        <img :src="item.noteAuthor.portrait" class="" alt="">
                    </div>
                    <span>{{item.noteAuthor.nickname}}</span>
                </div>
                <div class="con" @click="toAticle()">
                    <p>{{item.noteText}}</p>
                    <img v-for="srcItem in item.picture" :key="srcItem" :preview="index" :preview-text="item.noteText" :src="srcItem" alt="">
                </div>
                <div class="bot">
                    <div title="ding" @click="fabulous(item._id)">
                        <i class="icon icon-heart2"></i>
                    </div>
                    <div title="bian">
                        <i class="icon icon-heart"></i>
                    </div>
                    <div title="shou">
                        <i class="icon icon-heart"></i>
                    </div>
                </div>
            </li>
        </ul>
    </mt-loadmore>
</template>
<script>
    import fetchR from '@/assets/javascripts/fetchAsync';
    import tool from '@/assets/javascripts/commonTool';

    export default {
        name: 'list_load',
        data() {
            return {
                list: [],
                page: 0,
                maxDistance: 100,
                topDistance:30,
                isData: false,
                nT: '',
                privewList:[]
            };
        },
        created(){
            // this.loadTop();
        },
        computed: {
            // 话题
            type() {
                return this.$store.getters.getType;
            },
            // 搜索内容
            keyword() {
                return this.$store.getters.getKeyword;
            },
            // 搜索类型 用户/帖子
            searchType() {
                return this.$store.getters.getSearchType;
            },
            // 个人主页帖子展示
            selfType(){
                console.log(this.$store.getters.getSelftype);
                return this.$store.getters.getSelftype;
            }
        },
        mounted() {
            this.loadTop();
        },
        watch: {
            type() {
                if (this.nT != this.type) {
                    this.list = [];
                    this.page = 0;
                    this.loadTop();
                }
            }
        },
        methods: {
            searchKey() {
                console.log(this.keyword);
                console.log('this is parents`s click!')
            },
            // 无限滚动(建设中...)
            loadMore() {
                var vm = this;
                // 是否搜索
                if (vm.keyword != null) {
                    vm.searchList();
                } else {
                    vm.getList();
                }
            },
            // 下拉加载
            loadTop(sFlag) {
                var vm = this;
                if (vm.keyword != null) {
                    let page = sFlag ? 0 : vm.page;
                    vm.searchList(page);
                }if (vm.selfType){
                    vm.getSelf(vm.selfType);
                } else {
                    vm.getList();
                }
                vm.hasData();
                vm.$refs.loadmore.onTopLoaded();
            },
            hasData() {
                if (this.list == 0) {
                    this.isData = true;
                } else {
                    this.isData = false;
                }
            },
            // 帖子主页
            getList() {
                let vm = this;
                var obj = {
                    page: vm.page,
                    noteType: vm.type
                };
                vm.nT = vm.type;
                fetchR.postFatch('/note/getList', obj, vm)
                    .then((result) => {
                        if (result.status == 200 && result.data.length > 0) {
                            for (let i = 0; i < result.data.length; i++) {
                                vm.list.unshift(result.data[i]);
                            }
                            vm.page += 1;
                            this.$previewRefresh();
                        } else {
                            let msg = result.msg ? result.msg : '暂无数据';
                            vm.$toast(msg);
                        }
                    }).catch((e) => {
                    console.log(e);
                    vm.$toast('连接超时，请检查网络');
                });
            },
            // 发现 搜索
            searchList(page) {
                let vm = this;
                if (vm.searchType == 'user') {
                    var url = '/user/search?keyword=' + vm.keyword + '&page=' + page;
                } else {
                    var url = '/note/search?keyword=' + vm.keyword + '&page=' + page;
                }
                fetchR.getFatch(url, vm)
                    .then((res) => {
                        if (res.status == 200 && res.data.length > 0) {
                            vm.list = res.data;
                            vm.page += 1;
                        } else {
                            vm.list = [];
                            vm.$toast('暂无数据');
                        }
                    }).catch((err) => {
                    console.log(err);
                    vm.$toast('连接超时，请检查网络');
                })
            },
            // 个人主页 查看个人发贴/点赞/收藏
            getSelf(type){
                let vm = this;
                vm.list = [];
                var url = '';
                if(type == '收藏'){
                    url = '/note/getNoteByStore';
                }else if(type == '关注'){
                    url = '/note/getNoteByFollow';
                }else{
                    url = '/note/getNoteByUser';
                }
                let obj = {
                    id:tool.getUser().id
                };
                fetchR.postFatch(url, obj)
                    .then((result) => {
                        console.log(result);
                        if (result.status == 200 && result.data.length > 0) {
                            for (let i = 0; i < result.data.length; i++) {
                                vm.list.unshift(result.data[i]);
                            }
                            vm.page += 1;
                            this.$previewRefresh();
                        } else {
                            let msg = result.msg ? result.msg : '暂无数据';
                            vm.$toast(msg);
                        }
                    }).catch((e) => {
                    console.log(e);
                    vm.$toast('连接超时，请检查网络');
                });
            },
            getNoteByUser(){
                let url = '/note/getNoteByUser';
            },
            // 点赞收藏
            fabulous(id){
                let vm = this;
                let userId = tool.getUser().id;
                let url = '/note/fabulous?userId=' + userId + '&noteId=' + id;
                fetchR.getFatch(url, vm)
                    .then((res) => {
                        if(res.status == 100){
                            vm.list.map((item) => {
                                item.fabulous = res.msg;
                            });
                        }
                    }).catch((err) => {
                    console.log(err);
                    vm.$toast('连接超时，请检查网络');
                })
            },
            // 查看作者
            toAuthor(auth){
                console.log(auth);
                this.$router.push({name:'datumEdit',params:{type:'other',auth:auth.noteAuthor}});
            }
        },
    };
</script>
<style scoped lang="scss">
    .mint-loadmore {
        position: relative;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: #f5f7fa;
        z-index: 2;
        ul {
            li {
                width: auto;
                height: auto;
                min-height: 6rem;
                margin-top: 0.6rem;
                /*border-bottom: 1px solid #ddd;*/
                border-radius: 0.6rem;
                padding: 0.3rem 1rem;
                box-shadow: 0.1rem 0.1rem 0.6rem #ccc;
                background: #fff;
                .top{
                    div,span{
                        display: inline-block;
                        vertical-align: middle;
                    }
                    div{
                        width: 2rem;
                        height: 2rem;
                        border-radius: 50%;
                        overflow: hidden;
                        border: 1px solid #ccc;
                        background: #eee;
                        img{
                            width: 2rem;
                            height: 2rem;
                        }
                    }

                }
                .con{
                    img{
                        width: 32%;
                        margin-right: 2px;
                        margin-top: 3px;
                        vertical-align: middle;
                    }
                }
                & > div {
                    /*border-bottom: 1px solid #eee;*/
                    padding: 0.1rem 0.3rem;
                    text-align: left;

                }
                .bot {
                    background: #fefefe;
                    text-align: right;
                    & > div {
                        width: 1rem;
                        height: 1rem;
                        border-radius: 50%;
                        padding: 0.2rem;
                        border: 1px solid #fff;
                        display: inline-block;
                        vertical-align: middle;
                        background: #fff;
                        i {
                            color: #ccc;
                        }
                    }
                }
            }
        }
    }
</style>
