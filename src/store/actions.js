import * as type from './mutations_type.js'
import jsonp from 'jsonp'
// import axios from 'axios'

export default {
  getNews ({ commit, state }, payload) {
    console.log('getnews')
    state.loading = true
    state.ifReturnMore = true
    if (payload.type) {
      jsonp('http://m.toutiao.com/list/?tag=' + payload.type + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt(new Date().getTime() / 1000),
        { timeout: 3000 },
        function (err, res) {
          state.loading = false
          if (err || res.data.length === 0) {
            state.ifReturnMsg = false
            return false
          }
          state.ifReturnMsg = true
          commit(type.GET_NEWSLIST, {
            type: payload.type,
            data: res.data
          })
        })
    }
  },
  getArticle ({commit, state}, payload) {
    state.loading = true
    jsonp('http://m.toutiao.com/i' + payload.id + '/info/', { timeout: 3000 }, function (err, res) {
      state.loading = false
      if (err) {
        console.log(err)
        state.ifReturnMsg = false
        return false
      }
      let data = res.data
      state.ifReturnMsg = true
      commit(type.GET_ARTICLE, {
        title: data.title,
        detail_source: data.detail_source,
        content: data.content,
        src: data.media_user ? data.media_user.avatar_url : 'https://raw.githubusercontent.com/Huahua-Chen/images/master/images_inBlog/logo.jpg'
      })
    })
  },
  getMoreNews ({commit, state}, payload) {
    state.loadmore = true
    jsonp('http://m.toutiao.com/list/?tag=' + payload.type + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt(new Date().getTime() / 1000),
      { timeout: 3000 }, function (err, res) {
        state.loadmore = false
        if (err) {
          console.log(err)
          state.ifReturnMore = false
          return false
        }
        state.ifReturnMore = true
        commit(type.GET_NEWSLIST, {
          type: payload.type,
          data: res.data
        })
      })
  },
  getSession ({commit, state}, payload) {
    state.loadmoreSession = true
    jsonp('https://www.toutiao.com/api/article/feed/?category=essay_joke&utm_source=toutiao&widen=1&max_behot_time=1500114422&max_behot_time_tmp=1500114422&tadrequire=true&as=A1F52966E9EEF00&cp=59692E6FD0E09E1',
      { timeout: 3000 },
      function (err, res) {
        state.loadmoreSession = false
        if (err) {
          console.log(err)
          state.ifReturnSession = false
          return false
        }
        state.ifReturnSession = true
        commit(type.GET_SESSION, {
          data: res.data
        })
      })
  },
  getSearch ({commit}, { offset, keyword }) {
    console.log('getSearch start')
    commit('IF_LOADING', true)
    commit('RETURN_SEARCH', false)
    jsonp('https://www.toutiao.com/search_content/?offset=' + offset + '&format=json&keyword=' + keyword + '&autoload=true&count=20&cur_tab=1',
      { timeout: 3000 },
      function (err, res) {
        commit('IF_LOADING', false)
        if (err) {
          console.log(err)
          return false
        }
        commit('RETURN_SEARCH', true)
        commit('GET_SEARCH', {
          data: res.data,
          keyword
        })
      })
  },
  getMoreSearch ({ commit }, { offset, keyword }) {
    console.log('getmoresearch actions.js')
    console.log(offset, keyword)
    commit('LOADMORE_SEARCH', true)
    jsonp('https://www.toutiao.com/search_content/?offset=' + offset + '&format=json&keyword=' + keyword + '&autoload=true&count=20&cur_tab=1',
      { timeout: 3000 },
      function (err, res) {
        commit('LOADMORE_SEARCH', false)
        if (err) {
          console.log(err)
          commit('RETURN_MORE_SEATCH', false)
          return false
        }
        commit('GET_SEARCH', {
          data: res.data,
          keyword
        })
      })
  },
  // 刷新新闻
  refreshNews ({ commit, state }, payload) {
    console.log('refresh')
    state.ifReturnRefresh = false
    if (payload.type) {
      jsonp('http://m.toutiao.com/list/?tag=' + payload.type + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt(new Date().getTime() / 1000),
        { timeout: 3000 },
        function (err, res) {
          if (err || res.data.length === 0) {
            console.log(err)
            return false
          }
          commit(type.REFRESH_LENGTH, res.return_count)
          commit(type.REFRESH_NEWS, {
            type: payload.type,
            data: res.data
          })
        })
    }
  }
}
