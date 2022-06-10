const bcrypt = require('bcryptjs');
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
} = require('../constant/err.typs');

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
	const blank = /\s+/g;
	const lower = /^(?=.*[a-z])/;
	const majuscule = /^(?=.*[A-Z])/;
	const Chinese = /[\u4e00-\u9fa5]/;
	const char = /^(?=.*[!@#$%^&*?\(\)])/;
	const Mail =
		/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
	if (!Mail.test(email)) {
		console.log('邮件格式错误');
		return ctx.app.emit('error', BtfdError, ctx);
	}
	if (Chinese.test(account)) {
		console.log('账号中不能存在中文');
		return ctx.app.emit('error', BtfdError, ctx);
	}
	if (blank.test(password)) {
		console.log('传入值不能含有空格');
		ctx.app.emit('error', BtfdError, ctx);
		return;
	}
	if (Chinese.test(password)) {
		console.log('密码中不能存在中文');
		return ctx.app.emit('error', BtfdError, ctx);
	}
	if (!char.test(password)) {
		console.log('密码必须要含有一个特殊字符');
		return ctx.app.emit('error', BtfdError, ctx);
	}
	if (!lower.test(password)) {
		console.log('密码必须要含有一个小写字母');
		return ctx.app.emit('error', BtfdError, ctx);
	}
	if (!majuscule.test(password)) {
		console.log('密码必须要含有一个大写字母');
		return ctx.app.emit('error', BtfdError, ctx);
	}
	await next();
};
const uesrExistence = async (ctx, next) => {
	const { name, account, email } = ctx.request.body;
	try {
		const names = await uesrExistenceAPI({ name });
		const accounts = await uesrExistenceAPI({ account });
		const emails = await uesrExistenceAPI({ email });
		console.log(names);
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
	// hash保存的是 密文
	const hash = bcrypt.hashSync(password, salt);

	ctx.request.body.password = hash;

	await next();
};
module.exports = { IncomingCheck, Btfd, uesrExistence, crpytPassword };
