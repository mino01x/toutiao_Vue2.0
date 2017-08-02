<template>
  <div class="home_nav">
    <ul class="home_nav_list" ref="homenav">
      <router-link 
        v-for="(item, index) in nav" 
        class="home_nav_item" 
        :key="index"
        :to="item.url + '/' +item.type"
        tag="li">{{item.text}}</router-link>
    </ul>
  </div>
</template>

<script>
import * as type from '../store/mutations_type.js'

export default {
  data () {
    return {
      nav: [
				{url: '/home', type: '__all__', text: '推荐'},
				{url: '/home', type: 'news_hot', text: '热点'},
				{url: '/home', type: 'news_society', text: '社会'},
				{url: '/home', type: 'news_entertainment', text: '娱乐'},
				{url: '/home', type: 'news_tech', text: '科技'},
				{url: '/home', type: 'news_car', text: '汽车'},
				{url: '/home', type: 'news_sports', text: '体育'},
				{url: '/home', type: 'news_finance', text: '财经'},
				{url: '/home', type: 'news_military', text: '军事'},
				{url: '/home', type: 'news_world', text: '国际'},
				{url: '/home', type: 'news_fashion', text: '时尚'}
      ],
      navPosition: 0
    }
  },
  watch: {
    $route (to, from) {
      if (!to.path.includes('home') && from.path.includes('home')) {
        this.$store.commit(type.SAVE_POSITION, {
          name: 'homenav',
          position: this.$refs.homenav.scrollLeft
        })
      } else if (to.path.includes('home') && !from.path.includes('home')) {
        this.$refs.homenav.scrollLeft = this.$store.state.positions.homenav
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';

  .home_nav {
    position: fixed;
    top: px2rem(80px);
    left: 0;
    width: 100%;
    height: px2rem(60px);
    background: #eee;
    z-index: 200;
  }
  .home_nav_list {
    display: flex;
    align-items: middle;
    overflow: auto;
  }
  .home_nav_item {
    line-height: px2rem(60px);
    text-align: center;
    @include font-dpr(16px);
    flex-shrink: 0;
    flex-basis: px2rem(90px);
    color: black;
  }
  .router-link-active {
    color: tomato;
    font-weight: bold;
  }
</style>
