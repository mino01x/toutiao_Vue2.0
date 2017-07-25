<template>
  <div class="myBack">
    <span @click="$router.back()"><Icon type="chevron-left" class="back-btn"></Icon></span>
  </div>
</template>
<style lang="scss">
  @import '../assets/style/common.scss';

  .myBack {
    border-bottom: 1px solid #ddd;

  }
  .back-btn {
    font-size: px2rem(50px);
    line-height: px2rem(80px);
    text-indent: px2rem(20px);
    cursor: pointer;
  }
</style>

