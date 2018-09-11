// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'

// import axios from 'axios'
import 'mint-ui/lib/style.css'
import '@/assets/font/style.css'
import '@/assets/styles/pulic.css'
import '@/assets/styles/my-mint.scss'
import '@/assets/styles/theme.scss'
// vue-socket.io
import VueSocket from 'vue-socket.io'
//
import conf from '@/assets/pubConf'
Vue.use(VueSocket, conf.socketPath);
// vue-cropper
// import VueCropper from 'vue-cropper'


// 图片预览
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

// vuex
import store from './store'
// axios config
import axios from './assets/javascripts/axiosConf'

Vue.prototype.axios = axios;

// ui
Vue.use(MintUI);
// img preview
Vue.use(preview);
// Vue.use(VueCropper);

Vue.config.productionTip = false;


/* eslint-disable no-new */
export default new Vue({
    el: '#app',
    beforeCreate() {
        document.documentElement.style.fontSize = 16 / 375 * document.documentElement.clientWidth + 'px';
        window.addEventListener('resize', function () {
            document.documentElement.style.fontSize = 16 / 375 * document.documentElement.clientWidth + 'px';
        }, false)
    },
    router,
    store,
    components: {App},
    template: '<App/>'
})
