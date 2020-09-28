<template>
	<view class="container">
		<view v-if="img_chat" class="wechat">
			<image class="felx_img" :src="img_chat" mode=""></image>
		<view class="text_bar" @click="tochengxu">
			点击进入微信小程序
		</view>
		</view>
	<view class="" style="text-align: center;font-size: 36rpx; color: rgb(96,141,250); font-weight: 600; margin-top: 30rpx;" @click="towabview">
		点击跳转{{name}}官网
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				link_url:'',//跳转的网页，
				img_chat:'',//弹出的二维码
				name:''
			}
		},
		methods: {
			towabview() {
				uni.navigateTo({
					url:`../web/web?link_url=${this.link_url}`
				})
			},
			tochengxu() {
				wx.navigateToMiniProgram({
					appId:'wxd26f46560a42f999'
				})
			}
		},
		onLoad(options) {
			console.log(options)
				this.img_chat=options.img_chat
				this.link_url=options.link_add
			    this.name=options.cooperationName
		}
	}
</script>

<style>
	.felx_img{
		height: 400rpx;
		width: 400rpx;
		vertical-align: center;
	}
	.wechat{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 50%;
	}
	.text_bar{
		font-size: 36rpx;
		font-weight: 900;
		margin-top: 20rpx;
		color: red;
	}
</style>
