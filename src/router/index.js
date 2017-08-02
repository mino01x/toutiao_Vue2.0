import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Collect from '../pages/Collect'
import Session from '../pages/Session'
import About from '../pages/About'
import Content from '../pages/Content.vue'
import * as type from '../store/mutations_type.js'
import store from '../store/index.js'

Vue.use(Router)

const routes = [
  {
    path: '/home/:type',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/collect',
    name: 'collect',
    component: Collect
  },
  {
    path: '/session',
    name: 'session',
    component: Session
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/content/:id',
    name: 'content',
    component: Content
  },
  {
    path: '*',
    redirect: '/home/__all__'
  }
]

const router = new Router({
  routes
})

// 滚动条控制的部分
router.afterEach((to, from) => {
  store.commit(type.SAVE_POSITION, {
    name: from.path,
    position: document.body.scrollTop || document.documentElement.scrollTop
  })
  if (store.state.positions[to.path]) {
    setTimeout(() => {
      window.scrollTo(0, store.state.positions[to.path])
    }, 80)
  } else {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 80)
  }
})
export default router
