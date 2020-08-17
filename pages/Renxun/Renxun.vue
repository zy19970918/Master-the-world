<template>
	<view>
		<view class="content">
		    <view class="conytent_bar" v-for="(item,index) in Renxunlist" :key="index">
		    	<image src="http://m.qpic.cn/psc?/V11EtE3S2awPyr/TmEUgtj9EK6.7V8ajmQrELPXlRkVskxYozwIy9rZV3p.WSV*h90k1SHom*aflhSHAeO9v0LAkGpSZK1JIJsRHtQgOXb6jbZOuU6yiyPnbPc!/b&bo=wQJbAQAAAAADJ5s!&rf=viewer_4" mode=""></image>
				<image class="portrait" :src="item.imgAddr" mode=""></image>
		        <view class="conten_center">
		        	<view class="top_text">{{item.personName}}</view>
					<view class="text" style="margin-top: 4rpx;">总部:<text class="text_defult">{{item.headCompany}}</text></view>
					<view class="text">主营:<text class="text_defult">{{item.business}}</text></view>
					<view class="text">平台认缴风险把控金:<text class="text_defult">{{item.money}}元</text></view>
					<view class="imgs" @click="toRenxundetail(item.resourceId)"><image src="../../static/images/chakangengduoanniu_.png" mode=""></image></view>
		        </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Renxunlist:[],
			}
		},
		methods: {
			add() {
				uni.openLocation({
				 longitude:118.7787,
				 latitude:31.99226
				})
			},
			toRenxundetail(resourceId) {
				uni.navigateTo({
					url:`../Renxundetail/Renxundetail?resourceId=${resourceId}`
				})
			},
			getRen() {
				var that=this
				uni.request({
					url:"http://118.178.89.161:9999/person/queryResource",  //人资列表
					method:'POST',
					header:{
						"Content-Type":"application/json"
					},
					data:{
						"pageNum":"1",
						"pageSize":"10"
					},
					success(res) {
						if(res.data.status==200) {
							uni.hideLoading()
							that.Renxunlist=res.data.data
						} else {
							uni.showToast({
								title:res.data.message,
								icon:'none'
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
	*{
		margin: 0;
		padding: 0;
	}
	.content {
		padding-top: 21rpx;
		padding-left: 20rpx;
		padding-right: 25rpx;
	}
	.top_left{
		float: left;
		margin-left: 24rpx;
		display: flex;
		align-items: center;
	}
	.left_bar {
		float: right;
		margin-right: 149rpx;
	}
	.content_top{
		overflow: hidden;
	}
	.top_images {
		height: 80rpx;
		width: 84rpx;
	}
	.top_leftimg{
		width: 158rpx;
		height: 38rpx;
		margin-left:-44rpx ;
	}
	.conytent_bar:nth-child(1) {
		margin-top: 0 !important;
	}
	.conytent_bar{
		position:relative;
		margin-top: 16rpx;
		width: 705rpx;
		height: 347rpx;
		image {
			height: 100%;
			width: 100%;
		}
	}
	.conten_center{
		position: absolute;
		top: 61rpx;
		left: 260rpx;
	}
	.portrait{
		height: 181rpx !important;
		width: 184rpx !important;
		border-radius: 50%;
		position: absolute;
		bottom: 93rpx;
		left: 50rpx;
		z-index: 999999999;
	}
	.top_text{
		width: 210rpx;
		white-space: nowrap;
		font-size: 36rpx;
		color: #333333;
		font-weight: 900;
		text-align: center;
	}
	.text{
		font-size: 20rpx;
		color: #D24C1F;
		margin-top: 8rpx;
		margin-left: 20rpx;
	}
	.text_defult{
		color: #666666;
		margin-left: 18rpx;
	}
	.bottom_text{
		color: #ffffff;
		font-size: 24rpx;
		margin-top: 17rpx;
		margin-left: 56rpx;
	}
	.tips{
		font-size: 18rpx;
		color: #CA0000;
		font-weight: 600;
		text-align: right;
	}
	.logo{
		height: 18rpx !important;
		width: 71rpx !important;
		position: absolute;
		bottom: 88rpx;
		right: 99rpx;
	}
	.bottom_txt{
		font-size: 14rpx;
		display: inline-block;
		color: #CA0000;
		font-weight: 900;
		position: absolute;
		right: 122rpx;
		bottom: 69rpx;
	}
	.space{
		float: right;
		width: 210rpx;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		margin-right: 26rpx;
	}
	.imgs{
		width: 199rpx;
		height: 61rpx;
		margin-left: 24rpx;
		margin-top: 6rpx;
		image{
			height: 100%;
			width: 100%;
		}
	}
</style>
