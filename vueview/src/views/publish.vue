<template>
    <div id="publish">
        <mt-header title="">
            <router-link to="/list" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right" @click="subNote">发布</mt-button>
        </mt-header>
        <div class="content">
            <div class="co_textarea" id="edc" contenteditable="true" ref="content"
                 @keyup="textKeyup($event)">
                <span contenteditable="false" v-show="text.spanShow" @click="hidePlace">发表帖子</span>
            </div>
            <!--<mt-button type="default"  plain>default</mt-button>-->
            <div class="select_wrap">
                <li class="select_item" @click="showSelect">{{select.type}}</li>
                <ul class="select_box">
                    <li v-for="item,index in gamitList"
                        :style="{'top':topList[index],'background':index == select.id ? '#75d29a' : '#fff'}"
                        :index="index" @click="selectMouseover(index)" class="select_item">{{gamitList[index]}}
                    </li>
                </ul>
            </div>
            <div class="icon_box">
                <i class="icon icon-camera" @click="choiImg"></i>
                <input type="file" v-show="false" @change="uploadImgs($event)" multiple id="choiseImg"
                       accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
            </div>
            <div class="img_show">
                <div v-for="imageSrc,index in image.list">
                    <span v-show="isDel == index" @click="delImage(index)">x</span>
                    <img :src="imageSrc" alt="" @mouseover="isDelShow(index)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import fetchR from '@/assets/javascripts/fetchAsync';
    /*import Aes from '@/assets/javascripts/aesUtil';
    const aes = new Aes();*/
    import tool from '@/assets/javascripts/commonTool';

    export default {
        name: "v-publish",
        data() {
            return {
                topList: ['6px', '5px', '4px', '3px', '2px', '1px', '0px'],
                defaultTop: ['6px', '5px', '4px', '3px', '2px', '1px', '0px'],
                text: {
                    content: '',
                    spanShow: true
                },
                select: {
                    id: 0,
                    type: '选择话题',
                    show: false
                },
                image: {
                    list: []
                },
                isDel: -1
            }
        },
        beforeCreate() {
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
        mounted() {
            let vm = this;
            vm.getFocus();
        },
        computed: {
            gamitList() {
                var list = [];
                list = this.$store.getters.getGamitList;
                console.log(list);
                return list;
            },
        },
        methods: {
            // 自动聚焦
            getFocus() {
                this.$refs.content.focus()
            },
            textKeyup(e) {
                let vm = this;
                if (e.currentTarget.innerText == '') {
                    vm.text.spanShow = true;
                } else {
                    vm.text.spanShow = false;
                }
                vm.text.content = e.currentTarget.innerText;
            },
            hidePlace() {
                let show = this.text.content == '' ? true : false;
                this.text.spanShow = false;
                this.getFocus();
            },
            // 话题选择展开效果
            showSelect() {
                let vm = this;
                let arr = [];
                for (let i = 0; i < 7; i++) {
                    arr.unshift(i * 2 + 'rem');
                }
                if (!vm.select.show) {
                    vm.topList = arr;
                } else {
                    vm.topList = vm.defaultTop;
                }
                vm.select.show = !vm.select.show;
            },
            selectMouseover(index) {
                console.log(index);
                this.select.id = index;
                this.select.type = this.gamitList[index];
                this.topList = this.defaultTop;
                this.select.show = !this.select.show;
            },
            // 选择图片
            choiImg() {
                let choiseImg = document.getElementById('choiseImg');
                choiseImg.click();
            },
            /* 批量上传图片 */
            uploadImgs(e) {
                let files = e.target.files;
                var length = files.length;
                if (files.length > 9) {
                    this.$toast('最多只能上传9张图片');
                    length = 9;
                }
                for (let i = 0; i < length; i++) {
                    this.uploadImg(files[i]);
                }
                document.getElementById('choiseImg').value = '';
            },
            /* 图片上传，并返回路径 */
            uploadImg(files) {
                let vm = this;
                var formdata = new FormData();
                formdata.append('file', files);
                fetchR.uploadFile('/note/uploadImg', formdata, vm)
                    .then((result) => {
                        if (result.status == 200) {
                            vm.image.list.push(result.path);
                        } else {
                            vm.$toast('图片加载失败，请重新选择');
                        }

                    }).catch((e) => {
                    console.log(e);
                    vm.$toast('图片加载失败，请重新选择');
                });

            },
            /* 发布帖子 */
            subNote() {
                let vm = this;
                let author = tool.getUser();
                console.log(author);
                let auth = {
                    id: author.id,
                    nickname: author.nickname,
                    portrait: author.portrait
                };
                let obj = {
                    noteType: vm.select.type == '选择话题' ? '搞笑' : vm.select.type,
                    noteAuthor: auth,
                    noteText: vm.text.content,
                    picture: vm.image.list,
                    fabulous: 0
                };
                fetchR.postFatch('/note/noteInfo', obj, vm)
                    .then((res) => {
                        if (res.status == 200) {
                            vm.$toast('发布成功');
                            vm.$store.commit('setType', obj.noteType);
                            vm.$router.push('/list');
                        } else {
                            vm.$toast('发布失败，请检查网络');
                        }

                    }).catch((e) => {
                    console.error(e);
                    vm.$toast('连接超时，请检查网络');
                });
            },
            /* 删除图片 */
            isDelShow(index) {
                this.isDel = index;
            },
            delImage(index) {
                let url = this.image.list[index];
                this.image.list.splice(index, 1);
                fetchR.getFatch('/note/delImage?imgUrl=' + url, this)
                    .then((result) => {
                        console.log(result);
                    }).catch((err) => {
                    console.log(err);
                });
                //console.log
                //this.image.list = list;
            }
        }
    }
</script>

<style scoped lang="scss">
    @mixin item {
        position: absolute;
        top: 0;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        color: red;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 1px 0px inset #888;
    }

    .co_textarea {
        text-align: left;
        margin: 15px;
        padding: 0.5rem;
        outline: none;
        caret-color: red;
        border: 1px dashed #ccc;
        color: #666;
        border-radius: 3px;
        span {
            display: inline-block;
            color: #ececec;
            width: 100%;
        }
    }

    .select_wrap {
        position: relative;
        width: 44vw;
        border-radius: 5px;
        margin-left: 1rem;
        .select_item {
            @include item;
            z-index: 2;
        }
        .select_box {
            position: absolute;
            width: 100%;
            z-index: 1;
            .select_item {
                @include item;
                transition: all 0.5s;
            }
            .select_item:hover {
                background: #75d29a;
            }
        }
    }

    .icon_box {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        margin-left: 12rem;
        padding: 0.4rem;
        .icon {
            font-size: 1.5rem;
        }
    }

    .img_show {
        padding: 1rem;
        text-align: left;
        div {
            position: relative;
            vertical-align: middle;
            padding: 1px;
            width: 31%;
            /* height: 31vw; */
            display: inline-block;
            margin: 2px;
        }
        span {
            /*display: none;*/
            position: absolute;
            right: 0px;
            top: 2px;
            width: 1rem;
            height: 1rem;
            padding: 1px;
            background: #fff;
            font-size: 1rem;
            color: #888;
            text-align: center;
            line-height: 0.9rem;
            border-radius: 50%;
        }
        img {
            width: calc(33.3vw - 1rem);
        }
    }
</style>
