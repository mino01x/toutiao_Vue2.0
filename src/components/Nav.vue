<template>
  <div class="myNav">
    <div v-for="(item, index) in list" :key="index" class="myNav_item">
      <span>{{item.msg}}</span>
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
  .myNav {
    margin: 0.3rem 0;
  }
  .myNav_item {
    line-height: 1rem;
    background: #fff;
    text-align: center;
    span {
      display: inline-block;
      width: 90%;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    &:last-child span {
      border-bottom: 0;
    }
  }
</style>

