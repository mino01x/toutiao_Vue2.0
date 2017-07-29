import * as type from './mutations_type.js'

export default {
  [type.GET_NEWSLIST] (state, payload) {
    let type = payload.type
    for (let item of payload.data) {
      state.list[type].push(item)
    }
  },
  [type.GET_ARTICLE] (state, payload) {
    for (let key in payload) {
      state.article[key] = payload[key]
    }
  },
  [type.GET_SESSION] (state, payload) {
    payload.data.forEach(item => {
      state.session.push(item)
    })
  },
  [type.GET_COLLECTION] (state, data) {
    state.collection = data
  },
  [type.SAVE_POSITION] (state, data) {
    state.position[data.type] = data.position
  },
  [type.GET_SEARCH] (state, { data, keyword }) {
    for (let item of data) {
      if (item.title && item.title.includes(keyword)) {
        item.title = item.title.replace(new RegExp(keyword, 'g'), `<b style="color: red">${keyword}</b>`)
      }
      state.search.push(item)
    }
  },
  [type.RETURN_SEARCH] (state, boolean) {
    state.ifReturnSearch = boolean
  },
  [type.IF_LOADING] (state, boolean) {
    state.loading = boolean
  },
  [type.ADD_HISTORY] (state, content) {
    const item = {
      id: state.history.count++,
      content
    }
    state.history.items.unshift(item)
    localStorage.setItem('chan_history', JSON.stringify(state.history))
  },
  [type.REMOVE_HISTORY] (state, id) {
    let index = state.history.items.findIndex(item => {
      return item.id === id
    })
    state.history.items.splice(index, 1)
    localStorage.setItem('chan_history', JSON.stringify(state.history))
  },
  // 清空历史
  [type.CLEAR_HISTORY] (state) {
    state.history.items = []
    localStorage.setItem('chan_history', JSON.stringify(state.history))
  },
  // 是否加载更多搜索
  [type.LOADMORE_SEARCH] (state, boolean) {
    console.log(boolean)
    state.loadmoreSearch = boolean
  },
  // 是否返回更多搜索
  [type.RETURN_MORE_SEATCH] (state, boolean) {
    console.log('ifreturnmoresearch', boolean)
    state.ifReturnMoreSearch = boolean
  },
  [type.ADD_COLLECTION] (state, data) {
    state.localCollection.unshift(data)
    localStorage.setItem('chan_collection', JSON.stringify(state.localCollection))
  },
  [type.REMOVE_COLLECTION] (state, id) {
    const index = state.localCollection.findIndex(item => {
      return item.id === id
    })
    state.localCollection.splice(index, 1)
    localStorage.setItem('chan_collection', JSON.stringify(state.localCollection))
  },
  // 刷新消息
  [type.REFRESH_NEWS] (state, payload) {
    let type = payload.type
    for (let item of payload.data) {
      state.list[type].unshift(item)
    }
  },
  // 刷新消息的数量
  [type.REFRESH_LENGTH] (state, length) {
    state.newsLength = length
    state.ifReturnRefresh = true
  }
}
