module.exports = {
	registerError: {
		infocode: 1001,
		msg: '用户注册失败',
	},
	requiredFieldError: {
		infocode: 1002,
		msg: '缺少必填字段',
	},
	IncorrectValueTypeError: {
		infocode: 1003,
		msg: '传入值类型错误',
	},
	IncorrectValueLengthError: {
		infocode: 1004,
		msg: '传入字符长度出错',
	},
	BtfdError: {
		infocode: 1005,
		msg: '输入值格式错误',
	},
	uesrExistenceNameError: {
		infocode: 1006,
		msg: '用户名已存在',
	},
	uesrExistenceAccountError: {
		infocode: 1007,
		msg: '账号已存在',
	},
	uesrExistenceEmailError: {
		infocode: 1009,
		msg: '邮箱已存在',
	},
	uesrExistenceError: {
		infocode: 1010,
		msg: '信息获取失败',
	},
};
