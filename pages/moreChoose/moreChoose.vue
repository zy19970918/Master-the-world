<template>
	<view>
		<view class="content">
			<view class="content_top">
				<view class="top_left" @tap="openAddres">
					<image class="top_images" src="../../static/images/xuanzebj.png" mode=""></image>
					<image class="top_leftimg" src="../../static/images/diquxuanze.png" mode=""></image>
				</view>
				<view class="" style="display: inline-block; height: 80rpx; line-height: 80rpx; margin-left: 10rpx; margin-left: 2rpx; font-weight: 900;">
					<text style="margin-right: 5rpx;">:</text>{{city}}
				</view>
				<view class="top_left left_bar" @click="duaiyong">
					<image class="top_images" src="../../static/images/xuanzebj.png" mode=""></image>
					<image class="top_leftimg" src="../../static/images/tiaojianshaixuan.png" mode=""></image>
				</view>
			</view>
			<view class="conytent_bar" v-if="flag" v-for="(item,index) in listDetail" :key="index" style="margin-top: 0;">
				<image src="http://m.qpic.cn/psc?/V11EtE3S2awPyr/TmEUgtj9EK6.7V8ajmQrEE7fc9QYVmPyCvbIr50*.U9Lcym*WHBuWiQ*sYQKGR5ZURyE*EwFXyv1GCKood522vvyKFBJ1ieL3uZbITzYk4A!/b&bo=wQJbAQAAAAADF6s!&rf=viewer_4" mode=""></image>
				<image class="portrait" :src="item.imgAddr"
				 mode=""></image>
				<view class="conten_center">
					<view class="top_text" style="max-width: 189rpx; min-width: 189rpx; white-space: nowrap;">{{item.companyName}}</view>
					<view class="text">代理费:<text class="text_defult">{{item.agencyFee}}元/天</text></view>
					<view class="" v-if="item.ageOne==1&&item.ageTwo==0&&item.ageThree==0">
						<view class="text">年&ensp;&ensp;龄:<text class="text_defult">18岁-50岁</text></view>
					</view>
					<view class="" v-if="item.ageOne==0&&item.ageTwo==1&&item.ageThree==0">
						<view class="text">年&ensp;&ensp;龄:<text class="text_defult">35岁-50岁</text></view>
					</view>
					<view class="" v-if="item.ageOne==0&&item.ageTwo==0&&item.ageThree==1">
						<view class="text">年&ensp;&ensp;龄:<text class="text_defult">50岁以上</text></view>
					</view>
					<view class="" v-if="item.ageOne==1&&item.ageTwo==1&&item.ageThree==1">
						<view class="text">年&ensp;&ensp;龄:<text class="text_defult">不限</text></view>
					</view>
					<view class="" v-if="item.ageOne==1&&item.ageTwo==1&&item.ageThree==0">
						<view class="text">年&ensp;&ensp;龄:<text class="text_defult">18-35岁&ensp;&ensp;35-50岁</text></view>
					</view>
					<view class="" v-if="item.ageOne==0&&item.ageTwo==1&&item.ageThree==1">
						<view class="text">年&ensp;&ensp;龄:<text class="text_defult">35岁以上</text></view>
					</view>
					<view class="" v-if="item.ageOne==1&&item.ageTwo==0&&item.ageThree==1">
						<view class="text">年&ensp;&ensp;龄:<text class="text_defult">18-35岁&ensp;&ensp;50岁以上</text></view>
					</view>
					<view class="imgs"><image src="../../static/images/chakangengduoanniu_.png" mode="" @click="todetail(item.companyId)"></image></view>
				</view>
				<view class="bottom_txt">
					红星
				</view>
			</view>
			<view class="img_bars" v-if="!flag">
				<image src="http://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqbZ7w71YmUB1ZFw9LkwXpUtXb86JYJ1IxYkNV2ve0J6ADKiHlLLMfV6ZlnBhgpyWerXzcr1vZllcV3I4RUxbvis!/b&bo=ygJjAwAAAAADB4o!&rf=viewer_4" mode=""></image>
			</view>
			<view class="tips" v-if="flag">
				*想要更多一手单，请点击页首地区选择和条件筛选进行查找
			</view>
		</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
		<HMfilterDropdown ref="child" :filterData="filterData" :defaultSelected="filterDropdownValue" @confirm="confirm"></HMfilterDropdown>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import data from '@/common/data.js'; //筛选菜单数据
	export default {
		data() {
			return {
				cityPickerValueDefault: [0, 0],
				pickerText: '',
				filterData: [], //传入数据，具体数据格式，请下载示例查看
				val: '', //搜索关键词
				listDetail: [], //搜索列表
				city: '', //选择城市
				flag:false
			}
		},
		methods: {
			add() {
				uni.openLocation({
					longitude: 118.7787,
					latitude: 31.99226
				})
			},
			todetail(companyId) {
				uni.navigateTo({
					url: `../detail/detail?item=${companyId}`
				})
			},
			openAddres() {
				this.cityPickerValueDefault = [0, 0, 1]
				this.$refs.simpleAddress.open();
			},
			recommend() { //厂商推荐
				var that = this
				uni.request({
					url: "http://118.178.89.161:9999/company/recommend",
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {},
					success(res) {
						if (res.data.status == 200 && res.data.data.length !== 0) {
							uni.hideLoading()
							that.listDetail = res.data.data
							that.flag=true
						} else {
							that.listDetail = ""
							uni.showToast({
								title: "未搜索到结果",
								icon: "none"
							})
						}
					}
				})
			},
			onConfirm(e) { //地区选择
				this.city = e.labelArr[1]
				var that = this
				uni.showLoading({
					title: "加载中"
				})
				uni.request({
					url: "http://118.178.89.161:9999/company/condition",
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {
						city: e.labelArr[1]
					},
					success(res) {
						console.log(res)
						uni.hideLoading()
						if (res.data.status == 200 && res.data.data.length !== 0) {
							that.listDetail = res.data.data
							that.flag=true
						} else {						
							that.listDetail = ""
							uni.showToast({
								title: "未搜索到结果",
								icon: 'none'
							})
						}
					}
				})
			},
			duaiyong() {
				this.$refs.child.togglePage(0)
			},
			confirm(e) { //条件筛选
			var count=0
			  for (var i=0; i<e.index[0].length;i++) {
                  count+=e.index[0][i].length
			  }
			  if(count==0) {
				  return false
			  }
				var that = this
				var arry = e.value[0][1].toString()
				var ageOne
				var ageTwo
				var ageThree
				var arrAge = e.value[0][0]
				arrAge.forEach((item, index) => {
					console.log(index)
					if (item == "2") {
						ageOne = 1
					}else {
						ageOne=0
					}
					if (item == "1") {
						ageTwo = 1
					}else {
						ageTwo=0
					}
					if (item == "0") {
						ageThree = 1
					} else {
						ageThree=0
					}
				})

				var sex
				var sexMan
				var sexWoman
				var sexArr = e.value[0][1]
				sexArr.forEach(item => {
					if (item == "0") {
						sexMan = 1
					} else {
						sexMan = 0
					}
					if (item == "1") {
						sexWoman = 1
					} else {
						sexWoman = 0
					}
					if (item == "2") {
						sex =1
					} else {
						sex =0
					}
				})
				var manageFee
				var manageFeeOne
				var Feearr = e.value[0][2]
				Feearr.forEach(item => {
					if (item == "0") {
						manageFee = 1
					} else {
						manageFee = 0
					}
					if (item = "1") {
						manageFeeOne = 1
					} else {
						manageFeeOne = 0
					}
				})
				var workType
				var workTypeDay
				var workarr = e.value[0][3]
				workarr.forEach(item => {
					if (item == 0) {
						workType = 1
					} else {
						workType = 0
					}
					if (item == 1) {
						workTypeDay = 1
					} else {
						workTypeDay = 0
					}
				})
				var spouseHouse
				var spouseHouseHusband
				var spouseArr = e.value[0][4]
				spouseArr.forEach(item => {
					if (item == 0) {
						spouseHouse = 1
					} else {
						spouseHouse = 0
					}
					if (item == 1) {
						spouseHouseHusband = 1
					} else {
						spouseHouseHusband = 0
					}
				})
				var workRequire
				var workRequireLong
				var workAyy = e.value[0][5]
				workAyy.forEach(item => {
					if (item == 0) {
						workRequireLong = 1
					} else {
						workRequireLong = 0
					}
					if (item == 1) {
						workRequire = 1
					} else {
						workRequire = 0
					}
				})
				var studentWorker
				var studentNotWorker
				var studebtArr = e.value[0][6]
				studebtArr.forEach(item => {
					if (item == 0) {
						studentWorker = 1
					} else {
						studentWorker = 0
					}
					if (item == 1) {
						studentNotWorker = 1
					} else {
						studentNotWorker = 0
					}
				})
				var nationals
				var nationalsNot
				var natArry = e.value[0][7]
				natArry.forEach(item => {
					if (item == 0) {
						nationals = 1
					} else {
						nationals = 0
					}
					if (item == 1) {
						nationalsNot = 1
					} else {
						nationalsNot = 0
					}
				})
				uni.showLoading({
					title: "加载中"
				})
				uni.request({
					url: "http://118.178.89.161:9999/company/query",
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {
						ageOne,
						ageTwo,
						ageThree,
						sex,
						sexMan,
						sexWoman,
						manageFee,
						manageFeeOne,
						workType,
						workTypeDay,
						spouseHouse,
						spouseHouseHusband,
						workRequire,
						workRequireLong,
						studentWorker,
						studentNotWorker,
						nationals,
						nationalsNot
					},
					success(res) {
						if (res.data.status == 200 && res.data.data.length !== 0) {
							uni.hideLoading()
							that.listDetail = res.data.data
							that.flag=true
						} else {
							that.listDetail = ""
							uni.showToast({
								title: "未搜索到结果",
								icon: "none"
							})
						}
					}
				})
			},
			getsearch() { //搜索到的工厂信息
				if (this.val == undefined) {
					this.recommend()
					return false
				}
				uni.showLoading({
					title: "加载中"
				})
				var that = this
				uni.request({
					url: "http://118.178.89.161:9999/company/condition",
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {
						companyName: this.val
					},
					success(res) {
						if (res.data.status == 200 && res.data.data.length !== 0) {
							uni.hideLoading()
							that.listDetail = res.data.data
							that.flag=true
						} else {
							uni.showToast({
								title: "未搜索到结果",
								icon: "none"
							})
						}
					}
				})
			},
		},
		components: {
			simpleAddress,
			'HMfilterDropdown': HMfilterDropdown
		},
		watch:{
			'listDetail':function(val) {
				if(val.length==0) {
					this.flag=false
				}
			}
		},
		onLoad(options) {
			this.val = options.val
			this.getsearch()
			this.filterData = data
			uni.hideLoading()
		}
	}
