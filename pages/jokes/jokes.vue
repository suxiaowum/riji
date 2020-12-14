<template>
	<view>
		<view class="jock" v-for="(item,index) in list" :key='index' @click="goImg">
			{{item.content}}
		</view>
		<view class="pageBox">
			<u-number-box v-model="index" @change="getJock" :max="maxNum" :min="1"></u-number-box>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: null,
				index: 1,
				maxNum: 99,
				clickNum: 0,
			};
		},
		onLoad() {
			this.getJock()
		},
		methods: {
			getJock() {
				uni.request({
					url: 'https://www.mxnzp.com/api/jokes/list?page=' + this.index + '&app_id=' + this.APP_ID + '&app_secret=' +
						this
						.APP_SECRET,
					success: (res) => {
						console.log(res);
						this.maxNum = res.data.data.totalPage
						this.list = res.data.data.list
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 300
						});
					}
				})
			},
			goImg() {
				if (this.clickNum < 4) {
					this.clickNum++
					this.$u.toast(`再点${5-this.clickNum}次有惊喜哦`)
				} else {
					/* uni.navigateTo({
						url: '../imgBox/imgBox'
					}) */
					this.$u.toast('啥也没有，嘻嘻嘻')
				}

			}
		}
	}
</script>

<style lang="scss">
	.jock {
		min-height: 400rpx;
		// line-height: 100rpx;
		padding: 20rpx;
		width: 90%;
		margin: 50rpx auto;
		border-radius: 20rpx;
		background: #00FFCC;
		padding-top: 50rpx;
		line-height: 50rpx;
	}

	.pageBox {
		text-align: center;
		margin-bottom: 50rpx;
	}
</style>
