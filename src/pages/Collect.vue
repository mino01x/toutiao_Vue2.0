<template>
  <div>
    <c-back class="header"></c-back>
    <div class="content">
      <div class="collection_tag">
        <span class="tag initial_collection" @click="initial">默认收藏</span>
        <span class="tag local_collection" @click="local">本地收藏</span>
        <span class="active" ref="active"></span>
      </div>
      <transition :name="direction">
        <c-newslist
          :listCon="collection"
          :ifLoadmore="false"
          v-if="collection_tag === 'initial'"></c-newslist> 
        <div v-else>
          <ul class="local_collection_items" v-if="localCollection.length">
            <li
              v-for="item in localCollection" 
              :key="item.id" 
              class="local_collection_item"
              @click="$router.push({path: '/content/' + item.id})"
              >
              <img v-lazy="item.src" alt="avatar" class="local_collection_img">
              <div class="local_collection_title">{{item.title}}</div>
              <div class="local_collection_remove" @click.stop="removeCollection(item.id)">
                <Icon type="ios-trash-outline" color="#fff"></Icon>
              </div>
            </li>
          </ul>
          <div v-else class="local_collection_none">空空如也,赶快去收藏吧~</div>
        </div>
      </transition>
      <Modal v-model="ifModal" class-name="del_dialog">
        <p slot="header" class="del_header">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div class="del_content">
          <p>取消收藏后无法恢复</p>
          <p>是否继续删除？</p>
        </div>
        <div slot="footer" class="del_footer">
          <Button type="error" size="large" long @click="del">删除</Button>
        </div>
      </Modal>
    </div>
    <c-footer></c-footer> 
  </div>
</template>
<script>
import CNewslist from '../components/Newslist.vue'
import CFooter from '../components/Footer.vue'
import CBack from '../components/Back.vue'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      collection_tag: 'initial',
      direction: '',
      ifModal: false,
      id: ''
    }
  },
  methods: {
    ...mapMutations([
      'REMOVE_COLLECTION'
    ]),
    // 显示默认收藏标签
    initial () {
      this.collection_tag = 'initial'
      this.direction = 'collection-right'
      this.$refs.active.style.transform = 'translateX(0)'
    },
    // 显示本地收藏标签
    local () {
      this.collection_tag = 'local'
      this.direction = 'collection-left'
      this.$refs.active.style.transform = 'translateX(2rem)'
    },
    // 弹出对话框选择是否删除收藏
    removeCollection (id) {
      this.ifModal = true
      this.id = id
    },
    // 删除收藏
    del () {
      this.REMOVE_COLLECTION(this.id)
      this.ifModal = false
      this.$Message.success('删除成功')
      this.id = ''
    }
  },
  components: {
    CFooter,
    CBack,
    CNewslist
  },
  computed: {
    ...mapState([
      'collection',
      'localCollection',
      'positions'
    ])
  },
  created () {
    if (this.collection.length > 0) return false
    axios.get('./static/collect.json').then(res => {
      this.$store.commit('GET_COLLECTION', res.data.data)
    })
  }
}
</script>

<style lang="scss">
  @import '../assets/style/common.scss';

  .collection_tag {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: px2rem(80px);
    z-index: 500;
    font-size: 0;
    .tag {
      display: inline-block;
      width: 2rem;
      height: 100%;
      font-size: px2rem(30px);
      line-height: px2rem(76px);
      text-align: center;
    }
    .active {
      display: inline-block;
      height: px2rem(4px);
      width: 2rem;
      background: red;
      position: absolute;
      left: 0;
      bottom: 0;
      transition: transform 0.6s ease;
    }
  }
  .local_collection_none {
    @include font-dpr(16px);
    text-align: center;
    margin-top: px2rem(80px);
    color: #aaa;
    width: 100vw;
  }
  .local_collection_items {
    padding: 0 px2rem(20px);
    width: 100vw;
  }
  .local_collection_item {
    height: px2rem(160px);
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #ddd;
    width: 100%;
  }
  .local_collection_img {
    width: px2rem(100px);
    height: px2rem(100px);
  }
  .local_collection_title {
    @include font-dpr(14px);
    width: px2rem(440px);
    padding: 0 px2rem(20px);
  }
  .local_collection_remove {
    position: absolute;
    top: px2rem(30px);
    right: 0;
    font-size: px2rem(60px);
    background: red;
    width: px2rem(60px);
    height: px2rem(100px);
    line-height: px2rem(100px);
    text-align: center;
  }
</style>

