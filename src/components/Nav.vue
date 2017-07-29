<template>
  <div class="myNav">
    <div v-for="(item, index) in list" :key="index" class="myNav_item" @click="$emit('click'+index)">
      <span>{{item.msg}}</span>
      <Icon type="ios-arrow-forward"></Icon>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: [
        {msg: 'hello'},
        {msg: 'hello'}
      ]
    }
  }
}
</script>
<style lang="scss">
  @import '../assets/style/common.scss';

  .myNav {
    margin: px2rem(20px) 0;
  }
  .myNav_item {
    line-height: px2rem(60px);
    background: #fff;
    text-align: center;
    @include font-dpr(14px);
    span {
      display: inline-block;
      width: 86%;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    &:last-child span {
      border-bottom: 0;
    }
  }
</style>

