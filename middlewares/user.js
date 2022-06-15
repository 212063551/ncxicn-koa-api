const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const { uesrExistenceAPI } = require('../services/user');
const {
	IncomingCheckNameLthError,
	IncomingCheckNameTypeError,
	IncomingCheckAccountTypeError,
	IncomingCheckPasswordTypeError,
	IncomingCheckAdminTypeError,
	IncomingCheckEmailTypeError,
	IncomingCheckVisitorTypeError,
	AccountNumberFormatError,
	PasswordFormatError,
	EmailFormatError,
	tokenExpiredError,
	invalidTokenError,
	ExistenceConflict,
	ExistentialNameExistError,
	ExistentialAcctionExistError,
	ExistentialEmailExistError,
	uesrExistenceError,
	ExistentialNameNoExistError,
	userPassWordError,
	verifyLoginError,
	ExistentialEmailNoExistError,
	authorityManagementError,
} = require('../constant/err.typs');

const IncomingCheck = async (ctx, next) => {
	const { name, account, password, admin, email, visitor } = ctx.request.body;
	if (name !== undefined) {
		if (typeof name !== 'string') {
			console.error('用户名类型错误，非string类型');
			return ctx.app.emit('error', IncomingCheckNameTypeError, ctx);
		}
		if (name.length > 15) {
			console.error('用户名长度超出限制');
			return ctx.app.emit('error', IncomingCheckNameLthError, ctx);
		}
	}
	if (account !== undefined) {
		if (typeof account !== 'string') {
			console.error('账号类型错误，非string类型');
			return ctx.app.emit('error', IncomingCheckAccountTypeError, ctx);
		} else {
			const AccountNumberFormat = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/g;
			if (AccountNumberFormat.test(account) !== true) {
				console.error('账号格式不合法');
				return ctx.app.emit('error', AccountNumberFormatError, ctx);
			}
		}
	}
	if (password !== undefined) {
		if (typeof password !== 'string') {
			console.error('密码类型错误，非string类型');
			return ctx.app.emit('error', IncomingCheckPasswordTypeError, ctx);
		} else {
			const PasswordFormat = /^[a-zA-Z]\w{5,17}$/g;
			if (PasswordFormat.test(password) !== true) {
				console.error('密码格式不合法');
				return ctx.app.emit('error', PasswordFormatError, ctx);
			}
		}
	}
	if (admin !== undefined) {
		if (admin !== false && admin !== true) {
			console.log('管理员格式错误');
		}
	}
	if (email !== undefined) {
		if (typeof email !== 'string') {
			console.error('邮箱类型错误，非string类型');
			return ctx.app.emit('error', IncomingCheckEmailTypeError, ctx);
		} else {
			const Email =
				/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
			if (Email.test(email) !== true) {
				console.error('邮箱格式不合法');
				return ctx.app.emit('error', EmailFormatError, ctx);
			}
		}
	}
	if (visitor !== undefined) {
		if (visitor !== false && visitor !== true) {
			console.log('访客格式错误');
		}
	}
	if (admin !== undefined || visitor !== undefined) {
		if (admin == true && visitor == true) {
			console.error('管理员与访客不能同时存在');
			return ctx.app.emit('error', ExistenceConflict, ctx);
		}
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
const Existential = async (ctx, next) => {
	const { name, account, email } = ctx.request.body;
	if (name !== undefined) {
		try {
			const res = await uesrExistenceAPI({ name });
			if (res) {
				console.error('用户已注册');
				return ctx.app.emit('error', ExistentialNameExistError, ctx);
			}
		} catch (error) {
			console.error(error);
			return ctx.app.emit('error', uesrExistenceError, ctx);
		}
	}
	if (account !== undefined) {
		try {
			const res = await uesrExistenceAPI({ account });
			if (res) {
				console.error('账号已注册');
				return ctx.app.emit('error', ExistentialAcctionExistError, ctx);
			} else {
			}
		} catch (error) {
			console.error(error);
			return ctx.app.emit('error', uesrExistenceError, ctx);
		}
	}
	if (email !== undefined) {
		try {
			const res = await uesrExistenceAPI({ email });
			if (res) {
				console.error('邮箱已注册');
				return ctx.app.emit('error', ExistentialEmailExistError, ctx);
			}
		} catch (error) {
			console.error(error);
			return ctx.app.emit('error', uesrExistenceError, ctx);
		}
	}
	await next();
};
const AuthorityJudge = async (ctx, next) => {
	const { admin } = ctx.state.user;
	if (admin == true) {
		await next();
	} else {
		return ctx.app.emit('error', authorityManagementError, ctx);
	}
};
const ToClosePermissions = async (ctx, next) => {
	const { admin, visitor } = ctx.state.user;
	if (admin == false && visitor == false) {
		await next();
	}
	return ctx.app.emit('error', authorityManagementError, ctx);
};
const verifyLogin = async (ctx, next) => {
	const { account, password, email } = ctx.request.body;
	try {
		if (account !== undefined) {
			const res = await uesrExistenceAPI({ account });
			if (!res) {
				console.error('账号不存在', { account });
				return ctx.app.emit('error', ExistentialNameNoExistError, ctx);
			} else {
				if (res.account !== account) {
					console.error('用户与密码不匹配');
				} else {
					ctx.state.password = res.password;
				}
			}
		}
		if (email !== undefined) {
			const res = await uesrExistenceAPI({ email });

			if (!res) {
				console.error('邮箱不存在', { account });
				return ctx.app.emit('error', ExistentialEmailNoExistError, ctx);
			} else {
				if (res.email !== email) {
					console.error('用户与密码不匹配');
				} else {
					ctx.state.password = res.password;
				}
			}
		}
		if (!bcrypt.compareSync(password, ctx.state.password)) {
			console.log('密码错误！');
			return ctx.app.emit('error', userPassWordError, ctx);
		}
	} catch (err) {
		console.error('用户登录失败', error);
		return ctx.app.emit('error', verifyLoginError, ctx);
	}
	await next();
};

module.exports = {
	IncomingCheck,
	crpytPassword,
	Existential,
	auth,
	AuthorityJudge,
	verifyLogin,
	ToClosePermissions,
};
