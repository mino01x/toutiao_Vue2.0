import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Collect from '../pages/Collect'
import Session from '../pages/Session'
import About from '../pages/About'
import Content from '../pages/Content.vue'

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

// 保存滚动条原来的位置
router.beforeEach((to, from, next) => {
  from.meta.savedPosition = document.body.scrollTop || document.documentElement.scrollTop
  next()
})
router.afterEach((to, from) => {
  let flag = to.path.includes('content') || from.path.includes('content')
  let time = flag ? 0 : 80
  scroll(to, from, time)
})
function scroll (to, from, time) {
  if (to.meta.savedPosition) {
    if (to.path.includes('content')) to.meta.savedPosition = 0
    setTimeout(() => {
      window.scrollTo(0, to.meta.savedPosition)
    }, time)
  } else {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, time)
  }
}

/* 通过scrollBehavior记忆滚动条

const scrollBehavior = (to, from, savedPosition) => {
  from.meta.savedPosition = document.body.scrollTop || document.documentElement.scrollTop
  console.log(to.meta, from.meta, to.meta === from.meta)
  if (savedPosition) {
    return savedPosition
  } else if (to.meta.savedPosition) {
    const y = to.meta.savedPosition
    const position = {
      x: 0,
      y
    }
    setTimeout(() => {
      window.scrollTo(0, y)
    }, 50)
    return position
  } else {
    return {x: 0, y: 0}
  }
}

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior
})
*/
export default router
