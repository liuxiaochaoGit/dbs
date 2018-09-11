<template>
    <div id="chatlist">
        <mt-cell v-for="item,index in list" :title="item.name" :label="item.sex" @click.native="toChat(item)" class="chart_item">
            <div>
                <img slot="icon" src="../assets/images/touxiang.png" width="24" height="24">
            </div>
        </mt-cell>
    </div>
</template>

<script>
    export default {
        name: "v-chatlist",
        data() {
            return {
                list: [
                    {
                        name: '图灵机器人',
                        sex: '男'
                    }
                ],
                defaultList: [
                    {
                        name: '图灵机器人',
                        sex: '男'
                    }
                ]
            }
        },
        created() {
            this.axios.post('note/getList')
                .then((res) => {
                    console.log(res);
                }).catch((err) => {
                console.log(err);
            });
        },
        methods: {
            toChat(param) {
                console.log(1234);
                // this.$emit('toChat');
                // this.$parent.toChat();
                // setChatUser
                this.$store.commit('setChatUser', param);
                this.$router.push('/chat');
            }
        }
    }
</script>

<style scoped lang="scss">
    .mint-cell .mint-cell-title {
        margin-left: 2.5rem;
    }
</style>
