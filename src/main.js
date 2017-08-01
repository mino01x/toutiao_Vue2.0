// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import VueLazyload from 'vue-lazyload'

Vue.use(iView)
Vue.use(VueLazyload, {
  loading: './static/imgloading.jpg',
  error: './static/imgerror.jpg',
  preLoad: 1,
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
  store
})
