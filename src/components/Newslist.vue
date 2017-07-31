<template>
  <div class="newsList">
    <ul>
      <router-link v-for="(item, index) in listCon" 
        :key="index" 
        :to="{path: '/content/' + item.item_id}"
        tag="li"
        class="news_box"
        v-if="item.title"
        >
          <div class="news_title" v-html="item.title"></div>
          <div class="news_imgs" v-if="item.has_image ? item.image_list.length : false">
            <img v-for="(img, index) in item.image_list" v-lazy="img.url" style="width: 30%" :key="index" v-if="index < 3">
          </div>
          <div class="news_info">
            <span class="media_name">{{item.media_name}}</span>
            <span class="comment_count">评论 {{item.comment_count}}</span>
            <span class="datetime">{{item.datetime|dateFormat}}</span>
          </div>
      </router-link>
    </ul>
    <c-loadmore :flag="flag" :ifFlag="ifFlag" @event="$emit('event')" v-if="ifLoadmore"></c-loadmore>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CLoadmore from './Loadmore.vue'
import moment from 'moment'

export default {
  props: {
    // 新闻列表
    listCon: {
      require: true
    },
    // 是否可以请求更多
    ifLoadmore: {
      default: true
    },
    // 是否请求
    flag: {
      require: true
    },
    // 请求是否成功
    ifFlag: {
      require: true
    }
  },
  computed: {
    ...mapState([
      'loadmore',
      'ifReturnMore'
    ])
  },
  components: {
    CLoadmore
  },
  filters: {
    dateFormat (time) {
      return moment(time).startOf('mimute').fromNow()
    }
  }
}
</script>
