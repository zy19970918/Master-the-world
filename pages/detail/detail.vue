<template>
	<view class="content">
		<view class="topbar">
			<view class="title" style="font-size: 38rpx; width: auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
				{{detaileInfo.companyName}}
			</view>
			<view class="text_detail">
				<view class=""><text style="color:#D24C1F;">代理费:</text><text>{{detaileInfo.agencyFee}}</text></view>
				<view class=""><text style="color:#D24C1F;">管理费方式:</text><text v-if="detaileInfo.manageFee==1">长期</text><text v-if="detaileInfo.manageFeeOne==1"
					 style="margin-left: 15rpx;">一次性</text></view>
			</view>
			<view class="video">
				<image src="../../static/images/shipin.png" mode=""></image>
				<video :src="detaileInfo.views" poster="https://pic.raolibao.com/881/block/881_global_banner02/b144467428121cac9109b1bc560c8192c0100475.jpg?x-oss-process=image/resize,m_fill,limit_0,w_1188,h_488"
				 autoplay controls show-progress object-fit="fill"></video>
			</view>
			<view class="title setitle">
				<image class="imge_bar" src="../../static/images/jibenxinxi_.png" mode=""></image>
			</view>
			<view class="content_bar">
				<image src="../../static/images/shangkuang.png" mode=""></image>
				<view class="main">
					<view class="main_left">
						<!-- 	<view class="">男女比例:<text>男女不限</text></view> -->
						<view class=""><text style="color:#D24C1F;">班\r\t\r\t\r\t\r\t\r\t\r\t次:</text><text v-if="detaileInfo.workType==1">两班倒</text>
							<text style="margin-left: 15rpx;" v-if="detaileInfo.workTypeDay==1">长白班</text></view>
						<!-- <view class="">食宿费用:<text>500元/月</text></view> -->
						<view class=""><text style="color: #D24C1F;">工期要求:</text><text v-if="detaileInfo.workRequire==1">短期工</text><text
							 v-if="detaileInfo.workRequireLong==1" style=" margin-left: 10rpx;">长期工</text></view>
						<view class=""><text style="color:#D24C1F;">少数名族:</text><text v-if="detaileInfo.nationalsNot==1">不接受</text><text
							 style="" v-if="detaileInfo.nationals==1">可接受</text></view>
						<view class=""><text style="color:#D24C1F;">工\r\t\r\t\r\t\r\t\r\t\r\t价:</text><text>{{detaileInfo.wageFee}}</text></view>
						<view class=""><text><text style="color:#D24C1F;">食\r\t\r\t\r\t\r\t\r\t\r\t宿:</text></text><text>{{detaileInfo.live}}</text></view>
					</view>
					<view class="main_right">
						<view class="">
							<view class=""><text style="color:#D24C1F;">年\r\t\r\t\r\t\r\t\r\t\r\t龄:</text><text class="">{{detaileInfo.ageTwo}}岁</text></view>
						</view>
						<view class=""><text style="color:#D24C1F;">文化程度:</text><text>{{detaileInfo.agriculture}}</text></view>
						<!-- <view class="">包&ensp;食&ensp;宿:<text>外宿食宿</text></view> -->
						<view class=""><text><text style="color:#D24C1F;">夫\r\t\r\t妻\r\t\r\t房:</text></text><text v-if="detaileInfo.spouseHouse==1">无</text><text
							 v-if="detaileInfo.spouseHouseHusband==1" style="margin-left: 15rpx;">有</text></view>
						<view class=""><text><text style="color:#D24C1F;">学\r\t\r\t生\r\t\r\t工:</text></text><text v-if="detaileInfo.studentWorker==1">接受</text><text
							 v-if="detaileInfo.studentNotWorker==1" style="margin-left: 15rpx;">不接受</text></view>
					</view>
				</view>
				<image class="btn_img" src="../../static/images/xiakuang.png" mode=""></image>
				<view class="bottom_txt">
					*本厂由<text style="font-weight: 900; font-size: 36rpx;">({{detaileInfo.shortName}})</text>所签一手单，详情请咨询并保留聊天记录。
				</view>
				<view class="title titles" @click="tourldetail(detaileInfo.resourceId)" style="margin-top: 20rpx;">
					<image class="image_add" src="../../static/images/wx_20200831162034.png" mode="aspectFit" style=""></image>
				</view>
				<view class="title titles one" style="margin-left: 250rpx;">
					<image class="imge_bar" src="../../static/images/gongzuohuangjing.png" mode=""></image>
				</view>
				<swiper v-if="detaileInfo.imgAddrs.length<=1" class="swiper" :indicator-dots="false" acceleration
				 :display-multiple-items="1" :circular="true" :autoplay="true" :interval="2000" circular :duration="8000">
					<swiper-item class="swiper_item" v-for="(item,index) in detaileInfo.imgAddrs" :key="index">
						<image class="swiper_img" :src="item" mode="" @click="bigimg(detaileInfo.imgAddrs,item)"></image>
					</swiper-item>

				</swiper>
				<swiper v-if="detaileInfo.imgAddrs.length>1" class="swiper" :indicator-dots="false" acceleration
				 :display-multiple-items="2" :circular="true" :autoplay="true" :interval="2000" circular :duration="8000">
					<swiper-item class="swiper_item" v-for="(item,index) in detaileInfo.imgAddrs" :key="index">
						<image class="swiper_img" :src="item" mode="" @click="bigimg(detaileInfo.imgAddrs,item)"></image>
					</swiper-item>

				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperlist: [{
						url: 'https://pic.raolibao.com/881/portal/attachment/35057/2019/12/20/0eed129ecae82f77eb84fe5a5ce573787b222c31.jpg?x-oss-process=image/resize,m_fill,limit_0,w_500,h_315'
					},
					{
						url: 'https://pic.raolibao.com/881/portal/attachment/35057/2019/12/20/4f3c7aabf068ba17fcab87c6c0375122e07b73c9.jpg?x-oss-process=image/resize,m_fill,limit_0,w_500,h_315'
					},
					{
						url: 'https://pic.raolibao.com/881/portal/attachment/35057/2019/12/20/0eed129ecae82f77eb84fe5a5ce573787b222c31.jpg?x-oss-process=image/resize,m_fill,limit_0,w_500,h_315'
					},
					{
						url: 'https://pic.raolibao.com/881/portal/attachment/35057/2019/12/20/0eed129ecae82f77eb84fe5a5ce573787b222c31.jpg?x-oss-process=image/resize,m_fill,limit_0,w_500,h_315'
					},
				],
				detaileInfo: {},
				companyId: '' //轮播id
			}
		},
		methods: {
			bigimg(item, items) {
				const str = items.toString()
				wx.previewImage({
					current: str, // 当前显示图片的http链接
					urls: item // 需要预览的图片http链接列表
				})
			},
			tourldetail(resourceId) {
				uni.navigateTo({
					url: `../Renxundetail/Renxundetail?resourceId=${resourceId}`
				})
			},
			getsinfo() { //工厂获取工厂信息
				var that = this
				uni.showLoading({
					title: "加载中"
				})
				uni.request({
					url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/company/queryCompanyDeatil",
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {
						companyId: that.companyId
					},
					success(res) {
						if (res.data.status == 200) {
							uni.hideLoading()
							that.detaileInfo = res.data.data[0]
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
		onLoad(options) {
			console.log(options)
			if (options.item) {
				this.companyId = options.item
				this.getsinfo()
			}
			if (options.companyId) {
				this.companyId = options.companyId
				this.getsinfo()
			}
		}
	}
</script>
<style scoped lang="scss">
	.content {
		padding-top: 20rpx;
		padding-left: 18rpx;
		padding-right: 20rpx;
	}

	.title {
		font-weight: 900;
		height: 72rpx;
		width: 226rpx;
		margin: 0 auto;
		text-align: center;
		line-height: 72rpx;
		background-size: 35% 100%;
		background-repeat: no-repeat;
		background-position-x: center;
		background-image: url(data:image/png;base64,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);
	}

	.setitle {
		background: none;
		margin-top: 44rpx;
	}

	.title_img {
		height: 100%;
		width: 100%;
	}

	.text_detail {
		font-size: 24rpx;
		color: #666666;
		font-weight: 900;
		margin-top: 6rpx;
		display: flex;
		justify-content: space-around;
	}

	.imge_bar {
		height: 100%;
		width: 100%;
	}

	.video {
		position: relative;
		margin-top: 25rpx;
		height: 450rpx;
		width: 710rpx;

		image {
			height: 100%;
			width: 100%;
		}

		video {
			position: absolute;
			top: 0;
			left: 0;
			width: 600rpx;
			height: 336rpx;
			top: 50rpx;
			left: 60rpx;
		}
	}

	.content_bar {
		font-size: 24rpx;
		font-weight: 900;

		image {
			width: 100%;
			height: 154rpx;
		}
	}

	.main_left {
		float: left;

		view {
			margin-top: 36rpx;
			color: #666666;
		}
	}

	.main_right {
		float: right;
		margin-right: 10rpx;

		view {
			margin-top: 36rpx;
			color: #666666;
			text-align: left;
		}
	}

	.main {
		padding-left: 60rpx;
		padding-right: 41rpx;
		overflow: hidden;
		margin-top: -112rpx;
	}

	.btn_img {
		margin-top: -86rpx;
	}

	.bottom_txt {
		color: #CA0000;
		font-size: 22rpx;
		text-align: center;
		word-break: keep-all;
		/* 不换行 */
		white-space: nowrap;
		/* 不换行 */
		overflow: hidden;
		/* 内容超出宽度时隐藏超出部分的内容 */
		text-overflow: ellipsis
	}

	.titles {
		height: 96rpx;
		width: 259rpx;
		background: none;

		image {
			height: 100%;
			width: 100%;
		}
	}

	.one {
		margin-top: 26rpx;
	}

	.swiper_img {
		width: 280rpx !important;
		height: 171rpx;
		margin: 0 35rpx;
	}

	.swiper {
		height: 171rpx;
	}

	.image_add {
		height: 48rpx !important;
		width: 176rpx !important;
		padding: 8rpx !important;
		box-sizing: content-box;
		border-radius: 16rpx !important;
		box-shadow: inset 2rpx 2rpx 7rpx 0px rgba(0, 0, 0, 0.6),
			inset -2rpx -2rpx 7rpx 0px rgba(255, 255, 255, 1),
			-2rpx -2rpx 7rpx 0px rgba(255, 255, 255, 1),
			2px 2px 7rpx 0px rgba(0, 0, 0, 0.6) !important;
	}
</style>
