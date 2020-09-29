<template>
	<view>
		<view class="content">
			<image class="top_img" src="../../static/images/shangkuang.png" mode=""></image>
			<view class="content_text">
			  <image src="../../static/images/zhubiaotyi_.png" mode=""></image>
			</view>
			<view class="table">
				<view class="tr bg-w">
					<view class="th"><image src="../../static/images/biati222_.png" mode="aspectFit"></image></view>
					<view class="th "><image src="../../static/images/xiangqing_biaoti.png" mode="aspectFit"></image></view>
				</view>
				<block v-for="(item,index) in listData" :key="index">
					<view class="tr">
						<view class="td">{{item.dishonestyName}}</view>
						<view class="td left" @click="todetail(item.dishonestyId)">查看详情</view>
					</view>
				</block>
			</view>
			<image class="bot_img" src="../../static/images/xiakuang.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: []
			}
		},
		methods: {
				todetail(id) {
							uni.navigateTo({
								url:`../componydetail/componydetail?id=${id}`
							})
						},
			getdis() { //失信名单
			uni.showLoading({
				title:"加载中"
			})
			var that=this
			     uni.request({
			     	url:"https://ystx.xn--4gqr6isbv1bn21d.com/api/dishonest/query",
			     	method:'POST',
			     	header:{
			     		"Content-Type":"application/json"
			     	},
			     	data:{
			     		
			     	},
			     	success(res) {
						uni.hideLoading()
			     		console.log(res)
						if(res.data.status==200) {
							that.listData=res.data.data
						}else {
							uni.showToast({
								title:res.data.message,
								icon:'none'
							})
						}
			     	}
			     })  
			 },
			 
		},
		onLoad() {
			this.getdis()
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		padding: 0 25rpx;

		.content_text {
			font-size: 60rpx;
			text-align: center;
			font-weight: 900;
			color: #d63b3f;
			margin-top: -90rpx;
			image{
				height: 47rpx;
				width: 193rpx;
			}
		}

		image {
			height: 154rpx;
			width: 705rpx;
			margin: 0 auto;
		}
	}
	.left{
		margin-right: 33rpx;
	}
	.left:hover{
		color: #007AFF;
	}
	.table {
		border: 0px solid darkgray;
		font-size: 28rpx;
	}

	.tr {
		display: flex;
		width: 100%;
		justify-content: space-between;
		height: 2rem;
		align-items: center;
		background: none;
	}

	.td {
		width: 40%;
		justify-content: space-between;
		text-align: center;
		font-size: 32rpx;
		font-weight: 600;
		color: #333333;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		
	}
	.th {
		width: 40%;
			// height: 69rpx;
		justify-content: center;
		color: #000;
		font-weight: 900;
		background-size:  100% 100%;
		font-size: 32rpx;
		display: flex;
		height: 90rpx;
		align-items: center;
		margin-left: 20rpx;
		image{
			height: 100%;
			width: 80%;
			margin: 0 !important;
		}
	}
</style>
