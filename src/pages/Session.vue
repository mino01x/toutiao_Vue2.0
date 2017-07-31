<template>
  <div>
    <c-back class="header"></c-back>
    <div class="content">
      <ul class="session">
        <li v-for="(item, index) in session" :key="index" class="session-item">
          <div class="session-user">
            <img :src="item.group.user.avatar_url" alt="avatar">
            <span class="session-user-name">{{item.group.user.name}}</span>
          </div>
          <p class="session-content">{{item.group.content}}</p>
          <div class="session-info">
            <span>赞{{item.group.digg_count}}</span>
            <span>踩{{item.group.bury_count}}</span>
            <span>评论{{item.group.comment_count}}</span>
            <span class="float-item">分享{{item.group.share_count}}</span>
            <span class="float-item">喜欢{{item.group.favorite_count}}</span>
          </div>
        </li>
      </ul>
      <c-loadmore :flag="loadmoreSession" :ifFlag="ifReturnSession" @event="$store.dispatch('getSession')"></c-loadmore>
    </div>
    <c-footer></c-footer>
  </div>
</template>
<script>
import CFooter from '../components/Footer.vue'
import CBack from '../components/Back.vue'
import CLoadmore from '../components/Loadmore.vue'
import { mapState } from 'vuex'

export default {
  components: {
    CFooter,
    CBack,
    CLoadmore
  },
  created () {
    if (this.session.length > 0) return false
    this.$store.dispatch('getSession')
  },
  computed: {
    session () {
      return this.$store.state.session
    },
    ...mapState([
      'loadmoreSession',
      'ifReturnSession'
    ])
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';

  .session {
    padding: 0 px2rem(20px);
  }
  .session-item {
    margin: px2rem(20px) 0;
    padding: px2rem(20px);
    border: 1px solid #ddd;
    border-radius: px2rem(10px);
    .session-user {
      vertical-align: middle;
      img {
        display: inine-block;
        vertical-align: middle;
        border-radius: 50%;
        width: px2rem(60px);
        height: px2rem(60px);
      }
      .session-user-name {
        @include font-dpr(16px);
        vertical-align: middle;
        padding-left: px2rem(10px);
      }
    }
    .session-content {
      @include font-dpr(14px);
      padding: px2rem(10px) 0;
    }
    .session-info {
      span {
        margin-right: px2rem(10px);
        color: #aaa;
      }
      .float-item {
        float: right;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>

