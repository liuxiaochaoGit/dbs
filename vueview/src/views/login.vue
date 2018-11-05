<template>
    <div class="login" id="login">
        <div class="login_box">
            <div class="user_head">
                <i class="icon icon-camera"></i>
            </div>
            <div class="user_center">
                <div class="form_contrl">
                    <i class="icon icon-user login_icon"></i>
                    <input type="text" v-model="user">
                </div>
                <div class="form_contrl">
                    <i class="icon icon-lock-closed login_icon"></i>
                    <input type="password" v-model="pass">
                </div>
                <div class="row">
                    <mt-button @click="submit" type="primary" size="large">登录</mt-button>
                    <a href="javascript:;">忘记密码？(建设中...)</a>
                </div>
            </div>
        </div>
        <div class="foot">
            <a href="javascript:;" @click="toRegest">还没有账号?点我注册</a>
            <!--<a href="javascript:;" @click="test">测试提示框</a>-->
        </div>
    </div>
</template>

<script>
    import fetchR from '@/assets/javascripts/fetchAsync';
    import Aes from '@/assets/javascripts/aesUtil';
    const aes = new Aes();

    export default {
        name: 'login',
        data() {
            return {
                user: 'admin',
                pass: 'admin123',
                subBool: true
            }
        },
        methods: {
            submit() {
                var $this = this;
                $this.valite();
                var obj = {
                    user: $this.user,
                    pass: $this.pass
                };
                if ($this.subBool) {
                    fetchR.postFatch('/user/login', obj, $this)
                        .then((res) => {
                            console.log(res);
                            if (res.status == 200) {
                                let author = JSON.stringify(res.auth);
                                window.localStorage.setItem('token', res.token);
                                window.localStorage.setItem('u', aes.encrypt(author));
                                $this.axios.defaults.headers['token'] = res.token;
                                $this.$router.push('/');
                            } else {
                                // $this.$toast(res.msg);
                                // $this.$parent.openPopup(res.msg, 'yellow');
                            }
                        }).catch((err) => {
                        console.log(err)
                    });
                }
            },
            toRegest() {
                this.$router.push('/regist');
            },
            testPopup() {
                // this.$parent.openPopup('hello popup!', 'green');
                this.$toast('1234');
            },
            valite() {
                let $this = this;
                if ($this.user == '') {
                    $this.$toast('请输入账号');
                    // $this.$parent.openPopup('请输入账号', 'yellow');
                    $this.subBool = false;
                }
                if ($this.pass == '') {
                    $this.$toast('请输入密码');
                    // $this.$parent.openPopup('请输入密码', 'yellow');
                    $this.subBool = false;
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "@/assets/styles/login.scss";
</style>
