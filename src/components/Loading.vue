<template>
  <div class="loadEffect">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<style lang="scss">
  @import '../assets/style/common.scss';

  .loadEffect{
    width: px2rem(100px);
    height: px2rem(100px);
    position: relative;
    left: 50%;
    top: px2rem(100px);
    transform: translateX(-50%);
    z-index: 200;
  }
  .loadEffect span{
    display: inline-block;
    width: px2rem(16px);
    height: px2rem(16px);
    border-radius: 50%;
    background: red;
    position: absolute;
    animation: load 1.04s ease infinite;
    opacity: 0;
  }
  @keyframes load{
    0%{
      opacity: 1;
      transform: scale(1)
    }
    100%{
      opacity: 0.2;
      transform: scale(0.4)
    }
  }
  .loadEffect span:nth-child(1){
    left: 0;
    top: 50%;
    margin-top:-1 * px2rem(8px);
    animation-delay:0.13s;
  }
  .loadEffect span:nth-child(2){
    left: px2rem(14px);
    top: px2rem(14px);
    animation-delay:0.26s;
  }
  .loadEffect span:nth-child(3){
    left: 50%;
    top: 0;
    margin-left: -1 * px2rem(8px);
    animation-delay:0.39s;
  }
  .loadEffect span:nth-child(4){
    top: px2rem(14px);
    right:px2rem(14px);
    animation-delay:0.52s;
  }
  .loadEffect span:nth-child(5){
    right: 0;
    top: 50%;
    margin-top:-1 * px2rem(8px);
    animation-delay:0.65s;
  }
  .loadEffect span:nth-child(6){
    right: px2rem(14px);
    bottom:px2rem(14px);
    animation-delay:0.78s;
  }
  .loadEffect span:nth-child(7){
    bottom: 0;
    left: 50%;
    margin-left: -1 * px2rem(8px);
    animation-delay:0.91s;
  }
  .loadEffect span:nth-child(8){
    bottom: px2rem(14px);
    left: px2rem(14px);
    animation-delay:1.04s;
  }
</style>

