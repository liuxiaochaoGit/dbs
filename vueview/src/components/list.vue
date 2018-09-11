<template>
    <div id="list">
        <mt-navbar>
            <mt-tab-item v-for="item,index in gamitList" :class="index == isActive ? 'tab_active' : 'tab_item'" :key="index"   @click.native="toList(item.name,index)">{{item.name}}</mt-tab-item>
        </mt-navbar>
        <mt-tab-container class="content">
            <router-view></router-view>
        </mt-tab-container>
    </div>
</template>

<script>
    import fetchR from '@/assets/javascripts/fetchAsync'

    export default {
        name: "v-list",
        data() {
            return {
                isActive:0
            }
        },
        created(){
            this.$store.commit('setKeyword', null);
            this.$store.commit('setSelftype', null);
        },
        mounted(){
            let type = this.type;
            let vm = this;
            this.gamitList.map((item,index) => {
                if(item.name == type){
                    vm.isActive = index;
                }
            });
        },
        computed: {
            type() {
                return this.$store.getters.getType;
            },
            gamitList() {
                var list = this.$store.getters.getGamitList;
                var listArr = [];
                list.map((item,index) => {
                    let obj = {
                        name:item,
                    };
                    listArr.push(obj);
                });

                return listArr;
            },
        },
        methods: {
            selectTab(id){
                console.log(12344);
            },
            testVuex() {
                this.$store.commit('setType','美食');
            },
            toList(type,index) {
                let vm = this;
                vm.$store.commit('setType',type);
                vm.isActive = index;
            },
            submit() {
                var $this = this;
                fetchR.postFatch('user/testToken', {name: 'test'})
                    .then((result) => {
                        if (result.msg = 'err') {
                            $this.$router.push('/login');
                        }
                    }).catch((e) => {
                    console.log(e)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    #list{
        width: 100%;
        z-index: 1;
        .tab_item{
            color:#666;
        }
    }
</style>