</script>
<style scoped lang="scss">
	* {
		margin: 0;
		padding: 0;
	}

	.content {
		padding-top: 21rpx;
		padding-left: 20rpx;
		padding-right: 25rpx;
	}

	.top_left {
		float: left;
		margin-left: 24rpx;
		display: flex;
		align-items: center;
	}

	.left_bar {
		float: right;
	}

	.content_top {
		overflow: hidden;
	}

	.top_images {
		height: 80rpx;
		width: 84rpx;
	}

	.top_leftimg {
		width: 158rpx;
		height: 38rpx;
		margin-left: -44rpx;
	}

	.conytent_bar {
		position: relative;
		margin-top: 28rpx;
		width: 705rpx;
		height: 343rpx;
		image {
			height: 100%;
			width: 100%;
		}
	}

	.conten_center {
		position: absolute;
		top: 61rpx;
		left: 260rpx;
		min-height: 238rpx;
	}

	.portrait {
		height: 170rpx !important;
		width: 170rpx !important;
		border-radius: 50%;
		position: absolute;
		bottom: 92rpx;
		left: 55rpx;
	}

	.top_text {
		font-size: 36rpx;
		color: #333333;
		font-weight: 900;
		text-align: center;
	}

	.text {
		font-size: 20rpx;
		color: #D24C1F;
		margin-top: 21rpx;
		margin-left: 20rpx;
	}

	.text_defult {
		color: #666666;
		margin-left: 18rpx;
	}

	.bottom_text {
		color: #ffffff;
		font-size: 24rpx;
		margin-top: 38rpx;
	}

	.tips {
		font-size: 18rpx;
		color: #CA0000;
		font-weight: 600;
		text-align: right;
	}

	.logo {
		height: 18rpx !important;
		width: 71rpx !important;
		position: absolute;
		bottom: 88rpx;
		right: 99rpx;
	}

	.bottom_txt {
		font-size: 14rpx;
		display: inline-block;
		color: #CA0000;
		font-weight: 900;
		position: absolute;
		right: 122rpx;
		bottom: 84rpx;
	}
	.imgs{
		width: 200rpx;
		height: 54rpx;
		margin-left: 24rpx;
		position: absolute;
		bottom: 20rpx;
		image {
			height: 100%;
			width: 100%;
		}
	}
	.img_bars{
		height: 867rpx;
		width: 714rpx;
		padding-top: 48rpx;
		padding-bottom: 48rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>
