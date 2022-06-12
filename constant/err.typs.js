module.exports = {
	registerError: {
		infocode: 1001,
		msg: '用户注册失败，请稍后重试',
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
	tokenExpiredError: {
		infocode: 1011,
		msg: 'token已过期',
	},
	invalidTokenError: {
		infocode: 1012,
		msg: '无效的token',
	},
	userAccountError: {
		infocode: 1014,
		msg: '账号不存在',
	},
	userPassWordError: {
		infocode: 1015,
		msg: '密码错误',
	},
	newPassWordError: {
		infocode: 1016,
		msg: '原密码错误',
	},
	verifyLoginError: {
		infocode: 1017,
		msg: '用户登录失败',
	},
	userEmailsError: {
		infocode: 1018,
		msg: '邮箱不存在',
	},
	EmailError: {
		infocode: 1019,
		msg: '邮件格式错误',
	},
	AccountChineseError: {
		infocode: 1020,
		msg: '账号中不能存在中文',
	},
	passwordBlankError: {
		infocode: 1021,
		msg: '密码不能含有空格',
	},
	passwordChineseError: {
		infocode: 1022,
		msg: '密码中不能存在中文',
	},
	passwordSpecialError: {
		infocode: 1023,
		msg: '密码必须要含有一个特殊字符',
	},
	passwordLowerError: {
		infocode: 1024,
		msg: '密码必须要含有一个小写字母',
	},
	passwordNumeralError: {
		infocode: 1025,
		msg: '密码必须要含有一个大写字母',
	},
	cpwdError: {
		infocode: 1025,
		msg: '修改密码失败',
	},
	authorityManagementError: {
		infocode: 2000,
		msg: '抱歉，您没有权限修改内容',
	},
};
