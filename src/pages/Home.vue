<template>
	<c-template>
		<div slot="header" class="header">
			<span class="logo">今天头条</span>
			<router-link to="/search">
				<div class="search-box">
					<Icon type="ios-search" color="#aaa" class="search-icon"></Icon>
					<input type="text" placeholder="搜索...">
				</div>
			</router-link>
		</div>
		<div slot="content" class="content-box">
			<div class="home-nav-box">
				<ul class="home-nav" ref="homeNav">
					<li v-for="(item, index) in nav" class="nav-item" ref="navItem" :key="item.type">
						<router-link :to="{path: item.url, query: {type: item.type}}">{{item.text}}</router-link>
					</li>
				</ul>
			</div>
			<c-loading v-show="loading" class="loading"></c-loading>
			<c-warning v-show="!loading && !ifReturnMsg" class="warning" @reload="getNews({type: $route.query.type})"></c-warning>
			<transition name="fadeIn">
				<div class="newsList" v-show="!loading && ifReturnMsg" ref="newsList">
					<ul>
						<router-link v-for="(item, index) in listCon" 
							:key="index" 
							:to="{path: '/content/' + item.item_id}"
							tag="li"
							class="news_box"
							>
								<div class="news_title">{{item.title}}</div>
								<div class="news_imgs" v-if="item.image_list.length">
									<img v-for="(img, index) in item.image_list" v-lazy="img.url" style="width: 30%" :key="index">
								</div>
								<div class="news_info">
									<span class="media_name">{{item.media_name}}</span>
									<span class="comment_count">评论 {{item.comment_count}}</span>
									<span class="datetime">{{item.datetime|dateFormat}}</span>
								</div>
						</router-link>
					</ul>
					<c-loadmore flag="loadmore" ifFlag="ifReturnMore" @event="loadmore"></c-loadmore>
					<transition name="bounce">
						<c-top @back="backToTop" v-show="ifTop"></c-top>
					</transition>
				</div>
			</transition>
		</div>
		<c-footer slot="footer"></c-footer>
	</c-template>
</template>

<script>
import CTemplate from '../components/Template.vue'
import CFooter from '../components/Footer.vue'
import CLoading from '../components/Loading.vue'
import CWarning from '../components/Warning.vue'
import CTop from '../components/Top.vue'
import CLoadmore from '../components/Loadmore.vue'
import moment from 'moment'
import { mapActions, mapState } from 'vuex'

export default {
	data () {
		return {
			nav: [
				{url: '/home/all', type: '__all__', text: '推荐'},
				{url: '/home/hot', type: 'news_hot', text: '热点'},
				{url: '/home/society', type: 'news_society', text: '社会'},
				{url: '/home/entertainment', type: 'news_entertainment', text: '娱乐'},
				{url: '/home/tech', type: 'news_tech', text: '科技'},
				{url: '/home/car', type: 'news_car', text: '汽车'},
				{url: '/home/sports', type: 'news_sports', text: '体育'},
				{url: '/home/finance', type: 'news_finance', text: '财经'},
				{url: '/home/military', type: 'news_military', text: '军事'},
				{url: '/home/word', type: 'news_world', text: '国际'},
				{url: '/home/fashion', type: 'news_fashion', text: '时尚'}
			],
			ifTop: false
		}
	},
	components: {
		CTemplate,
		CFooter,
		CLoading,
		CWarning,
		CLoadmore,
		CTop
	},
	created () {
		let type = this.$route.query.type || '__all__'
		if (Object.keys(this.list[type]).length > 0) return false
		this.getNews({
			type: type
		})
	},
	mounted () {
		this.$refs.newsList.addEventListener('scroll', this.showball)
	},
	watch: {
		$route (to, from) {
			const type = to.query.type || '__all__'
			if (Object.keys(this.list[type]).length > 0) {
				this.$store.state.ifReturnMsg = true
				return false
			}
			this.getNews({
				type: to.query.type
			})
		}
	},
	methods: {
		...mapActions([
			'getNews',
			'getMoreNews'
		]),
		backToTop () {
			const that = this
			if (!window.requestAnimationFrame) {
				let timer = setInterval(() => {
					let top = that.$refs.newsList.scrollTop
					if (top <= 0) {
						clearInterval(timer)
						that.$refs.newsList.scrollTop = 0
						return false
					}
					that.$refs.newsList.scrollTop = top - (top - 0) / 10
				}, 30)
				return false
			}
			function transform () {
				let top = that.$refs.newsList.scrollTop
				if (top <= 0) {
					that.$refs.newsList.scrollTop = 0
					return false
				}
				that.$refs.newsList.scrollTop = top - (top - 0) / 10
				window.requestAnimationFrame(transform)
			}
			window.requestAnimationFrame(transform)
		},
		loadmore () {
			this.getMoreNews({
				type: this.$route.query.type
			})
		},
		showball () {
			this.ifTop = this.$refs.newsList.scrollTop > 600
		}
	},
	computed: {
		...mapState([
			'list',
			'loading',
			'ifReturnMsg'
		]),
		listCon () {
			return this.list[this.$route.query.type]
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
	@import '../assets/style/transition.scss';

	.header {
		background: red;
	}
	.logo { 
		font-size: px2rem(40px);
		color: #fff;
		line-height: px2rem(80px);
		font-family: 微软雅黑;
		padding: 0 px2rem(40px);
		font-weight: bold;
	}
	.search-box {
		position: absolute;
		right: px2rem(30px);
		top: px2rem(15px);
		font-size: px2rem(26px);
		.search-icon {
			position: absolute;
			top: px2rem(12px);
			left: px2rem(12px);
		}
		input {
			width: px2rem(300px);
			height: px2rem(50px);
			text-indent: px2rem(50px);
			border: 1px solid #aaa;
			border-radius: px2rem(10px);
		}
	}
	.content-box {
		box-sizing: border-box;
		padding-top: px2rem(60px);
		height: 100%;
	}
	.home-nav-box {
		background: #eee;
		width: 100%;
		overflow: scroll;
		position: absolute;
		top: px2rem(80px);
		font-size: px2rem(26px);
		z-index: 100;
		line-height: px2rem(60px);
	}
	.home-nav {
		display: flex;
		.nav-item {
			flex-shrink: 0;
			flex-basis: px2rem(80px);
			text-align: center;
			a {
				color: #000;
			}
			.router-link-active {
				color: tomato;
				font-weight: bold;
			}
		}
	}
	.loading {
		margin: px2rem(190px) auto;
	}
	.warning {
		margin: px2rem(190px) auto;
	}
</style>
