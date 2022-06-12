const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config/config');
const {
	registerAPI,
	uesrExistenceAPI,
	changeInformationAPI,
} = require('../services/user');
const {
	registerError,
	verifyLoginError,
	cpwdError,
	uesrExistenceError,
} = require('../constant/err.typs');
class Controller {
	async register(ctx, next) {
		const { name, account, password, admin, email, visitor } = ctx.request.body;
		try {
			const res = await registerAPI({
				name,
				account,
				password,
				admin,
				email,
				visitor,
			});
			ctx.body = {
				infocode: 1000,
				msg: '用户注册成功',
				data: res.data,
			};
		} catch (error) {
			console.error('用户注册失败，请稍后重试', error);
			ctx.app.emit('error', registerError, ctx);
		}
	}
	async login(ctx, next) {
		const { account } = ctx.request.body;
		try {
			const { password, ...res } = await uesrExistenceAPI({ account });
			ctx.body = {
				infocode: 1000,
				msg: '用户登录成功',
				token: jwt.sign(res, JWT_SECRET, { expiresIn: '1h' }),
				data: res,
			};
		} catch (error) {
			console.error('用户登录失败', error);
			return ctx.app.emit('error', verifyLoginError, ctx);
		}
	}
	async cpwd(ctx, next) {
		const id = ctx.state.user.id;
		const { Newpassword } = ctx.request.body;
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(Newpassword, salt);
		const password = hash;
		try {
			const NewCpwd = await changeInformationAPI({ id, password });
			if (NewCpwd == true) {
				return (ctx.body = { infocode: 1000, msg: '修改密码成功' });
			} else {
				console.error('修改密码失败');
				return ctx.app.emit('error', cpwdError, ctx);
			}
		} catch (error) {
			console.error(error);
			return ctx.app.emit('error', uesrExistenceError, ctx);
		}
	}
	async accountDelete(ctx, next) {
		try {
		} catch (error) {}
	}
}
module.exports = new Controller();
