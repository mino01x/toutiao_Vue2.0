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
// const scrollBehavior = (to, from, savedPosition) => {
//   if (savedPosition) {
//     return savedPosition
//   } else if (to.meta.savedPosition) {
//     console.log("the route's savedPosition", to.meta.savedPosition.y)
//     return to.meta.savedPosition
//   } else {
//     console.log('no savedPosition')
//   }
// }

const router = new Router({
  routes
})

// router.beforeEach((to, from, next) => {
//   from.meta.savedPosition = { x: 0, y: document.body.scrollTop }
//   next()
// })

export default router
