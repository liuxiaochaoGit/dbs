<template>
    <div id="v-groom">
        <mt-header title="消息"></mt-header>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import fetchR from '@/assets/javascripts/fetchAsync'

    export default {
        name: "v-groom",
        data(){
            return {
                isSelect:0
            }
        },
        beforeCreate(){
            var $this = this;
            fetchR.postFatch('/user/testToken', {name: 'test'})
                .then((result) => {
                    console.log(result);
                    if (result.msg == 'err') {
                        $this.$router.push('/login');
                        $this.$toast('请先登录');
                    }
                }).catch((e) => {
                console.log(e)
            })
        },
        methods:{
            blockedOut(){

            }
        }
    }
</script>

<style scoped lang="scss">
    .mint-navbar{
        .mint-tab-item {
            background: unset;
            color:unset;
            border:none;
            padding: 12px 0;
        }
    }
    .content{
        top: 36px;
        background: #f5f7fa;
    }
</style>
