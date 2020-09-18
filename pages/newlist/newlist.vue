<template>
	<view>
		<view class="content">
			<view class="top_bar">
				<image src="../../static/images/shangkuang.png" mode=""></image>
			</view>
			<view class="main">
				<view class="main_top">
					<image src="../../static/images/xinwen_.png" mode=""></image>
				</view>
				<view class="main_content" v-for="(item,index) in newList" @click="toNewdetail(item.newsId)">
					<view class="top_title">
						{{item.newsTitle}}
					</view>
					<view class="time">
						2019-2-30
					</view>
				</view>
			</view>
			<view class="bottom_bar">
				<image src="../../static/images/xiakuang.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newList:[] //新闻列表
			}
		},
		methods: {
			toNewdetail(id) {
				uni.navigateTo({
					url:`../newdetails/newdetails?id=${id}`
				})
			},
			getneslist() {
					var that = this
					uni.request({
						url: "http://www.35logo.cn:9999/news/query",
						method: 'POST',
						header: {
							"Content-Type": "application/json"
						},
						data: {},
						success(res) {
							if (res.data.status == 200) {
								that.newList =res.data.data.list
							} else {
								uni.showToast({
									title: res.data.message,
									icon: 'none'
								})
							}
						}
					})
				},
		},
		created() {
			this.getneslist()
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding-left: 25rpx;
		padding-right: 25rpx;

		.top_bar {
			width: 705rpx;
			height: 154rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.bottom_bar {
			width: 705rpx;
			height: 154rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	   .main .main_content:first-child {
				margin-top: 40rpx !important;
		}
		.main {
			.main_top {
				display: flex;
				justify-items: center;
				justify-content: center;
				margin-top: -68rpx;

				image {
					height: 46rpx;
					width: 196rpx;
				}
			}
		}
	}
	.main_content {
		margin: 0 auto;
		margin-top: 20rpx;
		width: 570rpx;
		border-radius: 15rpx;
		// padding: 10rpx 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		border-radius: 25rpx;
		background-color: #FFFFFF;
		box-sizing: content-box;
		box-shadow: darkgrey 0px 0px 30px 5px;

		.top_title {
			width: 100%;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			font-weight: 900;
			font-size: 32rpx;
			display: inline-block;
			height: 100%;
			letter-spacing:4rpx;
			line-height: 65rpx;
		}
	}

	.content_text {
		margin-top: 10rpx;
		text-indent: 60rpx;
		text-align: left;
		color: #666666;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		font-size: 24rpx;
	}
	.time{
		text-align: right;
		padding-bottom: 20rpx;
		font-size: 28rpx;
		color: #666666;
	}
</style>
