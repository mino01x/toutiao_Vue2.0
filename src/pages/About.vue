<template>
  <div class="about_template">
    <div class="about_login">login</div>
    <div class="about_myInfo"></div>
    <c-nav :list="list[0]"></c-nav>
    <c-nav :list="list[1]"></c-nav>
    <c-nav :list="list[2]"></c-nav>
    <c-footer slot="footer"></c-footer>
  </div>
</template>
<script>
import CTemplate from '../components/Template.vue'
import CFooter from '../components/Footer.vue'
import CBack from '../components/Back.vue'
import CNav from '../components/Nav.vue'

export default {
  components: {
    CTemplate,
    CFooter,
    CBack,
    CNav
  },
  data () {
    return {
      list: [
        [
          {msg: 'hello'}
        ],
        [
          {msg: 'hello'},
          {msg: 'hello'}
        ],
        [
          {msg: 'hello'},
          {msg: 'hello'},
          {msg: 'hello'}
        ]
      ]
    }
  }
}
</script>
<style>
  .about_template {
    background: #eee;
    height: 100vh;
    overflow: auto;
  }
  .about_login {
    height: 4rem;
    max-height: 30vh;
    background: #aaa;
  }
  .about_myInfo {
    height: 2rem;
    background: #fff;
  }
</style>
