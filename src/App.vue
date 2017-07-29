<template>
  <div id="app">
     <transition :name="page"> 
       <keep-alive> 
        <router-view class="container"></router-view>
       </keep-alive> 
     </transition> 
     <c-top></c-top>
    <!-- <component :is="footer"></component> -->
  </div>
</template>

<script>
import CFooter from './components/Footer.vue'
import CTop from './components/Top.vue'

export default {
  name: 'app',
  data () {
    return {
      page: ''
    }
  },
  components: {
    CFooter,
    CTop
  },
  computed: {
    footer () {
      console.log(this.$route.path)
      return 'c-footer'
    }
    // page () {
    //   console.log(this.$route.)
    //   return 'content'
    // }
  },
  watch: {
    $route (to, from) {
      if (to.path.includes('content')) {
        this.page = 'content-right'
      } else if (from.path.includes('content')) {
        this.page = 'content-left'
      } else {
        this.page = 'fadeIn'
      }
      // this.page = to.path.includes('content') || from.path.includes('content') ? 'content' : ''
    }
  }
  // beforeRouteUpdate (to, from, next) {
  //   console.log('beforeRouteUpdate')
  //   this.page = to.path.includes('content') ? 'content' : ''
  //   // next()
  // }
}
</script>

<style lang="scss">
  @import './assets/style/common.scss';
  @import './assets/style/newsList.scss';
  @import './assets/style/global.scss';
  @import './assets/style/transition.scss';
</style>
