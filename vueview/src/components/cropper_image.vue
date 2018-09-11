<template>
    <div id="cropper">
        <mt-header title="">
            <router-link to="/default_s" slot="left" @click.native="">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="wrapper">
            <vueCropper
                ref="cropper"
                :img="option.img"
                :autoCrop="option.autoCrop"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :fixedBox="option.fixedBox"
                :canScale="option.canScale"
                :centerBox="option.centerBox"
                :outputType="option.outputType"
            ></vueCropper>
            <div class="control">
                <div id="edrftg" style="width: 30px;height: 30px;"></div>
                <div class="range_box">
                    <span @click="changeScale(-1)">
                        <i class="icon icon-zoom-out"></i>
                    </span>
                    <span @click="changeScale(1)">
                        <i class="icon icon-zoom-in"></i>
                    </span>
                    <span @click="changeRotate('left')">
                        <i class="icon icon-rotate-ccw"></i>
                    </span>
                    <span @click="changeRotate('right')">
                        <i class="icon icon-rotate-cw"></i>
                    </span>
                    <!--range 屏蔽-->
                    <!--<div class="range" v-drag :style="{'left':dragOptin.left}"></div>
                    <div class="role">
                        <div v-for="num,index in roleNum" :class="Math.round(num) === num ? 'divH' : ''"></div>
                    </div>-->
                </div>
                <div class="button_box">
                    <mt-button type="default" size="normal">取消</mt-button>
                    <mt-button type="default" size="normal" @click="cropperFinish">完成</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vueCropper from 'vue-cropper'
    import tool from '@/assets/javascripts/commonTool'
    import fetchR from '@/assets/javascripts/fetchAsync';

    export default {
        name: "cropper",
        components: {
            vueCropper
        },
        data() {
            return {
                option: {
                    img: require('../assets/images/timg.jpeg'),   // 裁剪图片的地址
                    autoCrop: true,                               // 裁剪生成图片的质量
                    autoCropWidth: 166,                           // 默认生成截图框宽度
                    autoCropHeight: 166,                          // 默认生成截图框高度
                    fixedBox: true,                               // 固定截图框大小 不允许改变
                    canScale: true,                               // 图片是否允许滚轮缩放
                    centerBox: false,                             // 截图框是否被限制在图片里面
                    outputType: 'jpeg',                            // 裁剪生成图片的格式
                },
                dragOptin: {
                    left: '5%'
                }
            }
        },
        created() {
            this.option.img = this.$route.params.filePath;
        },
        directives: {
            drag(el) {
                console.log(el);
                let vm = this;
                el.mousedown = (e) => {
                    let disx = e.pageX - el.offsetLeft;
                    document.onmousemove = (e) => {
                        vm.dragOptin.left = disx;
                    }
                }
            }
        },
        computed: {
            roleNum() {
                let numArr = [];
                for (let i = 0; i < 10; i++) {
                    for (let j = 1; j < 11; j++) {
                        let num = j / 10 + i;
                        numArr.push(num);
                    }
                }
                return numArr;
            }
        },
        methods: {
            changeScale(num) {
                this.$refs.cropper.changeScale(num);
            },
            changeRotate(dire) {
                if (dire == 'left') {
                    this.$refs.cropper.rotateLeft();
                } else {
                    this.$refs.cropper.rotateRight();
                }
            },
            cropperFinish() {
                // 获取blog
                /*this.$refs.cropper.getCropBlob((data) => {
                    console.log(data);
                });*/
                // 获取base64
                this.$refs.cropper.getCropData((data) => {
                    let vm = this;
                    let author = tool.getUser();
                    let obj = {
                        id: author.id,
                        portrait:encodeURIComponent(data),
                        oldPortrait:encodeURIComponent(author.portrait)
                    };
                    fetchR.postFatch('/user/changeHead', obj)
                        .then((res) => {
                            console.log(res);
                            if (res.status == 200) {
                                vm.$toast('头像已更换');
                                vm.$refs.cropper.clearCrop();
                                tool.updateUser('portrait',res.msg);
                                // vm.$router.push({name:'default_s',params:{portrait:data}});
                                vm.$router.push('/default_s');
                            } else {
                                vm.$toast('头像更新失败，请重新搞一下');
                            }
                        }).catch((err) => {
                        vm.$toast('头像更新失败，请重新搞一下');
                        console.log(err)
                    });

                    // 展示
                    /*let newImg = document.createElement('img');
                    newImg.src = data;
                    document.getElementById('edrftg').appendChild(newImg);*/
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .mint-header {
        background: rgba(0, 0, 0, 1);
    }

    .wrapper {
        width: 100vw;
        height: calc(100vh - 40px);
        background: #000;
        .vue-cropper {
            background-image: unset;
        }
        .control {
            position: fixed;
            bottom: 1rem;
            width: 100%;
            padding: 1rem;
            box-sizing: border-box;
            background: rgba(0, 0, 0, 0);
            .range_box {
                position: relative;
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-bottom: 1rem;
                span {
                    width: 2rem;
                    height: 2rem;
                    text-align: center;
                    line-height: 2rem;
                    background: #fff;
                    border-radius: 50%;
                    .icon {
                        color: #00B7FF;
                    }
                }
                .range {
                    position: absolute;
                    z-index: 10;
                    width: 0.3rem;
                    height: 1.5rem;
                    background: #fff;
                    border-radius: 6px;
                }
                .role {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 90%;
                    height: 1rem;
                    overflow: hidden;
                    div {
                        width: 1px;
                        height: 6px;
                        background: #fff;
                    }
                    .divH {
                        height: 0.8rem;
                    }
                }
            }

            .button_box {
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
