<template>
  <div class="myTop" @click="$emit('back')">
    <Icon type="arrow-up-c" color="#fff"></Icon>
  </div>
</template>

<style lang="scss">
  @import '../assets/style/common.scss';

  .myTop {
    width: px2rem(44px);
    height: px2rem(44px);
    border-radius: 50%;
    background: red;
    text-align: center;
    line-height: px2rem(44px);
    position: fixed;
    right: px2rem(30px);
    bottom: px2rem(110px);
    font-size: px2rem(44px);
  }
</style>

