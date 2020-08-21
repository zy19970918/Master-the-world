<template>
	<view class="container">
		<view v-if="img_chat" class="wechat">
			<image class="felx_img" :src="img_chat" mode=""></image>
		<view class="text_bar">
			扫码进入微信小程序
		</view>
		</view>
	<view v-if="link_url" class="">
		<web-view :src="link_url"></web-view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				link_url:'',//跳转的网页，
				img_chat:''//弹出的二维码
			}
		},
		methods: {
			
		},
		onLoad(options) {
			if(options.link_add&&options.img_chat) {
				this.img_chat=options.img_chat
					console.log("执行")
			}
			if(options.link_add&&!options.img_chat) {
				this.link_url=options.link_add
				console.log("执行2")
			}
			if(!options.link_add&&options.img_chat) {
				this.img_chat=options.img_chat
				console.log("执行3")
			}
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
