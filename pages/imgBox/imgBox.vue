<template>
	<view>
		<view class="top" @click="show = true">
			<u-image v-if="show" width="100%" height="700" :src="src" mode="aspectFit">
				<u-loading slot="loading"></u-loading>
			</u-image>
		</view>
		<view class="btnBox">
			<u-button @click='getNewimg' type="success" shape="circle" size="medium">换一张</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				src: 'https://api.66mz8.com/api/rand.tbimg.php',
				index: 0,
			};
		},
		onLoad() {
			this.getNewimg()
		},
		methods: {
			getNewimg() {
				this.show = false
				this.index++
				this.src = ''
				this.$nextTick(function() {
					this.show = true
					this.src = 'https://api.66mz8.com/api/rand.tbimg.php?v=' + this.index
					if (this.index > 99) {
						this.index = 0
					}
				})
			},
		}
	}
</script>

<style lang="scss">
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
</style>
