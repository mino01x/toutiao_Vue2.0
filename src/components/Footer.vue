<template>
  <div class="footer">
    <router-link :to="home" class="navItem">
      <Icon type="home" class="navItem-icon"></Icon>
      <span>首页</span>
    </router-link>
    <router-link to="/collect" class="navItem">
      <Icon type="ios-heart" class="navItem-icon"></Icon>
      <span>收藏</span>
    </router-link>
    <router-link to="/session" class="navItem">
      <Icon type="chatbubble-working" class="navItem-icon"></Icon>
      <span>段子</span>
    </router-link>
    <router-link to="/about" class="navItem">
      <Icon type="android-person" class="navItem-icon"></Icon>
      <span>我的</span>
    </router-link>
  </div>
</template>
<script>
export default {
  computed: {
    home () {
      return '/home/' + this.$store.state.type || '/home/__all__'
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ddd;
    width: 100%;
    height: px2rem(80px);
    background: #fff;
    display: flex;
    justify-content: center;
    z-index: 200;
    .navItem {
      flex-grow: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #777;
      .navItem-icon {
        font-size: px2rem(35px)
      }
      span {
        font-size: px2rem(20px)
      }
    }
    .router-link-active {
      color: tomato;
    }
  }
</style>

