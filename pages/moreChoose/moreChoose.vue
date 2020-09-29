<template>
	<view>
		<view class="content">
			<view class="content_top_btn">
				<view class="btn_wrapper">
					<image class="top_btn_image" src="../../static/images/xuanzebj.png" mode=""></image>
					<text class="top_btn_text" @tap="openAddres">地区选择:</text><text>{{city}}</text>
				</view>
				<view class="btn_wrapper" style="margin-right: 40rpx;">
					<image class="top_btn_image" src="../../static/images/xuanzebj.png" mode=""></image>
					<text class="top_btn_text" @click="duaiyong">条件筛选</text>
				</view>
			</view>
			<view class="conytent_bar" v-if="flag" v-for="(item,index) in listDetail" :key="index" style="margin-top: 0;">
				<image src="../../static/images/kuangjia_111.png" mode=""></image>
				<image class="portrait" :src="item.imgAddr" mode=""></image>
				<image class="portraitWrapper" src="/static/images/moquan.png" mode="aspectFit"></image>
				<view class="conten_center">
					<view class="top_text" style="width: 208rpx;word-break:keep-all; white-space:nowrap;overflow:hidden; text-overflow:ellipsis;">{{item.companyName}}</view>
					<view class="text">代理费:<text class="text_defult">{{item.agencyFee}}</text></view>
					<view class="">
						<view class="text">年&ensp;&ensp;龄:<text class="text_defult">{{item.ageTwo}}岁</text></view>
					</view>
					<view class="text">工&ensp;&ensp;价:<text class="text_defult">{{item.wageFee}}</text></view>
					<!-- <view class="imgs">
						<image src="../../static/images/chakangengduoanniu_.png" mode="" @click="todetail(item.companyId)"></image>
					</view> -->
					<view class="imgs" style="width: 240rpx;transform: scale(.6);margin-left: -10rpx; margin-top: 8rpx;" @click="todetail(item.companyId)">
						<image src="../../static/images/more.png" mode="aspectFill"></image>
					</view>
				</view>
				<image style="position: absolute; width: 113rpx;right: 42rpx;" src="../../static/images/laowu.png" mode="aspectFit"></image>
				<view class="bottom_txt">
					{{item.shortName}}
				</view>
			</view>
			<view class="img_bars" v-if="!flag">
				<image src="http://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqUhpBG0zlZUavkcIR94lTaMTdegow7dOdoOQSXKBFmIhsuMWQQ7JgThar*YGmJ0Ir1jKqI5PumKFkXi.eyFvE.g!/b&bo=wQLEAwAAAAADByY!&rf=viewer_4"
				 mode=""></image>
			</view>
			<view class="tips" v-if="flag">
				*查找更多一手单，请点击地区选择和条件筛选进行查找
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
				flag: false,
				addr: '', //地区选择，
				case: {
					value: [""]
				}, //条件筛选
				ageOne: 0,
				ageTwo: ''
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
					url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/company/recommend",
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					data: {},
					success(res) {
						if (res.data.status == 200 && res.data.data.length !== 0) {
							uni.hideLoading()
							that.listDetail = res.data.data
							that.flag = true
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
				this.addr = e
				this.city = e.labelArr[1]
				var that = this
				if (this.ifArrayNone(that.case.value[0]) || this.$refs.child.flags) {
					console.log("存在leo ")
					console.log(that.case)
					var sex
					var sexWoman
					var sexArr = that.case.value[0][1]
					sexArr.forEach(item => {
						if (item == "0") {
							sex = 1
						}
						if (item == "1") {
							sexWoman = 1
						}
					})
					var manageFee
					var manageFeeOne
					var Feearr = that.case.value[0][2]
					Feearr.forEach(item => {
						if (item == "0") {
							manageFee = 1
						}
						if (item = "1") {
							manageFeeOne = 1
						}
					})
					var workType
					var workTypeDay
					var workarr = that.case.value[0][3]
					workarr.forEach(item => {
						if (item == 0) {
							workType = 1
						}
						if (item == 1) {
							workTypeDay = 1
						}
					})
					var spouseHouse
					var spouseHouseHusband
					var spouseArr = that.case.value[0][4]
					spouseArr.forEach(item => {
						if (item == 0) {
							spouseHouse = 1
						}
						if (item == 1) {
							spouseHouseHusband = 1
						}
					})
					var workRequire
					var workRequireLong
					var workAyy = that.case.value[0][5]
					workAyy.forEach(item => {
						if (item == 0) {
							workRequireLong = 1
						}
						if (item == 1) {
							workRequire = 1
						}
					})
					var studentWorker
					var studentNotWorker
					var studebtArr = that.case.value[0][6]
					studebtArr.forEach(item => {
						if (item == 0) {
							studentWorker = 1
						}
						if (item == 1) {
							studentNotWorker = 1
						}
					})
					var nationals
					var nationalsNot
					var natArry = that.case.value[0][7]
					natArry.forEach(item => {
						if (item == 0) {
							nationals = 1
						}
						if (item == 1) {
							nationalsNot = 1
						}
					})
					uni.showLoading({
						title: "加载中"
					})
					if (this.$refs.child.flags) {
						uni.request({
							url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/company/query",
							method: 'POST',
							header: {
								"Content-Type": "application/json"
							},
							data: {
								ageOne: that.ageOne,
								ageTwo: that.ageTwo,
								sex,
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
								nationalsNot,
								city: e.labelArr[1]
							},
							success(res) {
								console.log(res)
								uni.hideLoading()
								if (res.data.status == 200 && res.data.data.length !== 0) {
									that.listDetail = res.data.data
									that.flag = true
								} else {
									that.listDetail = ""
									uni.showToast({
										title: "未搜索到结果",
										icon: 'none'
									})
								}
							}
						})
					} else {
						uni.request({
							url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/company/query",
							method: 'POST',
							header: {
								"Content-Type": "application/json"
							},
							data: {
								ageOne: that.ageOne,
								ageTwo: that.ageTwo,
								sex,
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
								nationalsNot,
								city: e.labelArr[1]
							},
							success(res) {
								console.log(res)
								uni.hideLoading()
								if (res.data.status == 200 && res.data.data.length !== 0) {
									that.listDetail = res.data.data
									that.flag = true
								} else {
									that.listDetail = ""
									uni.showToast({
										title: "未搜索到结果",
										icon: 'none'
									})
								}
							}
						})
					}

				} else {
					uni.showLoading({
						title: "加载中"
					})
					uni.request({
						url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/company/query",
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
								that.flag = true
							} else {
								that.listDetail = ""
								uni.showToast({
									title: "未搜索到结果",
									icon: 'none'
								})
							}
						}
					})
				}



			},
			ifArrayNone(arrList) {
				for (let i = 0; i < arrList.length; i++) {
					if (arrList[i].length > 0) {
						return true
					}
				}
				return false
			},
			duaiyong() {
				this.$refs.child.togglePage(0)
			},
			confirm(e) { //条件筛选
				var that = this
				console.log(e.value[0][0][0])
				if (e.value[0][0][0] == 50) {
					that.ageOne = 1,
						that.ageTwo = 50
				} else {
					that.ageOne = "",
						that.ageTwo = ""
				}
				this.case = e
				var that = this
				if (this.$refs.child.flags) {
					if (!that.addr) {
						if (!this.ifArrayNone(e.value[0]) && !this.$refs.child.flags) { //此代码待改
							this.recommend();
							return
						}
						var count = 0
						var sex
						var sexWoman
						var sexArr = e.value[0][1]
						sexArr.forEach(item => {
							if (item == "0") {
								sex = 1
							}
							if (item == "1") {
								sexWoman = 1
							}
						})
						var manageFee
						var manageFeeOne
						var Feearr = e.value[0][2]
						console.log(Feearr)
						Feearr.forEach(item => {
							if (item == "0") {
								manageFee = 1
								console.log(manageFee)
							}
							if (item == "1") {
								manageFeeOne = 1
								console.log(manageFeeOne)
							}
						})

						var workType
						var workTypeDay
						var workarr = e.value[0][3]
						workarr.forEach(item => {
							if (item == 0) {
								workType = 1
							}
							if (item == 1) {
								workTypeDay = 1
							}
						})
						var spouseHouse
						var spouseHouseHusband
						var spouseArr = e.value[0][4]
						spouseArr.forEach(item => {
							if (item == 0) {
								spouseHouse = 1
							}
							if (item == 1) {
								spouseHouseHusband = 1
							}
						})
						var workRequire
						var workRequireLong
						var workAyy = e.value[0][5]
						workAyy.forEach(item => {
							if (item == 0) {
								workRequireLong = 1
							}
							if (item == 1) {
								workRequire = 1
							}
						})
						var studentWorker
						var studentNotWorker
						var studebtArr = e.value[0][6]
						studebtArr.forEach(item => {
							if (item == 0) {
								studentWorker = 1
							}
							if (item == 1) {
								studentNotWorker = 1
							}
						})
						var nationals
						var nationalsNot
						var natArry = e.value[0][7]
						natArry.forEach(item => {
							if (item == 0) {
								nationals = 1
							}
							if (item == 1) {
								nationalsNot = 1
							}
						})
						uni.showLoading({
							title: "加载中"
						})
						uni.request({
							url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/company/query",
							method: 'POST',
							header: {
								"Content-Type": "application/json"
							},
							data: {
								ageOne: that.ageOne,
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
									that.flag = true
								} else {
									that.listDetail = ""
									uni.showToast({
										title: "未搜索到结果",
										icon: "none"
									})
								}
							}
						})
					} else {
						if (!this.$refs.child.flags) {
							console.log("的点点滴滴")
							this.onConfirm(this.addr)
							return false
						}
						var sex
						var sexMan
						var sexWoman
						var sexArr = e.value[0][1]
						sexArr.forEach(item => {
							if (item == "0") {
								sexMan = 1
							}
							if (item == "1") {
								sexWoman = 1
							}
							if (item == "2") {
								sex = 1
							}
						})
						var manageFee
						var manageFeeOne
						var Feearr = e.value[0][2]
						Feearr.forEach(item => {
							if (item == "0") {
								manageFee = 1
							}
							if (item == "1") {
								manageFeeOne = 1
							}
						})
						var workType
						var workTypeDay
						var workarr = e.value[0][3]
						workarr.forEach(item => {
							if (item == 0) {
								workType = 1
							}
							if (item == 1) {
								workTypeDay = 1
							}
						})
						var spouseHouse
						var spouseHouseHusband
						var spouseArr = e.value[0][4]
						spouseArr.forEach(item => {
							if (item == 0) {
								spouseHouse = 1
							}
							if (item == 1) {
								spouseHouseHusband = 1
							}
						})
						var workRequire
						var workRequireLong
						var workAyy = e.value[0][5]
						workAyy.forEach(item => {
							if (item == 0) {
								workRequireLong = 1
							}
							if (item == 1) {
								workRequire = 1
							}
						})
						var studentWorker
						var studentNotWorker
						var studebtArr = e.value[0][6]
						studebtArr.forEach(item => {
							if (item == 0) {
								studentWorker = 1
							}
							if (item == 1) {
								studentNotWorker = 1
							}
						})
						var nationals
						var nationalsNot
						var natArry = e.value[0][7]
						natArry.forEach(item => {
							if (item == 0) {
								nationals = 1
							}
							if (item == 1) {
								nationalsNot = 1
							}
						})
						uni.showLoading({
							title: "加载中"
						})
						uni.request({
							url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/company/query",
							method: 'POST',
							header: {
								"Content-Type": "application/json"
							},
							data: {
								ageOne: that.ageOne,
								ageTwo: that.ageTwo,
								sex,
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
								nationalsNot,
								city: that.city
							},
							success(res) {
								if (res.data.status == 200 && res.data.data.length !== 0) {
									uni.hideLoading()
									that.listDetail = res.data.data
									that.flag = true
								} else {
									that.listDetail = ""
									uni.showToast({
										title: "未搜索到结果",
										icon: "none"
									})
								}
							}
						})
					}
				} else if (!this.$refs.child.flags) {
					console.log("22")
					if (!that.addr) {
						console.log("不存在")
						if (!this.ifArrayNone(e.value[0]) && !this.$refs.child.flags) { //此代码待改
							this.recommend();
							return
						}
						var count = 0
						var sex
						var sexWoman
						var sexArr = e.value[0][1]
						sexArr.forEach(item => {
							if (item == "0") {
								sex = 1
							}
							if (item == "1") {
								sexWoman = 1
							}
						})
						var manageFee
						var manageFeeOne
						var Feearr = e.value[0][2]
						console.log(Feearr)
						Feearr.forEach(item => {
							if (item == "0") {
								manageFee = 1
								console.log(manageFee)
							}
							if (item == "1") {
								manageFeeOne = 1
								console.log(manageFeeOne)
							}
						})

						var workType
						var workTypeDay
						var workarr = e.value[0][3]
						workarr.forEach(item => {
							if (item == 0) {
								workType = 1
							}
							if (item == 1) {
								workTypeDay = 1
							}
						})
						var spouseHouse
						var spouseHouseHusband
						var spouseArr = e.value[0][4]
						spouseArr.forEach(item => {
							if (item == 0) {
								spouseHouse = 1
							}
							if (item == 1) {
								spouseHouseHusband = 1
							}
						})
						var workRequire
						var workRequireLong
						var workAyy = e.value[0][5]
						workAyy.forEach(item => {
							if (item == 0) {
								workRequireLong = 1
							}
							if (item == 1) {
								workRequire = 1
							}
						})
						var studentWorker
						var studentNotWorker
						var studebtArr = e.value[0][6]
						studebtArr.forEach(item => {
							if (item == 0) {
								studentWorker = 1
							}
							if (item == 1) {
								studentNotWorker = 1
							}
						})
						var nationals
						var nationalsNot
						var natArry = e.value[0][7]
						natArry.forEach(item => {
							if (item == 0) {
								nationals = 1
							}
							if (item == 1) {
								nationalsNot = 1
							}
						})
						uni.showLoading({
							title: "加载中"
						})
						uni.request({
							url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/company/query",
							method: 'POST',
							header: {
								"Content-Type": "application/json"
							},
							data: {
								ageOne: that.ageOne,
								ageTwo: that.ageTwo,
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
									that.flag = true
								} else {
									that.listDetail = ""
									uni.showToast({
										title: "未搜索到结果",
										icon: "none"
									})
								}
							}
						})
					} else {
						if (!this.$refs.child.flags) {
							console.log("的点点滴滴")
							this.onConfirm(this.addr)
							return false
						}
						var sex
						var sexMan
						var sexWoman
						var sexArr = e.value[0][1]
						sexArr.forEach(item => {
							if (item == "0") {
								sexMan = 1
							}
							if (item == "1") {
								sexWoman = 1
							}
							if (item == "2") {
								sex = 1
							}
						})
						var manageFee
						var manageFeeOne
						var Feearr = e.value[0][2]
						Feearr.forEach(item => {
							if (item == "0") {
								manageFee = 1
							}
							if (item == "1") {
								manageFeeOne = 1
							}
						})
						var workType
						var workTypeDay
						var workarr = e.value[0][3]
						workarr.forEach(item => {
							if (item == 0) {
								workType = 1
							}
							if (item == 1) {
								workTypeDay = 1
							}
						})
						var spouseHouse
						var spouseHouseHusband
						var spouseArr = e.value[0][4]
						spouseArr.forEach(item => {
							if (item == 0) {
								spouseHouse = 1
							}
							if (item == 1) {
								spouseHouseHusband = 1
							}
						})
						var workRequire
						var workRequireLong
						var workAyy = e.value[0][5]
						workAyy.forEach(item => {
							if (item == 0) {
								workRequireLong = 1
							}
							if (item == 1) {
								workRequire = 1
							}
						})
						var studentWorker
						var studentNotWorker
						var studebtArr = e.value[0][6]
						studebtArr.forEach(item => {
							if (item == 0) {
								studentWorker = 1
							}
							if (item == 1) {
								studentNotWorker = 1
							}
						})
						var nationals
						var nationalsNot
						var natArry = e.value[0][7]
						natArry.forEach(item => {
							if (item == 0) {
								nationals = 1
							}
							if (item == 1) {
								nationalsNot = 1
							}
						})
						uni.showLoading({
							title: "加载中"
						})
						uni.request({
							url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/company/query",
							method: 'POST',
							header: {
								"Content-Type": "application/json"
							},
							data: {
								ageOne: that.ageOne,
								ageTwo: that.ageTwo,
								sex,
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
								nationalsNot,
								city: that.city
							},
							success(res) {
								if (res.data.status == 200 && res.data.data.length !== 0) {
									uni.hideLoading()
									that.listDetail = res.data.data
									that.flag = true
								} else {
									that.listDetail = ""
									uni.showToast({
										title: "未搜索到结果",
										icon: "none"
									})
								}
							}
						})
					}
				} else {
					console.log("33")
					if (!that.addr) {
						console.log("不存在")
						if (!this.ifArrayNone(e.value[0]) && !this.$refs.child.flags) { //此代码待改
							this.recommend();
							return
						}
						var count = 0
						var sex
						var sexWoman
						var sexArr = e.value[0][1]
						sexArr.forEach(item => {
							if (item == "0") {
								sex = 1
							}
							if (item == "1") {
								sexWoman = 1
							}
						})
						var manageFee
						var manageFeeOne
						var Feearr = e.value[0][2]
						console.log(Feearr)
						Feearr.forEach(item => {
							if (item == "0") {
								manageFee = 1
								console.log(manageFee)
							}
							if (item == "1") {
								manageFeeOne = 1
								console.log(manageFeeOne)
							}
						})

						var workType
						var workTypeDay
						var workarr = e.value[0][3]
						workarr.forEach(item => {
							if (item == 0) {
								workType = 1
							}
							if (item == 1) {
								workTypeDay = 1
							}
						})
						var spouseHouse
						var spouseHouseHusband
						var spouseArr = e.value[0][4]
						spouseArr.forEach(item => {
							if (item == 0) {
								spouseHouse = 1
							}
							if (item == 1) {
								spouseHouseHusband = 1
							}
						})
						var workRequire
						var workRequireLong
						var workAyy = e.value[0][5]
						workAyy.forEach(item => {
							if (item == 0) {
								workRequireLong = 1
							}
							if (item == 1) {
								workRequire = 1
							}
						})
						var studentWorker
						var studentNotWorker
						var studebtArr = e.value[0][6]
						studebtArr.forEach(item => {
							if (item == 0) {
								studentWorker = 1
							}
							if (item == 1) {
								studentNotWorker = 1
							}
						})
						var nationals
						var nationalsNot
						var natArry = e.value[0][7]
						natArry.forEach(item => {
							if (item == 0) {
								nationals = 1
							}
							if (item == 1) {
								nationalsNot = 1
							}
						})
						uni.showLoading({
							title: "加载中"
						})
						uni.request({
							url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/company/query",
							method: 'POST',
							header: {
								"Content-Type": "application/json"
							},
							data: {
								ageOne: that.ageOne,
								ageTwo: that.ageTwo,
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
									that.flag = true
								} else {
									that.listDetail = ""
									uni.showToast({
										title: "未搜索到结果",
										icon: "none"
									})
								}
							}
						})
					} else {
						if (!this.$refs.child.flags) {
							console.log("的点点滴滴")
							this.onConfirm(this.addr)
							return false
						}
						var sex
						var sexMan
						var sexWoman
						var sexArr = e.value[0][1]
						sexArr.forEach(item => {
							if (item == "0") {
								sexMan = 1
							}
							if (item == "1") {
								sexWoman = 1
							}
							if (item == "2") {
								sex = 1
							}
						})
						var manageFee
						var manageFeeOne
						var Feearr = e.value[0][2]
						Feearr.forEach(item => {
							if (item == "0") {
								manageFee = 1
							}
							if (item == "1") {
								manageFeeOne = 1
							}
						})
						var workType
						var workTypeDay
						var workarr = e.value[0][3]
						workarr.forEach(item => {
							if (item == 0) {
								workType = 1
							}
							if (item == 1) {
								workTypeDay = 1
							}
						})
						var spouseHouse
						var spouseHouseHusband
						var spouseArr = e.value[0][4]
						spouseArr.forEach(item => {
							if (item == 0) {
								spouseHouse = 1
							}
							if (item == 1) {
								spouseHouseHusband = 1
							}
						})
						var workRequire
						var workRequireLong
						var workAyy = e.value[0][5]
						workAyy.forEach(item => {
							if (item == 0) {
								workRequireLong = 1
							}
							if (item == 1) {
								workRequire = 1
							}
						})
						var studentWorker
						var studentNotWorker
						var studebtArr = e.value[0][6]
						studebtArr.forEach(item => {
							if (item == 0) {
								studentWorker = 1
							}
							if (item == 1) {
								studentNotWorker = 1
							}
						})
						var nationals
						var nationalsNot
						var natArry = e.value[0][7]
						natArry.forEach(item => {
							if (item == 0) {
								nationals = 1
							}
							if (item == 1) {
								nationalsNot = 1
							}
						})
						uni.showLoading({
							title: "加载中"
						})
						uni.request({
							url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/company/query",
							method: 'POST',
							header: {
								"Content-Type": "application/json"
							},
							data: {
								ageOne: that.ageOne,
								ageTwo: that.ageTwo,
								sex,
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
								nationalsNot,
								city: that.city
							},
							success(res) {
								if (res.data.status == 200 && res.data.data.length !== 0) {
									uni.hideLoading()
									that.listDetail = res.data.data
									that.flag = true
								} else {
									that.listDetail = ""
									uni.showToast({
										title: "未搜索到结果",
										icon: "none"
									})
								}
							}
						})
					}
				}
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
					url: "https://ystx.xn--4gqr6isbv1bn21d.com/api/company/condition",
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
							that.flag = true
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
		watch: {
			'listDetail': function(val) {
				if (val.length == 0) {
					this.flag = false
				}
			}
		},
		onLoad(options) {
			this.val = options.val
			this.getsearch()
			this.filterData = data
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
		margin-top: -16rpx;
		width: 705rpx;
		height: 409rpx;

		image {
			height: 100%;
			width: 100%;
		}
	}

	.conten_center {
		position: absolute;
		top: 73rpx;
		left: 270rpx;
		min-height: 260rpx;
	}

	.portrait {
		height: 181rpx !important;
		width: 184rpx !important;
		border-radius: 50%;
		position: absolute;
		bottom: 115rpx;
		left: 83rpx;
	}

	.top_text {
		font-size: 26rpx;
		color: #333333;
		font-weight: 900;
		text-align: center;
		margin-top: 10rpx;
		// width: 362rpx;
		white-space: nowrap;
	}

	// .text {
	// 	font-size: 24rpx;
	// 	color: #D24C1F;
	// 	margin-top: 4rpx;
	// 	margin-left: -20rpx;
	// }

	// .text_defult {
	// 	color: #666666;
	// 	margin-left: 18rpx;
	// }
	.text {
		font-size: 24rpx;
		color: #D24C1F;
		margin-top: 8rpx;
		margin-left: 2rpx;
		font-weight: 600;
		letter-spacing: 2rpx;
	}

	.text_defult {
		color: #666666;
		letter-spacing: 0;
		margin-left: 8rpx;
	}

	.bottom_text {
		color: #ffffff;
		font-size: 24rpx;
		margin-top: 38rpx;
	}

	.tips {
		font-size: 28rpx;
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
		word-wrap: break-word;
		width: 23rpx;
		font-size: 24rpx;
		display: inline-block;
		color: #FFFFFF;
		position: absolute;
		right: 100rpx;
		top: 50%;
		transform: translateY(-50%);
		font-family: '黑体';
	}

	.imgs {
		width: 200rpx;
		height: 54rpx;
		margin-left: 24rpx;
		position: absolute;
		bottom: 22rpx;
		transform: scale(1.5);

		image {
			height: 100%;
			width: 100%;
			padding: 8rpx;
			box-sizing: content-box;
			border-radius: 16rpx;
			box-shadow: inset 2rpx 2rpx 7rpx 0px rgba(0, 0, 0, 0.6),
				inset -2rpx -2rpx 7rpx 0px rgba(255, 255, 255, 1),
				-2rpx -2rpx 7rpx 0px rgba(255, 255, 255, 1),
				2px 2px 7rpx 0px rgba(0, 0, 0, 0.6);
		}
	}

	.img_bars {
		height: calc(100vh - 80rpx);
		width: 100%;
		margin-top: 100rpx;

		image {
			border-radius: 25rpx;
			height: 964rpx;
			width: 705rpx;
		}
	}

	.portraitWrapper {
		position: absolute;
		bottom: 116rpx;
		left: 71rpx;
		height: 181rpx !important;
		width: 184rpx !important;
		transform: scale(1.1);
	}

	.content_top_btn {
		width: 100%;
		height: 110rpx;
		line-height: 110rpx;
		display: flex;
		justify-content: space-between;

		.btn_wrapper {
			position: relative;

			// width: 320rpx;
			.top_btn_image {
				width: 84rpx;
				height: 80rpx;
				position: absolute;
				left: 48rpx;
				top: 6rpx;
			}

			.top_btn_text {
				margin-left: 84rpx;
				color: #8E401A;
				font-size: 36rpx;
				font-family: '黑体';
				border-radius: 16rpx;
				display: inline;
			}
		}
	}
</style>
