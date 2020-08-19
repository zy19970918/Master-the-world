<template>
	<view>
		<view class="auth">
			<image src="http://img03.sogoucdn.com/v2/thumb/resize/w/100/h/100?appid=100520147&url=http%3A%2F%2Fdl.app.sogou.com%2Fpc_logo%2F4669602030091557924.png"
			 class="img" mode="aspectFill"></image>
			<!-- 		<view class="title">微信授权页面</view> -->
			<view class="describe">点击下方按钮进行个人信息授权</view>
			<button class="btn" open-type='getUserInfo' wx:if="canIUse" @getuserinfo='bindGetUserInfo'>点击个人信息授权</button>
		</view>
	</view>
</template>
<script>
	var appId = 'wxb31c921feae5104b'
	export default {
		data() {
			return {
				canIUse: wx.canIUse('button.open-type.getUserInfo')
			}
		},
		methods: {
			bindGetUserInfo() {
				var that = this
				var flag = uni.getStorageSync('flag')
				wx.login({
					success(res) {
						console.log(res)
						const code = res.code
						wx.request({
							url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=3d5c7804f02111884dec198030d4c394&js_code=${code}&grant_type=authorization_code`,
							method: 'GET',
							success(res) {
								console.log(res)
								uni.setStorageSync("session_key", res.data.session_key)
								wx.getSetting({
									success: (res) => {
										console.log("是否执行")
										console.log(res)
										if (res.authSetting['scope.userInfo'] && flag) {
											wx.getUserInfo({
												success: res => {
													console.log(res)
													console.log("地址")
													// 可以将 res 发送给后台解码出 unionId
													wx.setStorageSync('userInfo', res.userInfo)
													// this.globalData.userInfo = res.userInfo
													// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
													// 所以此处加入 callback 以防止这种情况
													if (that.userInfoReadyCallback) {
														that.userInfoReadyCallback(res)
													}
												}
											})
											wx.reLaunch({
												url: '../index/index',
											})
										} else if(res.authSetting['scope.userInfo'] && !flag) {
											wx.getUserInfo({
												success: res => {
													console.log(res)
													console.log("地址")
													// 可以将 res 发送给后台解码出 unionId
													wx.setStorageSync('userInfo', res.userInfo)
													// this.globalData.userInfo = res.userInfo
													// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
													// 所以此处加入 callback 以防止这种情况
													if (that.userInfoReadyCallback) {
														that.userInfoReadyCallback(res)
													}
												}
											})
											wx.reLaunch({
												url: '../getPhone/getPhone',
											})
										}
									}
								})
							}
						})
					}
				})
			}
		}
	}
</script>
<style>
	page {
		height: 100%;
		display: table;
	}
</style>
<style scoped lang="scss">
	/* 开始 */
	.auth {
		margin-top: 0;
		text-align: center;
		display: table-cell;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		padding: 100rpx;
		vertical-align: middle;
	}

	.img {
		margin: 0 0 60rpx;
		display: inline-block;
		width: 200rpx;
		height: 200rpx;
		line-height: 0;
	}

	.title {
		display: inline-block;
		width: 100%;
		margin: 0 0 60rpx;
	}

	.describe {
		color: #a7aaa9;
		font-size: 26rpx;
		margin: 0 0 60rpx;
		border-radius: 50%;
		text-align: center;
		display: inline-block;
		width: 100%;
	}

	.btn {
		padding: 0 60rpx;
		background-color: #19be6b;
		margin: 20rpx 0 200rpx;
		text-align: center;
		vertical-align: middle;
		touch-action: manipulation;
		cursor: pointer;
		background-image: none;
		white-space: nowrap;
		user-select: none;
		font-size: 14px;
		border: 0 !important;
		position: relative;
		text-decoration: none;
		height: 44px;
		line-height: 44px;
		box-shadow: inset 0 0 0 1px #19be6b;
		background: #fff !important;
		color: #19be6b !important;
		display: inline-block;
		border-radius: 10rpx;
	}
</style>
