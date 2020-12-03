<template>
	<view>
		<view class="daily_word" @click="goImg">
			<view class="txt">
				{{val.content}}
			</view>
			<view class="author">
				作者：{{val.author ? val.author :'无名氏'}}
			</view>
		</view>
		<view class="again">
			<u-button @click='getData' type="success" shape="circle" size="medium">换一句</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				val: {},
				clickNum: 0,
			};
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData() {
				uni.request({
					url: 'https://www.mxnzp.com/api/daily_word/recommend?count=1&app_id=' + this.APP_ID + '&app_secret=' + this.APP_SECRET,
					success: (res) => {
						console.log(res);
						this.val = res.data.data[0]
					}
				})
			},
			goImg() {
				if (this.clickNum < 4) {
					this.clickNum++
					this.$u.toast(`再点${5-this.clickNum}次有惊喜哦`)
				} else {
					uni.navigateTo({
						url: '../imgBox/imgBox'
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	.daily_word {
		min-height: 400rpx;
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
</style>
