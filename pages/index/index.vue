<template>
	<view class="content">
		<video :src="video" poster="https://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqU7H8DJq1*ukHsMwmMxe3*vvurqtJS7hhjfpIdF4qVkbbQddMAA1XcNun*rl*oj8SxpQKwYqflNSD3kwkbFx540!/b&bo=AAXQAgAAAAABB*c!&rf=viewer_4"
		 autoplay controls show-progress object-fit="fill"></video>
		<view class="main_bar">
			<view class="top" v-if="flag">
				<image class="top_img" src="../../static/images/logo.png" mode="widthFix"></image>
				<uni-notice-bar showIcon="true" scrollable="true" single="true" :text="rollContent"></uni-notice-bar>
			</view>
			<view class="top" v-if="!flag">
				<view class="top_images">
					<image class="top_img2" src="../../static/images/logo.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="imput_search">
				<image class="img" src="../../static/images/wx_20200928141523.png" mode="scaleToFill"></image>
				<!-- <image class="img_bar" src="../../static/images/847406b8295b8609067354ca66169f5.png" @click="toChoose" style="height: 68rpx;"></image> -->
				<view class="img_bar" @click="toChoose" style="display: inline-block; background-color: rgb(178,27,32); height: 76rpx; border-radius: 15rpx; color: #FFFFFF;font-size:28rpx;text-align: center; line-height: 76rpx;">
					查看全部一手单
				</view>
				<!-- <image class="jiantou" src="" mode=""></image> -->
				<lv-select class="mSearch" style="position: absolute; top:84rpx; display: flex; justify-content: space-between; left:40rpx; display: inline-block;width: 100rpx;"
				 @handleSearch="handleSearch" @change="change" placeholder="请输入信息" :infoList="infoList" :showValue="showValue"
				 :isShowSelect="false" v-model="searchValue" :loading="loading" type="primary" :uniShadow="true"></lv-select>
			</view>
			<view class="content_bar">
				<image src="http://m.qpic.cn/psc?/V11EtE3S2awPyr/TmEUgtj9EK6.7V8ajmQrED3l.bnRL6WL0YDfWJMX1IjCgDhhyZXEBVIO.5uVJLmNvqA4V*.C3LheVOH634bHdMz6dTqykmF30AI8UJKES1w!/b&bo=xwIzAgAAAAADF8Y!&rf=viewer_4"
				 style="width: 100%; height: 100%;" mode="widthFix"></image>
				<view class="contens">
					<image class="img_left" src="http://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqXiakcKzfT3CsTC0YwGDvzdIA8lN2sOOFOc2vsT1AgWY83Lq38LYMUonwXv2xxWqkDKr8XD6XgjK3mnfF5nsQds!/b&bo=7wGTAAAAAAADB18!&rf=viewer_4"
					 mode="" @click="toRenxun"></image>
					<view class="pic_content" @click="toRenxun">
						查看详情
					</view>
					<!-- <image class="img_right" src="../../static/images/wx_20200928193019.png" @click="towei" mode=""></image> -->
					<view class="img_right" @click="towei">
						<view class="">失信</view>
						<view class="">违约</view>
					</view>
				</view>
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :circular="true" :duration="1000">
					<swiper-item v-for="item in bannerList" :key="item.bannerId" @click="toRendetail(item.companyId)">
						<image :src="item.pictureAddr" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="footer">
				<image class="footer_img" src="http://m.qpic.cn/psc?/V11EtE3S2awPyr/TmEUgtj9EK6.7V8ajmQrEOW2Bib7rmuU9yt3T9tzQ1vW5I8s69x4iIjUEKSFeZS2OUq.JWf2aQ8OSEWsbjZNz474LE*voP9E*awNzvqNRM4!/b&bo=xwJAAgAAAAADF7U!&rf=viewer_4"
				 mode=""></image>
				<image class="footer_one" :src="zhanlv.pictureAddr" mode="scaleToFill" @click="torobt"></image>
				<image class="footer_two" :src="hrimg.pictureAddr" mode="scaleToFill" @click="toadurl"></image>
				<swiper class="bottom_swiper" vertical :autoplay="true" :circular="true" :interval="3000" :duration="1000">
					<swiper-item v-for="item in newList" :key="item.newsId">
						<view class="mation" @click="toNewsdtails"><text>{{item.newsTitle}}</text></view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<pop ref="pop" direction="center" :is_close="true" :is_mask="true" :width="100">
			<view class="" style="display: flex;justify-content: center;align-items: center;">
				<image src="../../static/images/wx_20200928141545.jpg" style="width: 70rpx; height:80rpx;"></image>
			</view>
			<scroll-view scroll-y="true" style="min-height: 300rpx;">
				<view style="text-indent: 20px;text-align:left; font-size: 32rpx;">{{contents}}</view>
			</scroll-view>
		</pop>
	</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import lvSelect from '../../components/lv-select/lv-select'
	import pop from '../../components/ming-pop/ming-pop.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				flag: true,
				bannerList: [], //轮播图数据
				newList: [], //新闻资讯滚动
				rollContent: "", //滚动信息
				hrimg: '',
				zhanlv: '',
				rippleStyle: '',
				falgs: false,
				loading: false,
				showValue: 'name', // 需要显示的数据，必须与infoList中的name对应
				searchValue: '',
				infoList: [],
				video: '',
				contents: '' //首页声明
			}
		},
		onLoad() {
			var that = this
			uni.request({
				url: 'https://ystx.xn--4gqr6isbv1bn21d.com/api/dishonestback/queryWarn',
				method: 'POST',
				success(res) {
					// console.log(res)
					that.contents = res.data.data.introduct
					that.$refs.pop.show();
				}
			})
			this.$refs.pop.show();
			this.getbannerlist()
			this.getnews()
			this.getGun()
			this.getVideo()
		},
		created() {

		},
		onHide() {
			this.getuserInfo()
		},
		methods: {
			containerTap: function(res) { //动画 待加
				console.log("执行一次")
				var that = this
				var x = res.touches[0].pageX;
				var y = res.touches[0].pageY + 85;
				that.rippleStyle = ""
				// setTimeout(function () {
				that.falgs = true
				that.rippleStyle = 'top:' + y + 'px;left:' + x +
					'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'

				setTimeout(function() {
					// that.rippleStyle=""
					that.falgs = false
				}, 350)
				// },0)
			},
			handleSearch() { //去搜索
				if (this.searchValue == "") {
					uni.showToast({
						title: "请输入公司名称",
						icon: 'none'
					})
					return false
				}
				uni.navigateTo({
					url: `../moreChoose/moreChoose?val=${this.searchValue}`
				})
			},
			getbannerlist() { //获取轮播
				var that = this
				uni.request({
					url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/person/queryBanner",
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {},
					success(res) {
						console.log(res)

						if (res.data.status == 200) {
							res.data.data.forEach(item => {
								if (item.bannerType == 1) {
									that.bannerList.push(item)
								} else if (item.bannerType == 2) {
									that.hrimg = item
								} else if (item.bannerType == 3) {
									that.zhanlv = item
								}
							})
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
						}
					},
					fail(eer) {
						console.log(err)
					}
				})
			},
			getVideo() {
				var that = this
				uni.request({
					url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/banner/queryVedio",
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {},
					success(res) {
						console.log("Lubbock")
						console.log(res)
						if (res.data.status == 200) {
							that.video = res.data.data.pictureAddr
						} else {
							uni.showToast({
								title: '请求失败',
								icon: 'none'
							})
						}
					}
				})
			},
			toChoose() { //去更多选择页面
				uni.navigateTo({
					url: "../moreChoose/moreChoose"
				})
				uni.showLoading({
					title: "加载中"
				})
			},
			toRenxun() {
				uni.navigateTo({
					url: "../Renxun/Renxun"
				})
				uni.showLoading({
					title: "加载中"
				})
			},
			toadurl() {
				uni.navigateTo({
					url: "../advertisement/advertisement"
				})
			},
			getuserInfo() { //授权
				var flag = uni.getStorageSync('flag')
				var userInfo = uni.getStorageSync('userInfo')
				wx.getSetting({
					success: res => {
						if (res.authSetting['scope.userInfo']) {
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
							if (!flag && !userInfo) {
								uni.redirectTo({
									url: '../login/login'
								})
							}
							if (!flag && userInfo) {
								uni.redirectTo({
									url: '../getPhone/getPhone'
								})
							}
						} else {
							console.log("未授权")
							// 未授权，跳转到授权页面							
							wx.redirectTo({
								url: "../login/login"
							})
						}
					}
				})
			},
			torobt() {
				uni.request({
					url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/client/query",
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {},
					success(res) {
						if (res.data.status == 200) {
							uni.navigateTo({
								url: `../robt/robt?msg=${res.data.data[0].sendMessage}`
							})
						}
					}
				})
			},
			getnews() { //新闻资讯
				var that = this
				uni.request({
					url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/news/query",
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {},
					success(res) {
						if (res.data.status == 200) {
							var list = []
							for (var i = 0; i <= 4; i++) {
								if (res.data.data.list[i] != null) {
									list.push(res.data.data.list[i])
								}
							}
							that.newList = list
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
						}
					}
				})
			},
			getGun() {
				var that = this
				uni.showLoading({
					title: "加载中"
				})
				uni.request({
					url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/roll/query",
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {},
					success(res) {
						console.log(res)
						console.log("滚动")
						uni.hideLoading()
						if (res.data.status == 200) {
							if (res.data.data.length !== 0) {
								that.rollContent = res.data.data[0].rollContent
							} else {
								that.flag = false
							}
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
						}
					}
				})
			},
			towei() {
				uni.navigateTo({
					url: '../Dishonest/Dishonest'
				})
			},
			toNewsdtails() {
				uni.navigateTo({
					url: '../newlist/newlist'
				})
			},
			toRendetail(companyId) {

				uni.navigateTo({
					url: `../detail/detail?companyId=${companyId}`
				})
			}
		},
		components: {
			pop,
			uniNoticeBar,
			lvSelect,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	video {
		width: 100%;
		height: 431rpx;
	}

	.top {
		padding: 0 22rpx;
		overflow: hidden;
	}

	.main_bar {
		width: 100%;
		padding-top: 19rpx;
		padding-left: 22rpx;
		padding-right: 22rpx;
	}

	.imput_search {
		height: 224rpx;
		width: 711rpx;
		position: relative;
		margin: 0 auto;
		margin-top: 19rpx;

	}

	.top_img {
		height: 110rpx;
		width: 85rpx;
		float: left;
		margin-right: 12rpx;
	}

	.top_images {
		height: 110rpx;
		width: 85rpx;
		margin: 0 auto
	}

	.top_img2 {
		height: 100%;
		width: 100% // margin: 0 auto;
	}

	.img {
		height: 100%;
		width: 100%;
	}

	.img_bar {
		height: 58rpx;
		width: 209rpx;
		position: absolute;
		top: 94rpx;
		right: 21rpx;
	}

	.content_bar {
		position: relative;
		height: 563rpx;
		width: 711rpx;
		margin: 0 auto;
		margin-top: 12rpx;
	}

	.contens {
		position: absolute;
		top: 121rpx;
		left: 56rpx;
	}

	.img_left {
		width: 484rpx;
		height: 136rpx;
		margin-right: 9rpx;
	}

	.img_right {
		font-size: 36rpx;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 136rpx;
		width: 107rpx;
		float: right;
		background-size: 100% 100%;
		background-image: url(data:image/png;base64,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);
	}

	swiper {
		width: 600rpx;
		height: 221rpx;
		position: absolute;
		top: 288rpx;
		left: 56rpx;

		swiper-item {
			width: 100%;
			height: 100%;

			image {
				height: 100%;
				width: 100%;
			}
		}
	}

	.pic_content {
		height: 43rpx;
		width: 145rpx;
		position: absolute;
		top: 84rpx;
		line-height: 43rpx;
		left: 170rpx;
		border-radius: 20rpx;
		background-size: 100% 100%;
		text-align: center;
		font-size: 12px;
		color: #FFFFFF;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJEAAAAkCAYAAACJ39jlAAAE5ElEQVR4nO2c32/bVBTHv7ZrN2l+NB1sRUJNRgAtJQxeqARSH0DlBRHeEGzay6RlD4j9eKgm/gWgmmAMJGCaNGlMBQkhIfZIhRAVe6u00q5sg2hpNYmWrU3TpEnjOObBvsn1jZOGsdpOuR/pKrZ1HZ0rf3Wuz/U5V0DnCDbHdtc43YFuc2x3bVt6OuhDC4Y0kTm3ExXHu9CioVuNOmb7tqSdiGhhENFI5jH5FWEVlN39HG/AioEWDmkac15rc3+dViJivY5k9qWbBKuYuDfqDmgvRItHA1BlGhGV3XRXx05EtHhEs48MQDGbTP3SQrLzRhxvQnshIiDVbBWqqTDERHulJiGxImK9DxFMLwAfAN/jj/rCJ9/c/9Jz8dAre8LKs35FHJQkIfBQh8hxBE3Ti6VKbXk1X5mbzWz8dP7bO9fu3ivnAZTNtoWGmIAWQmKjK1ZAvQD8APoGQnLo7LvDbz3/VDjdK4t7dmxkHNdQq3ruRnbj8vinC5f/Wt1aB7AJoARDTCqs01tdSKyIiICI9+kDEEinhpLpVPTDoF+KOzIajqsUSlrm4tXF9y5cXZoHUIAhJuKV2PckSOYv8UK0B+oDEDxzOP5iOhX9wqeIjzk3DI6bKLI4MJKIvDYQkuemZ9dWYI3W2CUAi4hIBKbAmMKCx1NDB9Op6Jc9khB0bAQcTyCKQm9yf+jVqqZfm7mVX4U1/LcIiY6qSCSmAPDtjSjhY6noB/yl+f+LJAmB429E398bUcIwAisFhkYs0bho9m8S0blTyaP8HYgT8Enxc6eSR2EvIgBWEdWns9igPzwcCx5x1lyOVxmOBY/EBv1hNEQkgRFR08Li+KH4mNwjRFywl+NB5B4hcuZwfAxG0EU8Ud0bsdOZBEA+EA2MumArx8M8PRQYReMrRdN0xi4ySv0BOeGCnRwPEwnKCbT4zEV7ovq05lfEfS7YyfEwPlnchxZZGyLVr/4Vnof1HBZTE7aZGrSI6p/7NU3fdMIwTvdgasI2JUSkLtbzS8pqbcU58zjdQFmt/Y02K9ZNuSW5grrggp0cD5MrqDfQyD2yCIn2RERE6u2l4rQLdnI8jKkJNh0EQMMTETdVBaBOTGam1Kqec8FWjgdRq/r6xGRmCs2Zjk2eiOTYVrLLpfxCtnDFBXs5HuTmUuGr7HIpDyOfiOReWzwR0PBGVbNj+fQn85cKJS3jsL0cj1Esa5mTH89fgpEuS0Rkm5QGMPVlm2UNAvDbSCLyuigKikM2czyEpunFz7/Pnvhldm0RRnZjGTbvRXRSGo0AADO38rmgv+d68onQy5Io+JwxneMF1Kqeu/Lj3dPnv8vOACii2RPVkWzuJ+gA8Ovc2sr9vPrzC4n+EUUWH9kpozneoVDSbk9M/vnOhR+WZmEIqIRG1ce2ifptqz0+OvHM2wefDB3j1R67ky21tnr9j/zF8c8WvlnbUDfwANUe5Lxt3Vls0B8ePxQfOxANjPYH5IRZd9a3w+Pj7ACapm+WKrXl9aL6+83F4vTZrzNTZhRmV3dmKyDAvmJ1uwpYUv1ql6DEK2C7A7YOv4rOKmCbBAS0fui8Fn/38qC1+LYCAto/cHZXELrRu4Ow28t08t8c52m1KwhZaG61K0jbzRyAzh40359o99HJ/kTbiofwbx463yltd/HQdkrjcP4z/wC1jt4mUQqP5gAAAABJRU5ErkJggg==);
	}

	.footer {
		width: 711rpx;
		height: 576rpx;
		margin: 0 auto;
		margin-top: 24rpx;
		position: relative;

		.footer_img {
			z-index: -1;
			height: 100%;
			width: 100%;
		}

		.footer_one {
			width: 600rpx;
			height: 107rpx;
			position: absolute;
			top: 91rpx;
			left: 56rpx;
		}

		.footer_two {
			width: 600rpx;
			height: 107rpx;
			position: absolute;
			top: 272rpx;
			left: 56rpx;
		}
	}


	.mation {
		line-height: 63rpx;
		font-size: 28rpx;
		text-align: center;
	}

	.bottom_swiper {
		position: absolute;
		top: 473rpx;
		left: 56rpx;
		width: 600rpx !important;
		height: 63rpx !important;
		background-color: #D9BB92;
		border-radius: 20rpx;
		font-size: 18rpx;
		font-family: SourceHanSansCN-Regular;
		color: #FFFCFE;
		letter-spacing: 4rpx;
		height: 100%;
		width: 100%;
		background-color: #D9BB92;
	}

	.jiantou {
		z-index: 9999999;
		height: 100rpx;
		width: 100rpx;
		position: absolute;
		top: -40rpx;
		right: 80rpx;
		transform: rotate(110deg);
	}

	.tanchu_img {
		width: 433rpx;
		height: 123rpx;
		z-index: -1;
	}

	.tanchu_bar {
		margin-left: 20%;
		position: relative;
	}

	.close {
		position: absolute;
		left: 48%;
		top: 20%;
		color: #ffffff;
		z-index: 999;
	}
</style>
