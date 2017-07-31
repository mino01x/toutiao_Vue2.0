<template>
  <div class="myComment">
    <div class="comment-box" @click="$emit('comment')">
      <Icon type="edit"></Icon>
      <span>写评论...</span>
    </div>
    <span @click="$emit('share')">
      <Icon type="share" class="comment-icon"></Icon>
    </span>
    <span @click="$emit('star')">
      <Icon type="ios-star-outline" class="comment-icon" v-if="!ifStar"></Icon>
      <Icon type="star" class="comment-icon" v-else color="red"></Icon>
    </span>
  </div>
</template>
<script>
export default {
  computed: {
    // 判断文章是否被收藏过
    ifStar () {
      let id = this.$route.params.id
      let index = this.$store.state.localCollection.findIndex(item => item.id === id)
      return index !== -1
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';

  .myComment {
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ddd;
    width: 100%;
    z-index: 400;
    line-height: px2rem(80px);
    background: #fff;
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
    line-height: px2rem(80px) !important;
    float: right;
    margin-right: px2rem(40px);
  }
</style>
