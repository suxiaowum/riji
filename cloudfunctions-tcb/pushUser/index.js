'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		username,
		password
	} = event

	const res = await uniID.register({
		username,
		password
	})
	//返回数据给客户端
	return res
};
