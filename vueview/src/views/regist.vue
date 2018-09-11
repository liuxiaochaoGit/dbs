<template>
    <div class="login" id="login">
        <div class="login_box">
            <div class="user_head">
                <i class="icon icon-camera"></i>
            </div>
            <div class="user_center">
                <div class="">
                    <i class="icon icon-user login_icon"></i>
                    <input type="text" v-model="user" placeholder="手机/邮箱/数字">
                </div>
                <div class="">
                    <i class="icon icon-lock-closed login_icon"></i>
                    <input type="password" v-model="pass" placeholder="密码">
                </div>
                <div class="row">
                    <mt-button @click="regist" type="primary" size="large">注册</mt-button>
                    <!--<mt-button @click="toRegest" type="default" size="normal">注册</mt-button>-->
                </div>
            </div>
        </div>
        <div class="foot">
            <a href="javascript:;" @click="toLogin">已经有账号,点我登录</a>
        </div>
    </div>

</template>

<script>
    import fetchR from '@/assets/javascripts/fetchAsync'

    export default {
        name: 'login',
        data() {
            return {
                user: '',
                pass: '',
                subBool: true
            }
        },
        methods: {
            regist() {
                var $this = this;
                $this.valite();
                var obj = {
                    user: $this.user,
                    pass: $this.pass
                };
                if ($this.subBool) {
                    fetchR.postFatch('/user/register', obj)
                        .then((res) => {
                            console.log(res);
                            if (res.status == 200) {
                                $this.$toast(res.msg);
                                // $this.$parent.openPopup(res.msg, 'green');
                                $this.$router.push('/login');
                            } else {
                                $this.$toast(res.msg);
                               // $this.$parent.openPopup(res.msg, 'yellow');
                            }
                        }).catch((err) => {
                        console.log(err)
                    });
                }
            },
            toLogin() {
                this.$router.push('/login');
            },
            valite() {
                let $this = this;
                if ($this.user == '') {
                    $this.$toast('请输入账号');
                    // $this.$parent.openPopup('请输入账号', 'yellow');
                    $this.subBool = false;
                    return;
                }
                if ($this.pass == '') {
                    $this.$toast('请输入密码');
                    // $this.$parent.openPopup('请输入密码', 'yellow');
                    $this.subBool = false;
                    return;
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '@/assets/styles/login.scss';
</style>
