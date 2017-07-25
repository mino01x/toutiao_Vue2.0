import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)
const state = {
    loading: true,                 // loading图片的切换
    ifReturnMsg: '',               // 是否返回数据
    loadmore: false,
    ifReturnMore: true,
    list: {
        __all__: [],
        news_hot: [],
        news_society: [],
        news_tech: [],
        news_entertainment: [],
        news_car: [],
        news_sports: [],
        news_finance: [],
        news_military: [],
        news_world: [],
        news_fashion: []
    },
    article: {
        title: '',
        detail_source: '',
        content: ''
    },
    session: [],
    loadmoreSession: false,
    ifReturnSession: true,
    collection: []
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
