<template>
  <div class="myWarning" @click="reload">
    <div class="myWarning-left">X</div>
    <div class="myWarning-right">
      <div class="myWarning-title">加载失败...</div>
      <div class="myWarning-content">5555.点击重新加载试试</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    reload () {
      this.$emit('reload')
    }
  }
}
</script>

<style lang="scss">
  .myWarning {
    padding-left: 2rem;
    width: 80%;
    height: 3rem;
    background: #fdece8;
    border: 0.04rem solid #fbd9d0;
    position: relative;
    border-radius: 5px;
  }
  .myWarning-left {
    height: 1rem;
    width: 1rem;
    background: red;
    border-radius: 50%;
    color: #fff;
    line-height: 1rem;
    text-align: center;
    font-size: 0.6rem;
    position: absolute;
    top: 1rem;
    left: 0.6rem;
  }
  .myWarning-title {
    color: #1c2438;
    margin-top: 1rem;
    font-weight: bold;
  }
  .myWarning-content {
    color: #495060;
  }
</style>

