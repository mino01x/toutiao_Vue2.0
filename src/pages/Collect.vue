<template>
  <c-template>
    <c-back slot="header"></c-back> 
    <div slot="content">
       <div class="newsList"> 
					 <ul>
						<router-link v-for="(item, index) in collection" 
							:key="index" 
							:to="{path: '/content/' + item.item_id}"
							tag="li"
              class="news_box"
							>
								<div class="news_title">{{item.title}}</div>
								<div class="news_imgs">
									<img v-for="(img, index) in item.image_list" v-lazy="img.url" style="width: 30%; height: 2.5rem" :key="index">
								</div>
								<div class="news_info">
									<span class="media_name">{{item.media_name}}</span>
									<span class="comment_count">评论 {{item.comment_count}}</span>
									<span class="datetime">{{item.datetime|dateFormat}}</span>
								</div>
						</router-link>
					</ul> 
				</div>
    </div>
    <c-footer slot="footer"></c-footer>
  </c-template>
</template>
<script>
import CTemplate from '../components/Template.vue'
import CFooter from '../components/Footer.vue'
import CBack from '../components/Back.vue'
import axios from 'axios'
import moment from 'moment'

export default {
  components: {
    CTemplate,
    CFooter,
    CBack
  },
  computed: {
    collection () {
      return this.$store.state.collection
    }
  },
  filters: {
    dateFormat (time) {
      if (!time) {
        return false
      }
      return moment(time).startOf('minute').fromNow()
    }
  },
  created () {
    if (this.collection.length > 0) return false
    axios.get('/static/collect.json').then(res => {
      this.$store.commit('GET_COLLECTION', res.data.data)
    })
  }
}
</script>
