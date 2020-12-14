<template>
	<view class="content">
		<!-- <view class="top" @click="show = true">
			<u-image v-if="show" width="100%" height="700" :src="src" mode="aspectFit">
				<u-loading slot="loading"></u-loading>
			</u-image>
		</view> -->
		<view class="dateTxt">
			{{new Date().getTime() | date('yyyy年mm月dd日')}}
		</view>
		<view class="top" v-for="(item,index) in newDays" :key='index' @click="goImg">
			<view class="dateTitle">
				{{item.title}}
			</view>
			<u-image width="100%" height="700" :src="item.picUrl" mode="aspectFit">
				<u-loading slot="loading"></u-loading>
			</u-image>
		</view>
		<!-- <view class="btnBox">
			<u-button @click='getNewimg' type="success" shape="circle" size="medium">换一张</u-button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				src: 'https://api.66mz8.com/api/rand.tbimg.php',
				index: 0,
				newDays: null,
				clickNum: 0,
			}
		},
		onLoad() {
			uni.login({
				provider: 'weixin',
				success: (res) => {
					this.getNewDay()
					uni.showLoading()
				}
			})
		},
		methods: {

			getNewDay() {
				uni.request({
					url: 'https://www.mxnzp.com/api/history/today?type=0&app_id=' + this.APP_ID + '&app_secret=' + this.APP_SECRET,
					success: (res) => {
						console.log(res);
						this.newDays = res.data.data
						this.$nextTick(function() {
							uni.hideLoading()
						})
					}
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

			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.top {
		min-height: 400rpx;
		line-height: 100rpx;
		padding: 20rpx;
		width: 90%;
		margin: 50rpx auto;
		border-radius: 20rpx;
		background: #00FFCC;
	}

	.btnBox {
		text-align: center;
	}

	.dateTxt {
		text-align: center;
		padding: 20rpx;
		font-size: 40rpx;
		color: red;
	}

	.dateTitle {
		text-align: center;
		font-size: 30rpx;
		color: #000;
	}
</style>
