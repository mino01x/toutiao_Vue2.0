<template>
  <div>
		<div class="header home_header">
			<span class="logo">今天头条</span>
			<router-link to="/search" tag="div" class="search">
					<Icon type="ios-search" class="search_icon"></Icon>
					<div class="search_input">搜索...</div>
			</router-link>
			<div ref="refresh" class="refresh_icon">
				<Icon type="android-refresh"></Icon>
			</div>
		</div>
		<div class="content home_content">
      <c-home-nav></c-home-nav>
			<c-loading v-show="loading" class="loading"></c-loading>
			<c-warning v-show="!loading && !ifReturnMsg" class="warning" @reload="getNews({type: $route.params.type})"></c-warning>
			 <transition name="fadeIn"> 
         <c-newslist
          :listCon="listCon"
          v-show="!loading && ifReturnMsg"
					@event="loadmoreNews"
					:flag="loadmore"
					:ifFlag="ifReturnMore"></c-newslist>
			 </transition> 
		</div>
		<c-footer></c-footer>
	</div>
</template>

<script>
import CTemplate from '../components/Template.vue'
import CFooter from '../components/Footer.vue'
import CLoading from '../components/Loading.vue'
import CWarning from '../components/Warning.vue'
import CTop from '../components/Top.vue'
import CLoadmore from '../components/Loadmore.vue'
import CHomeNav from '../components/HomeNav.vue'
import CNewslist from '../components/Newslist.vue'
import moment from 'moment'
import { mapActions, mapState } from 'vuex'

export default {
	data () {
		return {
			touchPosition: 0
		}
	},
	components: {
		CTemplate,
		CFooter,
		CLoading,
		CWarning,
		CLoadmore,
    CTop,
    CHomeNav,
    CNewslist
	},
	created () {
		console.log('home.vue created')
		let that = this
		let type = this.$route.params.type
		if (Object.keys(this.list[type]).length > 0) return false
		this.getNews({
			type: type
		})
		document.body.addEventListener('touchstart', function (e) {
			if (!that.$route.params.type) return false
			that.touchPosition = e.touches[0].pageY
			that.$refs.refresh.style.transition = ''
		})
		document.body.addEventListener('touchmove', function (e) {
			if (!that.$route.params.type) return false
			const disY = e.touches[0].pageY - that.touchPosition
			const rotate = disY / 300 * 360
			if (disY > 200 || disY < 30) return false
			that.$refs.refresh.style.transform = `translate(-50%, ${disY}px) rotate(${rotate}deg)`
		})
		document.body.addEventListener('touchend', function (e) {
			if (!that.$route.params.type) return false
			const disY = e.changedTouches[0].pageY - that.touchPosition
			if (disY < 30) return false
			that.$refs.refresh.style.transform = ''
			that.$refs.refresh.style.transition = 'transform 0.5s linear'
			if (disY < 200) return false
			console.log(that.$route.params)
			that.refreshNews({
				type: that.$route.params.type
			})
		})
	},
	watch: {
		$route (to, from) {
			console.log('i am watching in home.vue')
			if (to.path.includes('home')) {
				const type = to.params.type
				console.log(type)
				if (Object.keys(this.list[type]).length > 0) {
					this.$store.state.ifReturnMsg = true
					return false
				}
				this.getNews({
					type: to.params.type
				})
			}
		},
		ifReturnRefresh (val, oldVal) {
			if (val && this.newsLength) {
				console.log(this.newsLength)
				this.$Message.success(`为您刷新${this.newsLength}条信息`)
			}
		}
	},
	methods: {
		...mapActions([
			'getNews',
			'getMoreNews',
			'refreshNews'
		]),
		loadmoreNews () {
			this.getMoreNews({
				type: this.$route.params.type
			})
		}
	},
	computed: {
		...mapState([
			'list',
			'loading',
			'ifReturnMsg',
			'loadmore',
			'ifReturnMore',
			'newsLength',
			'ifReturnRefresh'
		]),
		listCon () {
			return this.list[this.$route.params.type || '__all__']
		}
	},
	filters: {
		dateFormat (time) {
			if (!time) {
				return ''
			}
			return moment(time).startOf('minute').fromNow()
		}
	}
}
</script>
<style lang="scss">
	@import '../assets/style/common.scss';

	.home_header {
		background: red;
		.refresh_icon {
			font-size: px2rem(50px);
			color: lightgreen;
			position: absolute;
			top: px2rem(80px);
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.logo { 
		font-size: px2rem(40px);
		color: #fff;
		line-height: px2rem(80px);
		padding: 0 px2rem(40px);
		font-weight: bold;
	}
	.search {
		position: absolute;
		right: px2rem(30px);
		top: px2rem(15px);
		font-size: px2rem(26px);
		.search_icon {
			position: absolute;
			top: px2rem(12px);
			left: px2rem(12px);
		}
		.search_input {
			width: px2rem(300px);
			height: px2rem(50px);
			text-indent: px2rem(50px);
			border: 1px solid #aaa;
			border-radius: px2rem(10px);
			background: #fff;
			line-height: px2rem(50px);
		}
  }
  .home_content {
    padding-top: px2rem(140px);
  }
</style>
