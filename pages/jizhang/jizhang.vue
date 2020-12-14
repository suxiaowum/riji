<template>
	<view>
		<view class="date">
			<u-button type="default" size="medium" @click="show = true">{{date}}</u-button>
		</view>
		<view class="dateTxt">
			<u-input v-model="value" type="textarea" :border="true" :auto-height="true" :height="200" />
		</view>
		<view class="saveBox">
			<u-button type="success" :plain="true" shape="circle" @click="saveValue">保存</u-button>
		</view>
		<u-picker mode="time" v-model="show" :params="params" start-year="2020" @confirm="getTime"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				show: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},
				userInfo: null,
				date: '选择时间'
			};
		},
		onLoad() {
			uni.showLoading({
				title: '正在登录'
			})
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.userInfo = res.data
					this.date = this.$u.timeFormat(new Date().getTime(), 'yyyy.mm.dd hh:MM');
					uni.hideLoading()
				},
				fail: () => {
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
									this.date = this.$u.timeFormat(new Date().getTime(), 'yyyy.mm.dd hh:MM');
									uni.setStorage({
										key: 'userInfo',
										data: msg.result.userInfo
									})
									this.userInfo = msg.result.userInfo
									uni.hideLoading()
								},
								fail: (err) => {
									this.$u.toast(err.result.message)
								}
							})
						}
					})
				}
			})

		},
		methods: {
			saveValue() {
				console.log(this.value);
				if (this.value !== '') {
					uniCloud.callFunction({
						name: 'saveVal',
						data: {
							user_id: this.userInfo._id,
							content: this.value,
							title: this.date
						},
						success: (res) => {
							console.log(res);
							this.$u.toast('保存成功')
							this.value = ''
						},
						complete: (err) => {
							console.log(err);
						}
					})
				} else {
					this.$u.toast('还没记住啊~')
				}

			},
			getTime(val) {
				console.log(val);
				this.date = `${val.year}.${val.month}.${val.day} ${val.hour}:${val.minute}`
			}

		}
	}
</script>

<style lang="scss">
	.date {
		text-align: center;
		margin-top: 20rpx;

	}

	.dateTxt {
		margin-top: 20rpx;
		padding: 20rpx;
	}

	.saveBox {
		position: fixed;
		text-align: center;
		width: 100%;
		bottom: 40rpx;
		padding: 0 40rpx;
	}
</style>
