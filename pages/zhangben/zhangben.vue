<template>
	<view>
		<view class="box" v-for="(item,index) in list" :key='index'>
			<view class="time">
				{{item.title}}
			</view>
			<view class="data">
				{{item.content}}
			</view>
			<view class="delete">
				<u-icon name="trash-fill" color="red" @click="deleteFun(item,index)"></u-icon>
			</view>
		</view>
		<view class="gopage">
			<navigator url="../jizhang/jizhang" hover-class="navigator-hover">
				去记账
			</navigator>
		</view>
		<view class="zanw" v-if="!list.length">
			还没有数据哦~
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				uInfo: null,
				first: false
			};
		},
		onLoad() {
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.uInfo = res.data
					this.getList()
					this.first = true;
				},
				fail: () => {
					uni.showLoading({
						title: '正在登录'
					})
					uni.login({
						provider: 'weixin',
						success: (res) => {
							console.log(res);
							uniCloud.callFunction({
								name: 'wxlogin',
								data: {
									code: res.code
								},
								success: (msg) => {
									console.log(msg);
									this.$u.toast(msg.result.message)
									uni.setStorage({
										key: 'userInfo',
										data: msg.result.userInfo
									})
									this.uInfo = msg.result.userInfo
									this.getList()
									this.first = true;
									uni.hideLoading()
								},
								fail: (err) => {
									console.log(err);
									this.$u.toast(err.result.message)
								}
							})
						}
					})
				}
			})
		},
		onShow() {
			if (this.first) {
				this.getList()
			}
		},
		methods: {
			getList() {
				uniCloud.callFunction({
					name: 'getZhangben',
					data: {
						user_id: this.uInfo._id
					},
					success: (res) => {
						console.log(res);
						this.list = res.result.data.reverse()
					},
					complete: (err) => {
						console.log(err);
					}
				})
			},
			deleteFun(item, index) {
				console.log(index);
				uni.showModal({
					title: '删除吗？',
					success: (res) => {
						console.log(res);
						if (res.confirm) {
							uniCloud.callFunction({
								name: 'deleteZhang',
								data: {
									id: item._id
								},
								success: (res) => {
									console.log(res);
									if (res.result.deleted) {
										this.list.splice(index, 1)
										this.$u.toast('删除成功')
									}
								}
							})
						}
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.box {
		min-height: 400rpx;
		padding: 20rpx;
		width: 90%;
		margin: 50rpx auto;
		border-radius: 20rpx;
		background: #00FFCC;
		position: relative;
	}

	.time {
		font-size: 24rpx;
		background: #FFFFFF;
		line-height: 50rpx;
		border-radius: 10rpx;
		text-align: center;
	}

	.data {
		margin-top: 20rpx;
	}

	.delete {
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
	}

	.zanw {
		text-align: center;
		font-size: 26rpx;
		color: red;
		margin-top: 40rpx;
	}

	.gopage {
		text-align: center;
		line-height: 40rpx;
		color: #00FFCC;
		font-size: 40rpx;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
	}
</style>
