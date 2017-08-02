import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)
const state = {
    loading: false,                 // loading图片的切换
    ifReturnMsg: '',               // 是否返回数据
    loadmore: false,               // 是否加载更多新闻
    ifReturnMore: true,            // 是否返回更多新闻
    list: {                        // 新闻
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
    article: {                      // 文章
        title: '',
        detail_source: '',
        content: ''
    },
    session: [],                    // 段子
    loadmoreSession: false,         // 是否加载更多段子
    ifReturnSession: true,          // 是否有段子返回
    collection: [],                 // 收藏
    search: [],                     // 搜索
    loadmoreSearch: false,          // 加载更多搜索
    ifReturnMoreSearch: true,       // 是否返回更多搜索
    ifReturnSearch: true,           // 是否返回搜索
    history: localStorage.getItem('chan_history')
                ? JSON.parse(localStorage.getItem('chan_history'))
                : { count: 0, items: [] },
    localCollection: localStorage.getItem('chan_collection')
                ? JSON.parse(localStorage.getItem('chan_collection'))
                : [],
    newsLength: 0,                  // 刷新返回的新闻数量
    ifReturnRefresh: false,         // 是否刷新成功
    type: '',                       // 记录从主页离开时的新闻类型
    positions: {}
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
