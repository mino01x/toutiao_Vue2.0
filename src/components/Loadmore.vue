<template>
  <div class="myLoadmore">
    <span v-if="!flag" @click="$emit('event')">{{msg}}</span>
    <span v-else>加载中...</span>
  </div>
</template>
<script>
export default {
  props: {
    // 是否请求
    flag: {
      required: true
    },
    // 请求是否成功
    ifFlag: {
      required: true
    }
  },
  computed: {
    // 请求失败变换显示内容
    msg () {
      if (this.ifFlag) {
        return '点击加载更多...'
      }
      return '加载失败,点击重新加载！'
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';

  .myLoadmore {
    text-align: center;
    cursor: pointer;
    padding: px2rem(20px) 0;
  }
</style>

