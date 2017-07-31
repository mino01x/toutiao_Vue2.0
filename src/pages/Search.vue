<template>
  <div>
    <c-back class="header"></c-back>
    <div class="content search_content">
      <div class="search_box">
        <input type="text" placeholder="请输入关键字" ref="search" v-model="keyword" @keyup.enter="getSearch(keyword)" @click="ifHistory = true">
        <transition name="slide">
          <div class="history" v-show="ifHistory">
            <ul class="history_items"> 
              <li class="history_item"
                v-for="item in history.items"
                :key="item.id">
                <span class="history_item_content" @click="historySearch(item)">{{item.content}}</span>
                <span @click="REMOVE_HISTORY(item.id)">
                  <Icon type="ios-close-empty" class="history_item_close"></Icon>
                </span>
              </li>
            </ul>
            <div class="manage_history">
              <span class="clear_history" @click="CLEAR_HISTORY">清空历史</span>
              <span class="close_history" @click="ifHistory = false">关闭</span>
            </div>
          </div>
        </transition>
      </div>
      <c-loading v-if="loading"></c-loading>
      <c-warning v-else-if="!ifReturnSearch" @reload="reSearch"></c-warning>
      <c-newslist :listCon="searchlist" v-else-if="searchlist.length" @event="getMoreSearch"
        :flag="loadmoreSearch" :ifFlag="ifReturnMoreSearch"></c-newslist>
    </div>
  </div>
</template>
<script>
  import CBack from '../components/Back.vue'
  import CNewslist from '../components/Newslist.vue'
  import CLoading from '../components/Loading.vue'
  import CWarning from '../components/Warning.vue'
  import { mapState, mapMutations } from 'vuex'

  export default {
    components: {
      CBack,
      CNewslist,
      CLoading,
      CWarning
    },
    data () {
      return {
        keyword: '',
        offset: 0,
        cache: '',
        ifHistory: false
      }
    },
    methods: {
      ...mapMutations([
        'ADD_HISTORY',
        'REMOVE_HISTORY',
        'CLEAR_HISTORY'
      ]),
      getSearch (keyword) {
        this.cache = keyword.trim()
        if (!this.cache) {
          return false
        }
        this.keyword = ''
        this.offset = 0
        this.$store.state.search = []
        this.$store.dispatch('getSearch', {
          offset: this.offset,
          keyword: this.cache
        })
        this.ADD_HISTORY(this.cache)
        this.ifHistory = false
        this.$refs.search.blur()
      },
      reSearch () {
        console.log('reSearch')
        console.log(this.offset, this.cache)
        this.$store.dispatch('getSearch', {
          offset: this.offset,
          keyword: this.cache
        })
      },
      getMoreSearch () {
        this.offset += 20
        this.$store.dispatch('getMoreSearch', {
          offset: this.offset,
          keyword: this.cache
        })
      },
      historySearch (item) {
        this.REMOVE_HISTORY(item.id)
        this.getSearch(item.content)
      }
    },
    computed: {
      ...mapState([
        'loading',
        'ifReturnSearch',
        'search',
        'loadmoreSearch',
        'ifReturnMoreSearch',
        'history'
      ]),
      searchlist () {
        return this.search
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/style/common.scss';

  .search_content {
    padding-top: px2rem(160px);
    padding-bottom: 0;
  }
  .search_box {
    background: red;
    height: px2rem(80px);
    text-align: center;
    position: fixed;
    left: 0;
    top: px2rem(80px);
    width: 100%;
    input {
      height: px2rem(60px);
      width: 8rem;
      text-indent: px2rem(30px);
      font-size: px2rem(30px);
      margin-top: px2rem(10px);
    }
  }
  .history {
    position: absolute;
    top: px2rem(80px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    background: #fafafa;
    width: 8rem;
    text-align: left;
    border: 1px solid #ddd;
    box-shadow: 0 px2rem(4px) px2rem(4px) #eee;
    overflow: hidden;
    @include font-dpr(14px);
    .history_items {
      overflow: auto;
      height: px2rem(300px);
      overflow-x: hidden;
    }
    .history_item {
      overflow: hidden;
      text-overflow: ellipsis;
      padding: px2rem(10px) px2rem(20px);
      border-bottom: 1px solid #ddd;
      box-sizing: border-box;
      height: px2rem(60px);
      line-height: px2rem(40px);
      transition: all 1s linear;
      .history_item_content {
        display: inline-block;
        width: px2rem(440px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .history_item_close {
        float: right;
        font-size: px2rem(50px);
        margin-top: -1 * px2rem(5px);
      }
      &:last-child {
        border-bottom: 0
      }
    }
    .manage_history {
      height: px2rem(60px);
      background: #efefef;
      display: flex;
      align-items: center;
      span {
        flex-grow: 1;
        text-align: center;
        border-right: 1px solid #777;
        height: px2rem(40px);
        line-height: px2rem(40px);
        &:last-child {
          border-right: 0;
        }
      }
    }
  }
</style>

