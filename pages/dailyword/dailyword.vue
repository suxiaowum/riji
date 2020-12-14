<template>
	<view>
		<view class="tianqi_word">
			<u-row>
				<u-col span="12">
					<view class="tianqiName">
						{{tianqi.city.data ? tianqi.city.data:'' }}
					</view>
				</u-col>
			</u-row>
			<u-row gutter="16">
				<u-col span="6">
					<view class="tianqiName">
						天气：
					</view>
				</u-col>
				<u-col span="6">
					<view class="tianqiVal">
						{{tianqi.weather.data ? tianqi.weather.data:'无数据' }}
					</view>
				</u-col>
			</u-row>
			<u-row gutter="16">
				<u-col span="6">
					<view class="tianqiName">
						气温：
					</view>
				</u-col>
				<u-col span="6">
					<view class="tianqiVal">
						{{tianqi.temperature.data ? tianqi.temperature.data:'无数据' }}
					</view>
				</u-col>
			</u-row>
			<u-row gutter="16">
				<u-col span="6">
					<view class="tianqiName">
						风速：
					</view>
				</u-col>
				<u-col span="6">
					<view class="tianqiVal">
						{{tianqi.winddirection.data ? tianqi.winddirection.data:'无数据' }} --
						{{tianqi.windpower.data?tianqi.windpower.data:''}}
					</view>
				</u-col>
			</u-row>
			<u-row gutter="16">
				<u-col span="6">
					<view class="tianqiName">
						湿度：
					</view>
				</u-col>
				<u-col span="6">
					<view class="tianqiVal">
						{{tianqi.humidity.data ? tianqi.humidity.data:'无数据' }}
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="daily_word" @click="goImg">
			<view class="txt">
				{{val.content}}
			</view>
			<view class="author">
				作者：{{val.author ? val.author :'无'}}
			</view>
		</view>
		<!-- <view class="gopage">
			<navigator url="../jizhang/jizhang" hover-class="navigator-hover">
				去记账
			</navigator>
			<navigator url="../zhangben/zhangben" hover-class="navigator-hover">
				看账本
			</navigator>
		</view> -->
		<view class="again">
			<u-button @click='getData' type="success" shape="circle" size="medium">换一句</u-button>
		</view>
		<button type="default" @click="getdingyu">订阅</button>
	</view>
</template>

<script>
	import amap from '../../static/amap-wx.js';
	import CosAuth from '../../static/cos.js'
	export default {
		data() {
			return {
				val: {},
				clickNum: 0,
				tianqi: {
					humidity: "",
					temp: "",
					weather: "",
					windDirection: "",
					windPower: "",
				},
				Bucket: 'jpvideo-1303815612',
				Region: 'ap-nanjing',
				prefix:'https://jpvideo-1303815612.cos.ap-nanjing.myqcloud.com/',
				amapPlugin: new amap.AMapWX({
					key: 'cf28af542b7fb05eced50d62f8f00056',
				}),

			};
		},
		onLoad() {
			this.getData()
			this.getTianqi()
			this.getTianqi()

		},
		methods: {

			getdingyu() {
				wx.chooseVideo({
					complete: (res) => {
						console.log(res);
					}
				})

			},


			getTianqi() {
				this.amapPlugin.getWeather({
					success: (data) => {
						console.log(data)
						this.tianqi = data
					},
					fail: (err) => {
						console.log(err);
						this.$u.toast('获取位置失败，请开启定位')
					}
				});
			},
			getData() {
				uni.request({
					url: 'https://www.mxnzp.com/api/daily_word/recommend?count=1&app_id=' + this.APP_ID + '&app_secret=' + this.APP_SECRET,
					success: (res) => {
						console.log(res);
						this.val = res.data.data[0]
					},

				})
			},
			goImg() {
				if (this.clickNum < 4) {
					this.clickNum++
					this.$u.toast(`再点${5-this.clickNum}次有惊喜哦`)
				} else {
					// uni.navigateTo({
					// 	url: '../imgBox/imgBox'
					// })
					this.$u.toast('啥也没有，嘻嘻嘻')
				}

			},
		}
	}
</script>

<style lang="scss">
	.tianqi_word {

		padding: 50rpx;
		width: 90%;
		margin: 50rpx auto;
		border-radius: 20rpx;
		background: #00FFCC;
		padding-top: 50rpx;

	}

	.daily_word {
		min-height: 300rpx;
		// line-height: 100rpx;
		padding: 20rpx;
		width: 90%;
		margin: 50rpx auto;
		border-radius: 20rpx;
		background: #00FFCC;
		padding-top: 50rpx;

		// text-align: center;
		.txt {
			font-size: 30rpx;
		}

		.author {
			margin-top: 40rpx;
			font-size: 24rpx;
			text-align: center;
		}
	}

	.again {
		text-align: center;
		position: fixed;
		width: 100%;
		bottom: 60rpx;
	}

	.tianqiName {
		text-align: center;
		line-height: 50rpx;
	}

	.tianqiVal {
		text-align: center;
		line-height: 50rpx;
		color: red;
	}

	.gopage {
		text-align: center;
		line-height: 40rpx;
		color: #00FFCC;
		font-size: 22rpx;
	}
</style>
