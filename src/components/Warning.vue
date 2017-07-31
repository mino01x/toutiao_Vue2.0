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
    // 重新加载
    reload () {
      this.$emit('reload')
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';

  .myWarning {
    padding-left: px2rem(130px);
    width: 80%;
    height: px2rem(190px);
    background: #fdece8;
    border: 1px solid #fbd9d0;
    position: relative;
    border-radius: px2rem(5px);
    left: 50%;
    top: px2rem(100px);
    transform: translateX(-50%);
  }
  .myWarning-left {
    height: px2rem(64px);
    width: px2rem(64px);
    background: red;
    border-radius: 50%;
    color: #fff;
    line-height: px2rem(64px);
    text-align: center;
    font-size: px2rem(40px);
    position: absolute;
    top: px2rem(64px);
    left: px2rem(40px);
  }
  .myWarning-title {
    color: #1c2438;
    margin-top: px2rem(64px);
    font-weight: bold;
  }
  .myWarning-content {
    color: #495060;
  }
</style>

