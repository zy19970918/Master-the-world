<template>
	<view class="content">
		<view class="titles">
			{{text_title.newsTitle}}
		</view>
		<view class="time">
			{{text_title.newsTimeStr}}
		</view>
		<view class="contenttext" v-html="text">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: "",
				text_title:'',
				newsid: "" //新闻详情页的id
			}
		},
		onLoad(options) {
			console.log(options)
			this.newsid = options.id
			this.getnewdetail()
		},
		methods: {
			getnewdetail() {
				var that = this
				uni.showLoading({
					title: "加载中"
				})
				uni.request({
					url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/news/queryDetail",
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {
						newsId: that.newsid
					},
					success(res) {
						if (res.data.status == 200) {
							// res.data.data.newsContent
							var str = res.data.data.newsContent.replace(/\<img/gi, '<img style="max-width:80%;height:auto;" ').replace(
									/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
								.replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p')
								.replace(/<p>/ig, '<p class="p_class">')
							console.log(res)
							that.text = str
							that.text_title=res.data.data
							uni.hideLoading()
						} else {
							uni.showToast({
								title: "获取失败",
								icon: 'none'
							})
						}
					}
				})
			},
		}
	}
</script>
<style lang="scss">
	.content {
		padding-left: 37rpx;
		padding-right: 41rpx;

		.titles {
			color: #333333;
			font-size: 30rpx;
			font-weight: 900;
			letter-spacing: 5rpx;
			text-align: left;
			margin-top: 35rpx;
		}

		.time {
			color: #999999;
			font-size: 16rpx;
			letter-spacing: 5rpx;
			text-align: right;
			margin-top: 30rpx;
		}
	}

	rich-text {
		display: block;
		font-size: 22rpx;
		color: #333333;
		letter-spacing: 1rpx;
		margin-top: 50rpx;
		.p_class {
			line-height: 46rpx;
			text-indent: 60rpx;
			margin-bottom: 20rpx;
		}

		// image {
		// 	width: rpx;
		// 	height: 171rpx;
		// }
	}
</style>
