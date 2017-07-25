import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Collect from '../pages/Collect'
import Session from '../pages/Session'
import About from '../pages/About'
import Content from '../pages/Content.vue'

Vue.use(Router)

export default new Router({
  routes: [
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
      redirect: '/home/all?type=__all__'
    }
  ]
})
