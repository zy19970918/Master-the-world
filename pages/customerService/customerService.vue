<template>
	<view class="content_bar">
		<view class="img">
			<image  class="logo2" src="http://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqezpJv4DPb7eP4rLK15.BaNzSPewYaEBhDfmKsEkuusYDzsEQ.pCDAQ1ljY.dn*ZcWrg76EHdaBjaMAo2lDNWfw!/b&bo=ogQ4BAAAAAADB7g!&rf=viewer_4" mode="aspectFit"></image>
		</view>
		<view class="btn">
			<image class="imgs" src="../../static/images/yishoutianxia.png" mode="aspectFit"></image>
			<button type="default" class="btns" open-type="contact" @contact='add'>联系客服</button>
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
			add(e) {
				console.log(e)
			}
		}
	}
</script>
<style scoped lang="scss">
	.content_bar{
		height: 100%;
		box-sizing: border-box;
	}
	.img{
		width: 100% !important;
		display: flex;
	}
	.logo2 {
		margin: 0 auto;
		margin-top: 177rpx;
		height: 250px !important;
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
