<template>
  <div>
		<div class="header home_header">
			<span class="logo">今天头条</span>
			<router-link to="/search" tag="div" class="search">
					<Icon type="ios-search" class="search_icon"></Icon>
					<div class="search_input">搜索...</div>
			</router-link>
			<div ref="refresh" class="refresh_icon">
				<Icon type="android-refresh" color="green"></Icon>
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
import CFooter from '../components/Footer.vue'
import CLoading from '../components/Loading.vue'
import CWarning from '../components/Warning.vue'
import CLoadmore from '../components/Loadmore.vue'
import CHomeNav from '../components/HomeNav.vue'
import CNewslist from '../components/Newslist.vue'
import { mapActions, mapState } from 'vuex'

export default {
	data () {
		return {
			touchPosition: 0
		}
	},
	components: {
		CFooter,
		CLoading,
		CWarning,
		CLoadmore,
    CHomeNav,
    CNewslist
	},
	created () {
		let that = this
		// 向下滑动使得新闻刷新
		document.body.addEventListener('touchstart', function (e) {
			if (!that.$route.params.type) return false
			if (document.body.scrollTop <= 0) {
				that.touchPosition = e.touches[0].pageY
				that.$refs.refresh.style.transition = ''
				document.body.addEventListener('touchmove', that.touchmove)
				document.body.addEventListener('touchend', that.touchend)
			}
		})
		let type = this.$route.params.type
		// if (Object.keys(this.list[type]).length > 0) return false
		this.getNews({
			type: type
		})
	},
	watch: {
		$route (to, from) {
			if (to.path.includes('home')) {
				const type = to.params.type
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
		},
		touchmove (e) {
			if (!this.$route.params.type) return false
			const disY = e.touches[0].pageY - this.touchPosition
			const rotate = disY / 300 * 360
			if (disY < 30) return false
			this.$refs.refresh.style.transform = `translate(-50%, ${Math.min(disY, 200)}px) rotate(${rotate}deg)`
		},
		touchend (e) {
			document.body.removeEventListener('touchmove', this.touchmove)
			document.body.removeEventListener('touchend', this.touchend)
			if (!this.$route.params.type) return false
			const disY = e.changedTouches[0].pageY - this.touchPosition
			if (disY < 30) return false
			this.$refs.refresh.style.transform = ''
			this.$refs.refresh.style.transition = 'transform 0.5s linear'
			if (disY < 200) return false
			this.refreshNews({
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
			'ifReturnRefresh',
			'typePositions'
		]),
		listCon () {
			return this.list[this.$route.params.type || '__all__']
		}
	},
	// 离开页面时，记录新闻的类型
	beforeRouteLeave (to, from, next) {
		this.$store.commit('LOG_TYPE', from.params.type)
		next()
	}
}
</script>
<style lang="scss">
	@import '../assets/style/common.scss';

	.home_header {
		background: red;
		.refresh_icon {
			font-size: px2rem(50px);
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
