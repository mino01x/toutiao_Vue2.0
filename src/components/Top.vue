<template>
  <Back-top>
    <div class="back_top">top</div>
  </Back-top>
</template>

<style lang="scss">
  @import '../assets/style/common.scss';

  .back_top {
    background: rgba(0, 0, 0, .7);
    @include font-dpr(12px);
    position: fixed;
    right: px2rem(30px);
    bottom: px2rem(110px);
    padding: px2rem(10px);
    color: #fff;
    border-radius: px2rem(5px);
    box-shadow: px2rem(2px) px2rem(2px) px2rem(2px) #eee;
  }
</style>
