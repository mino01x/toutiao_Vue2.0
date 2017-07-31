<template>
  <div id="app">
     <transition :name="page"> 
       <keep-alive> 
        <router-view class="container"></router-view>
       </keep-alive> 
     </transition> 
     <c-top></c-top>
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
  watch: {
    $route (to, from) {
      if (to.path.includes('content')) {
        this.page = 'content-right'
      } else if (from.path.includes('content')) {
        this.page = 'content-left'
      } else {
        this.page = 'fadeIn'
      }
    }
  }
}
</script>

<style lang="scss">
  @import './assets/style/common.scss';
  @import './assets/style/newsList.scss';
  @import './assets/style/global.scss';
  @import './assets/style/transition.scss';
</style>
