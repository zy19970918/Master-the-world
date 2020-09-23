<template>
	<view class="content">
		<video :src="video" poster="https://pic.raolibao.com/881/block/881_global_banner02/b144467428121cac9109b1bc560c8192c0100475.jpg?x-oss-process=image/resize,m_fill,limit_0,w_1188,h_488"
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
				<image class="img" src="../../static/images/kuangjiabeijing.png" mode="scaleToFill"></image>
				<image class="img_bar" src="../../static/images/wx_20200901175506.png" @click="toChoose" mode="widthFix"></image>
				<!-- <image class="jiantou" src="" mode=""></image> -->
				<lv-select class="mSearch" style="position: absolute; top:88rpx; display: flex; justify-content: space-between; left: 140rpx;"
				 @handleSearch="handleSearch" @change="change" placeholder="请输入信息" :infoList="infoList" :showValue="showValue"
				 :isShowSelect="false" v-model="searchValue" :loading="loading" type="primary" :uniShadow="true"></lv-select>
			</view>
			<view class="content_bar">
				<image src="http://m.qpic.cn/psc?/V11EtE3S2awPyr/TmEUgtj9EK6.7V8ajmQrED3l.bnRL6WL0YDfWJMX1IjCgDhhyZXEBVIO.5uVJLmNvqA4V*.C3LheVOH634bHdMz6dTqykmF30AI8UJKES1w!/b&bo=xwIzAgAAAAADF8Y!&rf=viewer_4"
				 style="width: 100%; height: 100%;" mode="widthFix"></image>
				<view class="contens">
					<image class="img_left" src="http://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqXiakcKzfT3CsTC0YwGDvzdIA8lN2sOOFOc2vsT1AgWY83Lq38LYMUonwXv2xxWqkDKr8XD6XgjK3mnfF5nsQds!/b&bo=7wGTAAAAAAADB18!&rf=viewer_4" mode="" @click="toRenxun"></image>
					<view class="pic_content" @click="toRenxun">
						查看详情
					</view>
					<image class="img_right" src="../../static/images/weiyue.png" @click="towei" mode=""></image>
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
	</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import lvSelect from '../../components/lv-select/lv-select'
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
				video: ''
			}
		},
		onLoad() {
			this.getuserInfo()
			this.getbannerlist()
			this.getnews()
			this.getGun()
			this.getVideo()
		},
		created() {

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
					url: "http://www.35logo.cn:9999/person/queryBanner",
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
					url: "http://118.178.89.161:9999/banner/queryVedio",
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
			// login() {
			// 	var that = this
			// 	wx.login({
			// 		success(res) {
			// 			const code = res.code
			// 			wx.request({
			// 				method: 'GET',
			// 				url: "https://api.weixin.qq.com/sns/jscode2session",
			// 				data: {
			// 					appid: 'wxb31c921feae5104b',
			// 					secret: '3d5c7804f02111884dec198030d4c394',
			// 					js_code: code,
			// 					grant_type: 'authorization_code'
			// 				},
			// 				success(res) {
			// 					console.log(res)
			// 					console.log('appid')
			// 					uni.setStorageSync("openid", res.data.openid)
			// 					that.getuserInfo()
			// 				}
			// 			})
			// 		}
			// 	})
			// },
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
					url: "http://www.35logo.cn:9999/client/query",
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
					url: "http://www.35logo.cn:9999/news/query",
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
					url: "http://www.35logo.cn:9999/roll/query",
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
		top: 38rpx;
		right: 21rpx;
		// border-radius: 16rpx;
		// box-shadow: inset 2rpx 2rpx 7rpx 0px rgba(0, 0, 0, 0.6),
		// 			inset -2rpx -2rpx 7rpx 0px rgba(255,255, 255, 1),
		// 			-2rpx -2rpx 7rpx 0px rgba(255,255, 255, 1),
		// 			2px 2px 7rpx 0px rgba(0, 0, 0, 0.6);
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
		height: 136rpx;
		width: 107rpx;
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
		z-index: 9999;
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
		letter-spacing:4rpx;
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
