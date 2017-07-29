<template>
  <div>
    <c-back class="header"></c-back>
    <div class="content article_content">
      <c-loading v-show="loading" class="loading"></c-loading>
      <c-warning v-show="!loading && !ifReturnMsg" 
        class="warning"
        @reload="getArticle({id: $route.params.id})"></c-warning>
      <div v-show="!loading && ifReturnMsg">
        <div class="title">{{article.title}}</div>
        <div class="detail_source">{{article.detail_source}}</div>
        <div class="main_content" v-html="article.content"></div>
      </div>
      <Modal v-model="ifModal" class-name="del_dialog">
      <p slot="header" class="del_header">
        <Icon type="information-circled"></Icon>
        <span>待解封</span>
      </p>
      <div class="del_content">
        <p>隐藏着黑暗力量的钥匙啊,在我面前显示你真正的力量！现在以你的主人，小花之名命令你——封印解除！  </p>
        <p>封印解除失败</p>
      </div>
      <div slot="footer" class="del_footer">
        <Button type="error" size="large" long @click="close">放弃</Button>
      </div>
    </Modal>
    </div>
    <c-comment @star="addCollection" @comment="open" @share="open"></c-comment>
  </div>
</template>
<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import CLoading from '../components/Loading.vue'
import CWarning from '../components/Warning.vue'
import CTemplate from '../components/Template.vue'
import CBack from '../components/Back.vue'
import CComment from '../components/Comment.vue'

export default {
  data () {
    return {
      ifModal: false
    }
  },
  components: {
    CTemplate,
    CLoading,
    CWarning,
    CBack,
    CComment
  },
  created () {
    console.log('content.vue created')
    let id = this.$route.params.id
    this.getArticle({id: id})
  },
  beforeRouteEnter (to, from, next) {
    const id = to.params.id
    if (!id) return false
    next(vm => {
      vm.getArticle({ id })
    })
  },
  methods: {
    ...mapMutations([
      'ADD_COLLECTION',
      'REMOVE_COLLECTION'
    ]),
    ...mapActions([
      'getArticle'
    ]),
    addCollection () {
      console.log('content.vue addCollection')
      let id = this.$route.params.id
      let index = this.localCollection.findIndex(item => {
        return item.id === id
      })
      if (index === -1) {
        this.ADD_COLLECTION({
          id,
          src: this.article.src,
          title: this.article.title
        })
        this.$Message.success('收藏成功')
      } else {
        this.REMOVE_COLLECTION(id)
        this.$Message.success('删除成功')
      }
    },
    close () {
      this.ifModal = false
    },
    open () {
      this.ifModal = true
    }
  },
  computed: {
    ...mapState([
      'article',
      'ifReturnMsg',
      'loading',
      'localCollection'
    ])
  }
}
</script>
<style lang="scss">
  @import '../assets/style/common.scss';
  @import '../assets/style/transition.scss';

  .article_content {
    padding-left: px2rem(40px);
    padding-right: px2rem(40px);
    .title {
      @include font-dpr(20px);
      font-weight: bold;
      margin-top: px2rem(10px);
    }
    .detail_source {
      margin: px2rem(10px);
      float: right;
      color: #777;
    }
    .main_content {
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

