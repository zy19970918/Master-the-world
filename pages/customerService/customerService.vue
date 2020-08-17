<template>
	<view class="content_bar">
		<view class="img">
			<image class="logo2" src="../../static/images/logo2.png" mode="scaleToFill"></image>
		</view>
		<view class="btn">
			<image class="imgs" src="../../static/images/yishoutianxia.png" mode=""></image>
			<button type="default" class="btns" open-type="contact">联系客服</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>
<style scoped lang="scss">
	.content_bar{
		height: 100%;
		box-sizing: border-box;
	}
	.img{
		width: 570rpx;
		height: 494rpx;
		margin: 0 auto;
		margin-top: 177rpx;
	}
	.logo2 {
		width: 100%;
		height:100%;
	}
	.btn{
		height: 118rpx;
		width: 496rpx;
		margin: 0 auto;
		margin-top: 22rpx;
	}
	.imgs{
		width: 100%;
		height:100%;
	}
	.btns{
		background-color: #ffffff;
		color: #333333;
		border-radius: 60rpx;
		margin-top: 68rpx;
	}
</style>
