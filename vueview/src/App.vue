<template>
    <div id="app">
        <!--<mu-dialog transition="slide-top" :overlay="false" :dialog-class="popup.class" :open="topPopup" >
            {{popup.popupMsg}}
        </mu-dialog>-->
        <mt-popup
            v-model="topPopup"
            position="top"
            pop-transition="popup-fade"
            :modal="popup.modal"
            :class="popup.class">
            {{popup.popupMsg}}
        </mt-popup>
        <router-view></router-view>
        <!--<button label="上面弹出" @click="openPopup"/>-->
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                topPopup: false,
                popup: {
                    class: 'mu-dialog-wrapper',
                    popupMsg: '',
                    modal:false
                }
            }
        },
        watch: {
            topPopup(val) {
                if (val) {
                    setTimeout(() => {
                        this.topPopup = false
                    }, 2000)
                }
            }
        },
        methods: {
            openPopup(msg, color) {
                console.log(msg);
                this.popup.popupMsg = msg;
                this.topPopup = true;
                this.popup.class = 'mu-dialog-wrapper popup_' + color;
            }
        }
    }
</script>

<style lang="scss">
    body{
        overflow: hidden;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .mu-dialog-wrapper{
        .mu-dialog{
            width: 100%;
            max-width: 100%;
            height: 100%;
            background: unset;
            text-align: center;
            .mu-dialog-body{
                padding: 0;
                text-align: center;
                color:#fff;
            }
        }
    }

</style>
