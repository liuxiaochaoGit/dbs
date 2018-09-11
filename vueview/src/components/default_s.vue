<template>
    <div id="default_s">
        <mt-header title="">
            <router-link to="/datumEdit" slot="left" @click.native="">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="edit_form">
            <div class="head_img" @click="changeHead">
                <img :src="portrait" alt="">
                <span class="change_img">更换头像</span>
            </div>
            <div class="user_center">
                <div class="form_contrl">
                    <i class="icon icon-cool login_icon"></i>
                    <input type="text" v-model="nickname" max="20" placeholder="给自己起一个响亮的名字呗">
                </div>
                <div class="form_contrl">
                    <i class="icon icon-themeisle login_icon"></i>
                    <input type="text" v-model="selfsign" max="50" placeholder="不要太懒了，介绍一下自己吧">
                </div>
                <div class="row">
                    <mt-button @click="submit" type="primary" size="large">确定</mt-button>
                </div>
            </div>
        </div>
        <input v-show="false" type="file" id="headFile" @change="toCropper($event)">
    </div>
</template>

<script>
    import tool from '@/assets/javascripts/commonTool'
    import fetchR from '@/assets/javascripts/fetchAsync';

    export default {
        name: "default_s",
        data(){
          return{
              nickname:'',
              selfsign:'',
              portrait:''
          }
        },
        created(){
            tool.initUser(this);
        },
        methods: {
            toCropper(e) {
                // 将本地图片转为base64提供裁剪路径
                let path = e.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(path);
                reader.onload = () => {
                    let res = reader.result;
                    this.$router.push({name:'cropper',params:{filePath:res}});
                    // this.$router.push({path:'/copperImage',params:{filePath:path}});
                }
            },
            changeHead(){
                let headFile = document.getElementById('headFile');
                headFile.click();
            },
            submit(){
                let vm = this;
                let obj = {
                    nickname:vm.nickname,
                    selfsign:vm.selfsign,
                    id:tool.getUser().id
                };
                fetchR.postFatch('/user/changeNick', obj)
                    .then((result) => {
                        if (result.status == '200') {
                            vm.$toast('资料已更新');
                            tool.updateUser('nickname',vm.nickname);
                            tool.updateUser('selfsign',vm.selfsign);
                            vm.$router.push('/datumEdit');
                        }else{
                            vm.$toast('资料更新失败');
                        }
                    }).catch((e) => {
                    vm.$toast('资料更新失败');
                    console.log(e)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/styles/login.scss";
    #default_s{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        .edit_form{
            text-align: center;
            .head_img{
                position: relative;
                width: 8rem;
                height: 8rem;
                margin: 2rem auto;
                img{
                    width: 8rem;
                    height: 8rem;
                }
                span{
                    display: inline-block;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 1.8rem;
                    font-size: 0.6rem;
                    color: #eee;
                    background: rgba(0,0,0,0.1);

                }
            }
            .form_contrl{
                width: 96vw;
                /*border: 1px solid red;*/
                border-bottom: 1px solid #f9f9f9;
                margin: 3px auto;
                padding-bottom: 0.6rem;
                text-align: left;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .icon{
                    font-size: 1.6rem;
                }
                input{
                    width: calc(100% - 2.5rem);
                    color:#888;
                    font-size: 1rem;
                }
                input:focus{
                    outline: none;
                }
                input::-webkit-input-placeholder{
                    color:#ccc;
                }
            }
            .row{
                width: 80vw;
                margin: 6rem auto;
            }
        }
    }
</style>
