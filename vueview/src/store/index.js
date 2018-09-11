import Vue from 'vue'
import vuex from 'vuex'

import state from './state.js';
import * as getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';
//引入某个store对象
import ceshi from './modules/ceshi';

Vue.use(vuex);

export default new vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        ceshi
    },
})
