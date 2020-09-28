<template>
	<view>
		<view class="content">
			<view class="conytent_bar" v-for="(item,index) in Renxunlist" :key="index">
				<image src="/static/images/kuangjia_111.png" mode="aspectFit"></image>
				<image class="portrait" :src="item.imgAddr" mode=""></image>
				<image class="portraitWrapper" src="/static/images/moquan.png" mode="aspectFit"></image>
				<view class="conten_center">
					<view class="top_text">{{item.personName}}</view>
					<view class="text" style="margin-top: 4rpx;">总部:<text class="text_defult">{{item.headCompany}}</text></view>
					<view class="text" style="white-space: nowrap; position: relative;"><text style="width: max-content;display: inline-block;">主营:</text>
						<text class="text_defult" style=" width: 200rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block; position: absolute;bottom: 0;">{{item.business}}</text></view>
					<view class="text" style="font-size: 20rpx;letter-spacing: 0; white-space: nowrap;">风控金:<text class="text_defult">{{item.money}}</text></view>
					<view class="imgs" style="width: 240rpx;transform: scale(.6);margin-left: -10rpx; margin-top: 8rpx;" @click="toRenxundetail(item.resourceId)">
						<image src="../../static/images/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<image style="position: absolute; width: 113rpx;right: 42rpx;" src="../../static/images/yishourenzi.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Renxunlist: [],
			}
		},
		methods: {
			add() {
				uni.openLocation({
					longitude: 118.7787,
					latitude: 31.99226
				})
			},
			toRenxundetail(resourceId) {
				uni.navigateTo({
					url: `../Renxundetail/Renxundetail?resourceId=${resourceId}`
				})
			},
			getRen() {
				var that = this
				uni.request({
					url: "https://ystx.劳务一手单.com/api/person/queryResource", //人资列表
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {
						"pageNum": "1",
						"pageSize": "10"
					},
					success(res) {
						if (res.data.status == 200) {
							uni.hideLoading()
							var arry = []
							// console.log(res.data.data)
							res.data.data.forEach(item => {
								if (item.isResources == 1) {
									arry.push(item)
								}
							})
							that.Renxunlist = arry
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		},
		onLoad() {
			this.getRen()
			uni.hideLoading()
		}
	}
</script>
<style scoped lang="scss">
	* {
		margin: 0;
		padding: 0;
	}

	.over_dot {
		display: inline-block;
		width: 192rpx !important;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.content {
		padding-top: 21rpx;
		padding-left: 20rpx;
		padding-right: 25rpx;
	}

	.top_left {
		float: left;
		margin-left: 24rpx;
		display: flex;
		align-items: center;
	}

	.left_bar {
		float: right;
		margin-right: 149rpx;
	}

	.content_top {
		overflow: hidden;
	}

	.top_images {
		height: 80rpx;
		width: 84rpx;
	}

	.top_leftimg {
		width: 158rpx;
		height: 38rpx;
		margin-left: -44rpx;
	}

	.conytent_bar:nth-child(1) {
		margin-top: 0 !important;
	}

	.conytent_bar {
		position: relative;
		margin-top: -16rpx;
		width: 705rpx;
		height: 409rpx;

		image {
			height: 100%;
			width: 100%;
		}
	}

	.conten_center {
		position: absolute;
		top: 73rpx;
		left: 270rpx;
		min-height: 260rpx;
		width: 254rpx;

	}

	.portraitWrapper {
		position: absolute;
		bottom: 116rpx;
		left: 71rpx;
		height: 181rpx !important;
		width: 184rpx !important;
		transform: scale(1.1);
	}

	.portrait {
		height: 181rpx !important;
		width: 184rpx !important;
		border-radius: 50%;
		position: absolute;
		bottom: 115rpx;
		left: 83rpx;
		z-index: 999999999;
	}

	.top_text {
		width: 226rpx;
		height: 64rpx;
		line-height: 64rpx;
		font-size: 36rpx;
		letter-spacing: 4rpx;
		text-indent: 10rpx;
		color: #333333;
		font-weight: 900;
		text-align: center;
		word-break: keep-all;
		/* 不换行 */
		white-space: nowrap;
		/* 不换行 */
		overflow: hidden;
		/* 内容超出宽度时隐藏超出部分的内容 */
		text-overflow: ellipsis;
		background-image: url(../../static/images/title.png);
		background-size: 100% 100%;
	}

	.text {
		font-size: 24rpx;
		color: #D24C1F;
		margin-top: 8rpx;
		margin-left: 2rpx;
		font-weight: 600;
		letter-spacing: 2rpx;
	}

	.text_defult {
		color: #666666;
		letter-spacing: 0;
		margin-left: 8rpx;
	}

	.bottom_text {
		color: #ffffff;
		font-size: 24rpx;
		margin-top: 17rpx;
		margin-left: 56rpx;
	}

	.tips {
		font-size: 18rpx;
		color: #CA0000;
		font-weight: 600;
		text-align: right;
	}

	.logo {
		height: 18rpx !important;
		width: 71rpx !important;
		position: absolute;
		bottom: 88rpx;
		right: 99rpx;
	}

	.bottom_txt {
		font-size: 14rpx;
		display: inline-block;
		color: #CA0000;
		font-weight: 900;
		position: absolute;
		right: 122rpx;
		bottom: 69rpx;
	}

	.space {
		float: right;
		width: 210rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-right: 26rpx;
	}

	.imgs {
		width: 199rpx;
		height: 61rpx;
		margin-left: 24rpx;
		margin-top: 6rpx;

		image {
			padding: 8rpx;
			height: 100%;
			width: 100%;
			box-sizing: content-box;
			border-radius: 16rpx;
			box-shadow: inset 2rpx 2rpx 7rpx 0px rgba(0, 0, 0, 0.6),
				inset -2rpx -2rpx 7rpx 0px rgba(255, 255, 255, 1),
				-2rpx -2rpx 7rpx 0px rgba(255, 255, 255, 1),
				2px 2px 7rpx 0px rgba(0, 0, 0, 0.6);
		}
	}

	.laowu {
		position: absolute;
		width: 113rpx;
	}
</style>
