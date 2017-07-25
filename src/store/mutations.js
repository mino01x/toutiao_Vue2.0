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
  }
}
