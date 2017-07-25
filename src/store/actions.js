import * as type from './mutations_type.js'
import jsonp from 'jsonp'
// import axios from 'axios'

export default {
  getNews ({ commit, state }, payload) {
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
        content: data.content
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
  }
  // getSearch ({commit}, payload) {
  //   console.log('getSearch start')
  //   jsonp('https://m.toutiao.com/baidu_top_words/?csrfmiddlewaretoken=undefined',
  //   {timeout: 3000},
  //   function (err, res) {
  //     console.log('callback')
  //     if (err) {
  //       return false
  //     }
  //     console.log(res)
  //   })
  // }
}
