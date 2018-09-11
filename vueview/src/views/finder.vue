<template>
    <div id="finder">
        <mt-search
            v-model="keyword"
            placeholder="搜索/所有"
            @keyup.enter.native="search"
            @keyup.native="search"
            v-ifFocus
        ></mt-search>
        <div class="type_content">
            <!--<ul class="type_list">  v-if="isSearch"
                <li class="type_item" v-for="item,index in typeList">
                    <p>{{item.name}}</p>
                </li>
            </ul>-->
            <mt-navbar v-model="selected" @click.native="searchType">
                <mt-tab-item id="帖子">帖子</mt-tab-item>
                <mt-tab-item id="用户">用户</mt-tab-item>
            </mt-navbar>
        </div>
        <mt-tab-container class="content" v-if="!isSearch">
            <!--<router-view></router-view>-->
            <child ref="list_load"></child>
        </mt-tab-container>
    </div>
</template>

<script>
    import Child from '@/components/list_load';

    export default {
        name: "v-finder",
        components: {
            child:Child
        },
        data() {
            return {
                keyword: '',
                searchList: [],
                isSearch: true,
                selected: '帖子'
            }
        },
        created() {
            this.$store.commit('setKeyword', '');
        },
        directives: {
            ifFocus(el, pra, vNode) {
                let vm = vNode.context;
                let oInput = el.querySelector('input');
                let cancel = el.querySelector('a');

                // 监听搜索框focus的事件
                oInput.onfocus = (e) => {
                    if (e.target.value == '') {
                        vm.isSearch = true;
                        return;
                    } else {
                        vm.isSearch = false;
                    }
                    // vm.isSearch = false;
                };

                // 监听搜索框blur事件
                oInput.onblur = (e) => {
                    // console.log('blur');
                    // vm.isSearch = true;
                };
                // 监听取消回调
                cancel.onclick = (e) => {
                    vm.isSearch = true;
                }
            }
        },
        methods: {
            search() {
                let vm = this;
                let searchType = vm.selected == '帖子' ? 'note' : 'user';
                if(vm.keyword != ''){
                    vm.isSearch = false;
                    console.log(searchType);
                    console.log(vm.keyword);
                    vm.$store.commit('setKeyword', vm.keyword);
                    vm.$store.commit('setSearchType', searchType);
                    vm.$store.commit('setSelftype', null);
                    vm.$nextTick(() => {
                        console.log(vm.$refs);
                        vm.$refs.list_load.loadTop('search');
                    });
                }
            },
            searchType() {
                console.log(this.selected);
                let vm = this;
                let searchType = vm.selected == '帖子' ? 'note' : 'user';
                vm.$store.commit('setSearchType', searchType);
            }
        }
    }
</script>

<style scoped lang="scss">
    #finder {
        .content {
            top: 80px;
            height: calc(100% - 82px);
        }
        .type_content {
            width: 100vw;
            height: 5vh;
            /*background: #00B7FF;*/
            overflow-x: auto;
            .mint-navbar .mint-tab-item {
                padding: 7px 0;
            }
            .type_list {
                width: 120vw;
                .type_item {
                    float: left;
                    width: 9vh;
                    height: 9vh;
                    background: red;
                    margin: 0.3rem;
                }
            }
        }
    }
</style>
