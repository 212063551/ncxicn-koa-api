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
	IncomingCheckNameLthError: {
		infocode: 1004,
		msg: '用户名长度超出限制',
	},
	IncomingCheckNameTypeError: {
		infocode: 1005,
		msg: '用户名类型错误',
	},
	IncomingCheckAccountTypeError: {
		infocode: 1006,
		msg: '账号类型错误',
	},
	IncomingCheckPasswordTypeError: {
		infocode: 1007,
		msg: '密码类型错误',
	},

	IncomingCheckEmailTypeError: {
		infocode: 1009,
		msg: '邮箱类型错误',
	},

	AccountNumberFormatError: {
		infocode: 1011,
		msg: '账号格式不合法',
	},
	PasswordFormatError: {
		infocode: 1012,
		msg: '密码格式不合法',
	},
	EmailFormatError: {
		infocode: 1013,
		msg: '邮箱格式不合法',
	},
	tokenExpiredError: {
		infocode: 1014,
		msg: 'token已过期',
	},
	invalidTokenError: {
		infocode: 1015,
		msg: '无效的token',
	},
	ExistenceConflict: {
		infocode: 1016,
		msg: '管理员与访客不能同时存在',
	},
	ExistentialNameExistError: {
		infocode: 1017,
		msg: '用户已注册',
	},
	ExistentialAcctionExistError: {
		infocode: 1018,
		msg: '账号已注册',
	},
	ExistentialEmailExistError: {
		infocode: 1019,
		msg: '邮箱已注册',
	},
	ExistentialNameNoExistError: {
		infocode: 1020,
		msg: '用户不存在',
	},
	uesrExistenceError: {
		infocode: 1021,
		msg: '获取用户信息失败',
	},
	userPassWordError: {
		infocode: 1022,
		msg: '密码错误',
	},
	verifyLoginError: {
		infocode: 1023,
		msg: '用户登录失败',
	},
	ExistentialEmailNoExistError: {
		infocode: 1024,
		msg: '邮箱不存在',
	},
	usercpwdError: {
		infocode: 1025,
		msg: '修改密码失败',
	},
	UserPermissionConflictError: {
		infocode: 1026,
		msg: '用户权限冲突',
	},
	authorityManagementError: {
		infocode: 2000,
		msg: '抱歉，您没有权限',
	},
	// BtfdError: {
	// 	infocode: 1005,
	// 	msg: '输入值格式错误',
	// },
	// uesrExistenceNameError: {
	// 	infocode: 1006,
	// 	msg: '用户名已存在',
	// },
	// uesrExistenceAccountError: {
	// 	infocode: 1007,
	// 	msg: '账号已存在',
	// },
	// uesrExistenceEmailError: {
	// 	infocode: 1009,
	// 	msg: '邮箱已存在',
	// },

	// userAccountError: {
	// 	infocode: 1014,
	// 	msg: '账号不存在',
	// },

	// newPassWordError: {
	// 	infocode: 1016,
	// 	msg: '原密码错误',
	// },

	// userEmailsError: {
	// 	infocode: 1018,
	// 	msg: '邮箱不存在',
	// },
	// EmailError: {
	// 	infocode: 1019,
	// 	msg: '邮件格式错误',
	// },
	// AccountChineseError: {
	// 	infocode: 1020,
	// 	msg: '账号中不能存在中文',
	// },
	// passwordBlankError: {
	// 	infocode: 1021,
	// 	msg: '密码不能含有空格',
	// },
	// passwordChineseError: {
	// 	infocode: 1022,
	// 	msg: '密码中不能存在中文',
	// },
	// passwordSpecialError: {
	// 	infocode: 1023,
	// 	msg: '密码必须要含有一个特殊字符',
	// },
	// passwordLowerError: {
	// 	infocode: 1024,
	// 	msg: '密码必须要含有一个小写字母',
	// },
	// passwordNumeralError: {
	// 	infocode: 1025,
	// 	msg: '密码必须要含有一个大写字母',
	// },
	// cpwdError: {
	// 	infocode: 1025,
	// 	msg: '修改密码失败',
	// },
};
