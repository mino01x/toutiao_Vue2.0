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

/*
const router = new Router({
  routes
})

// 保存滚动条原来的位置
router.beforeEach((to, from, next) => {
  from.meta.savedPosition = document.body.scrollTop || document.documentElement.scrollTop
  next()
})
router.afterEach((to, from) => {
  // if (to.meta.savedPosition) {
  //   if (to.path.includes('content')) to.meta.savedPosition = 0
  //   console.log('has to.savedPosition after 2', to.meta.savedPosition)
  //   setTimeout(() => {
  //     window.scrollTo(0, to.meta.savedPosition)
  //   }, 900)
  // } else {
  //   setTimeout(() => {
  //     window.scrollTo(0, 0)
  //   }, 900)
  // }
  console.log(from.meta.savedPosition, to.meta.savedPosition)
  let flag = to.path.includes('content') || from.path.includes('content')
  let time = flag ? 900 : 100
  document.addEventListener('transitionend', scroll(to, from, time))
})

function scroll (to, from, time) {
  if (to.meta.savedPosition) {
    if (to.path.includes('content')) to.meta.savedPosition = 0
    // window.scrollTo(0, to.meta.savedPosition)
    setTimeout(() => {
      window.scrollTo(0, to.meta.savedPosition)
    }, time)
  } else {
    // window.scrollTo(0, 0)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, time)
  }
  // document.removeEventListener('transitionend', scroll)
}
*/

const scrollBehavior = (to, from, savedPosition) => {
  from.meta.savedPosition = document.body.scrollTop || document.documentElement.scrollTop
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

export default router
