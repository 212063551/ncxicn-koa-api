const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const { uesrExistenceAPI } = require('../services/user');
const {
	BtfdError,
	requiredFieldError,
	IncorrectValueTypeError,
	IncorrectValueLengthError,
	uesrExistenceNameError,
	uesrExistenceAccountError,
	uesrExistenceEmailError,
	uesrExistenceError,
	tokenExpiredError,
	invalidTokenError,
	userAccountError,
	userPassWordError,
	userEmailsError,
	newPassWordError,
	EmailError,
	AccountChineseError,
	passwordBlankError,
	passwordChineseError,
	passwordSpecialError,
	passwordLowerError,
	passwordNumeralError,
	authorityManagementError,
} = require('../constant/err.typs');

const blank = /\s+/g;
const lower = /^(?=.*[a-z])/;
const majuscule = /^(?=.*[A-Z])/;
const Chinese = /[\u4e00-\u9fa5]/;
const char = /^(?=.*[!@#$%^&*?\(\)])/;
const Mail =
	/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

const IncomingCheck = async (ctx, next) => {
	const { name, account, password, admin, email, visitor } = ctx.request.body;
	/*
	 * Restrict the type and length of incoming values，This is required value
	 */
	if (name == undefined) {
		console.error('name为必传字段');
		return ctx.app.emit('error', requiredFieldError, ctx);
	} else {
		if (typeof name != 'string') {
			console.error('传入值类型错误');
			return ctx.app.emit('error', IncorrectValueTypeError, ctx);
		} else {
			const Chinese = /[\u4e00-\u9fa5]/;
			if (Chinese.test(name) == true) {
				if (name.length > 8) {
					console.error('传入字符长度出错');
					return ctx.app.emit('error', IncorrectValueLengthError, ctx);
				}
			} else {
				if (name.length > 14) {
					console.error('传入字符长度出错');
					return ctx.app.emit('error', IncorrectValueLengthError, ctx);
				}
			}
		}
	}
	if (account == undefined) {
		console.error('account为必填字段');
		return ctx.app.emit('error', requiredFieldError, ctx);
	} else {
		if (typeof account != 'string') {
			console.error('传入值类型错误');
			return ctx.app.emit('error', IncorrectValueTypeError, ctx);
		} else {
			if (account.length < 8 || account.length > 14) {
				console.error('传入字符长度出错');
				return ctx.app.emit('error', IncorrectValueLengthError, ctx);
			}
		}
	}
	if (password == undefined) {
		console.error('password为必填字段');
		return ctx.app.emit('error', requiredFieldError, ctx);
	} else {
		if (typeof password != 'string') {
			console.error('传入值类型错误');
			return ctx.app.emit('error', IncorrectValueTypeError, ctx);
		} else {
			if (password.length < 8 || password.length > 14) {
				console.error('传入字符长度出错');
				return ctx.app.emit('error', IncorrectValueLengthError, ctx);
			}
		}
	}
	if (email == undefined) {
		console.error('email为必填字段');
		return ctx.app.emit('error', requiredFieldError, ctx);
	} else {
		if (typeof email != 'string') {
			console.error('传入值类型错误');
			return ctx.app.emit('error', IncorrectValueTypeError, ctx);
		}
	}
	/*
	 * This is optional，The default generated
	 */
	if (admin) {
		if (typeof admin != 'number') {
			console.error('传入值类型错误');
			return ctx.app.emit('error', IncorrectValueTypeError, ctx);
		}
	}
	if (visitor) {
		if (typeof visitor != 'number') {
			console.error('传入值类型错误');
			return ctx.app.emit('error', IncorrectValueTypeError, ctx);
		}
	}
	await next();
};
const Btfd = async (ctx, next) => {
	const { account, password, email } = ctx.request.body;
	if (!Mail.test(email)) {
		console.log('邮件格式错误');
		return ctx.app.emit('error', EmailError, ctx);
	}
	if (Chinese.test(account)) {
		console.log('账号中不能存在中文');
		return ctx.app.emit('error', AccountChineseError, ctx);
	}
	if (blank.test(password)) {
		console.log('密码不能含有空格');
		ctx.app.emit('error', passwordBlankError, ctx);
		return;
	}
	if (Chinese.test(password)) {
		console.log('密码中不能存在中文');
		return ctx.app.emit('error', passwordChineseError, ctx);
	}
	if (!char.test(password)) {
		console.log('密码必须要含有一个特殊字符');
		return ctx.app.emit('error', passwordSpecialError, ctx);
	}
	if (!lower.test(password)) {
		console.log('密码必须要含有一个小写字母');
		return ctx.app.emit('error', passwordLowerError, ctx);
	}
	if (!majuscule.test(password)) {
		console.log('密码必须要含有一个大写字母');
		return ctx.app.emit('error', passwordNumeralError, ctx);
	}
	await next();
};
const uesrExistence = async (ctx, next) => {
	const { name, account, email } = ctx.request.body;
	try {
		const names = await uesrExistenceAPI({ name });
		const accounts = await uesrExistenceAPI({ account });
		const emails = await uesrExistenceAPI({ email });
		if (names) {
			console.error('用户名已存在');
			return ctx.app.emit('error', uesrExistenceNameError, ctx);
		}
		if (accounts) {
			console.error('账户已存在');
			return ctx.app.emit('error', uesrExistenceAccountError, ctx);
		}
		if (emails) {
			console.error('邮箱已被注册');
			return ctx.app.emit('error', uesrExistenceEmailError, ctx);
		}
	} catch (error) {
		console.error('信息获取失败', error);
		return ctx.app.emit('error', uesrExistenceError, ctx);
	}
	await next();
};
const crpytPassword = async (ctx, next) => {
	const { password } = ctx.request.body;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	ctx.request.body.password = hash;
	await next();
};
const auth = async (ctx, next) => {
	const { authorization = '' } = ctx.request.header;
	const token = authorization.replace('Bearer ', '');
	try {
		const user = jwt.verify(token, JWT_SECRET);
		ctx.state.user = user;
	} catch (error) {
		switch (error.name) {
			case 'TokenExpiredError':
				console.error('token已过期', error);
				return ctx.app.emit('error', tokenExpiredError, ctx);
			case 'JsonWebTokenError':
				console.error('无效的token', error);
				return ctx.app.emit('error', invalidTokenError, ctx);
		}
	}
	await next();
};
const verifyLogin = async (ctx, next) => {
	const { account, password, email } = ctx.request.body;
	try {
		const res = await uesrExistenceAPI({ account });
		const emails = await uesrExistenceAPI({ email });
		if (email != undefined) {
			if (typeof email != 'string') {
				console.error('传入值类型错误');
				return ctx.app.emit('error', IncorrectValueTypeError, ctx);
			} else {
				if (!Mail.test(email)) {
					console.log('邮件格式错误');
					return ctx.app.emit('error', BtfdError, ctx);
				} else {
					if (!emails) {
						console.error('邮箱不存在', { email });
						return ctx.app.emit('error', userEmailsError, ctx);
					}
				}
			}
		}
		if (account != undefined) {
			if (typeof account != 'string') {
				console.error('传入值类型错误');
				return ctx.app.emit('error', IncorrectValueTypeError, ctx);
			} else {
				if (account.length < 8 || account.length > 14) {
					console.error('传入字符长度出错');
					return ctx.app.emit('error', IncorrectValueLengthError, ctx);
				} else {
					if (!res) {
						console.error('账号不存在', { account });
						return ctx.app.emit('error', userAccountError, ctx);
					}
				}
			}
		}
		if (!bcrypt.compareSync(password, res.password)) {
			console.error('密码错误');
			return ctx.app.emit('error', userPassWordError, ctx);
		}
	} catch (err) {
		console.error('信息获取失败', error);
		return ctx.app.emit('error', uesrExistenceError, ctx);
	}
	await next();
};
const NewPwdA = async (ctx, next) => {
	const { password, Newpassword } = ctx.request.body;
	const account = ctx.state.user.account;
	const res = await uesrExistenceAPI({ account });
	if (bcrypt.compareSync(password, res.password) !== true) {
		console.error('原密码错误');
		return ctx.app.emit('error', newPassWordError, ctx);
	}
	if (blank.test(Newpassword)) {
		console.log('密码不能含有空格');
		ctx.app.emit('error', passwordBlankError, ctx);
		return;
	}
	if (Chinese.test(Newpassword)) {
		console.log('密码中不能存在中文');
		return ctx.app.emit('error', passwordChineseError, ctx);
	}
	if (!char.test(Newpassword)) {
		console.log('密码必须要含有一个特殊字符');
		return ctx.app.emit('error', passwordSpecialError, ctx);
	}
	if (!lower.test(Newpassword)) {
		console.log('密码必须要含有一个小写字母');
		return ctx.app.emit('error', passwordLowerError, ctx);
	}
	if (!majuscule.test(Newpassword)) {
		console.log('密码必须要含有一个大写字母');
		return ctx.app.emit('error', passwordNumeralError, ctx);
	}
	if (password.length < 8 || password.length > 14) {
		console.error('传入字符长度出错');
		return ctx.app.emit('error', IncorrectValueLengthError, ctx);
	}
	await next();
};

module.exports = {
	IncomingCheck,
	Btfd,
	uesrExistence,
	crpytPassword,
	verifyLogin,
	auth,
	NewPwdA,
};
