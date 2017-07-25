<template>
  <c-template>
    <c-back slot="header"></c-back>
    <div slot="content" class="article_content">
      <c-loading v-show="loading" class="loading"></c-loading>
      <c-warning v-show="!loading && !ifReturnMsg" 
        class="warning"
        @reload="getArticle({id: $route.params.id})"></c-warning>
      <transition name="fade">
        <div class="content_article" v-show="!loading && ifReturnMsg">
          <div class="title">{{article.title}}</div>
          <div class="detail_source">{{article.detail_source}}</div>
          <div class="content" v-html="article.content"></div>
        </div>
      </transition>
    </div>
    <c-comment slot="footer"></c-comment>
  </c-template>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import CLoading from '../components/Loading.vue'
import CWarning from '../components/Warning.vue'
import CTemplate from '../components/Template.vue'
import CBack from '../components/Back.vue'
import CComment from '../components/Comment.vue'

export default {
  components: {
    CTemplate,
    CLoading,
    CWarning,
    CBack,
    CComment
  },
  created () {
    let id = this.$route.params.id
    console.log(id)
    this.getArticle({id: id})
  },
  methods: {
    ...mapActions([
      'getArticle'
    ])
  },
  computed: {
    ...mapState([
      'article',
      'ifReturnMsg',
      'loading'
    ])
  }
}
</script>
<style lang="scss">
  @import '../assets/style/common.scss';
  @import '../assets/style/transition.scss';

  .article_content {
    padding: px2rem(40px);
    .title {
      @include font-dpr(20px);
      font-weight: bold;
    }
    .detail_source {
      margin: px2rem(10px);
      float: right;
      color: #777;
    }
    .content {
      clear: both;
      @include font-dpr(14px);
      p {
        text-indent: px2rem(28px);
        padding: px2rem(10px) 0;
      }
    }
    img {
      width: 80% !important;
      display: block;
      margin: 0 auto;
      padding: px2rem(10px) 0;
    }
  }
</style>

