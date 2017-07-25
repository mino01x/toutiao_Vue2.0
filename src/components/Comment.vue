<template>
  <div class="myComment">
    <div class="comment-box">
      <Icon type="edit"></Icon>
      <span>写评论...</span>
    </div>
    <Icon type="share" class="comment-icon"></Icon>
    <Icon type="ios-star-outline" class="comment-icon"></Icon>
  </div>
</template>
<style lang="scss">
  @import '../assets/style/common.scss';

  .myComment {
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ddd;
    width: 100%;
    z-index: 200;
    line-height: px2rem(80px);
  }
  .comment-box {
    background: #eee;
    display: inline-block;
    line-height: px2rem(50px);
    vertical-align: middle;
    width: px2rem(300px);
    padding-left: px2rem(20px);
    border-radius: px2rem(25px);
    margin-left: px2rem(30px);
    color: #aaa;
    span {
      padding-left: px2rem(10px);
    }
  }
  .comment-icon {
    font-size: px2rem(50px);
    line-height: px2rem(80px);
    float: right;
    margin-right: px2rem(40px);
  }
</style>

