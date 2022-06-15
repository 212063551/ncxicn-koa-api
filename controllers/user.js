const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const {
	registerAPI,
	uesrExistenceAPI,
	changeInformationAPI,
	usersAPI,
	accountDeleteAPI,
} = require('../services/user');
const {
	usercpwdError,
	registerError,
	verifyLoginError,
	ExistentialNameNoExistError,
	UserPermissionConflictError,
} = require('../constant/err.typs');
class Controller {
	async users(ctx, next) {
		try {
			const res = await usersAPI({});
			ctx.body = { infocode: 1000, msg: '查询成功', data: res };
		} catch (error) {
			console.error(error);
		}
	}
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
		const { account, email } = ctx.request.body;
		try {
			if (account !== undefined) {
				const { password, ...res } = await uesrExistenceAPI({ account });
				ctx.body = {
					infocode: 1000,
					msg: '用户登录成功',
					token: jwt.sign(res, JWT_SECRET, { expiresIn: '1h' }),
					data: res,
				};
			}
			if (email !== undefined) {
				const { password, ...res } = await uesrExistenceAPI({ email });
				ctx.body = {
					infocode: 1000,
					msg: '用户登录成功',
					token: jwt.sign(res, JWT_SECRET, { expiresIn: '1h' }),
					data: res,
				};
			}
		} catch (error) {
			console.error('用户登录失败', error);
			return ctx.app.emit('error', verifyLoginError, ctx);
		}
	}
	async cpwd(ctx, next) {
		const { id, account, email, password, visitor, admin } = ctx.request.body;
		// 非管理员只能修改自己的账号
		if (ctx.state.user.admin == true) {
			try {
				const res = await uesrExistenceAPI({ id });
				if (res) {
					if (res.admin == admin || res.visitor == visitor) {
						console.error('用户权限冲突');
						ctx.app.emit('error', UserPermissionConflictError, ctx);
					} else {
						const NewCpwd = await changeInformationAPI({
							id,
							account,
							email,
							password,
							visitor,
							admin,
						});
						if (NewCpwd == true) {
							return (ctx.body = {
								infocode: 1000,
								msg: '修改成功',
							});
						} else {
							console.error('修改失败');
							return ctx.app.emit('error', usercpwdError, ctx);
						}
					}
				} else {
					console.error('用户不存在');
					return ctx.app.emit('error', ExistentialNameNoExistError, ctx);
				}
			} catch (error) {}

			// try {
			// 	const NewCpwd = await changeInformationAPI({ password });
			// 	if (NewCpwd == true) {
			// 		return (ctx.body = { infocode: 1000, msg: '修改密码成功' });
			// 	} else {
			// 		console.error('修改密码失败');
			// 		return ctx.app.emit('error', cpwdError, ctx);
			// 	}
			// } catch (error) {
			// 	console.error(error);
			// 	return ctx.app.emit('error', uesrExistenceError, ctx);
			// }
		} else {
			const { id } = ctx.state.user;
			const { password } = ctx.request.body;
			const NewCpwd = await changeInformationAPI({ id, password });
			if (NewCpwd == true) {
				return (ctx.body = {
					infocode: 1000,
					msg: '修改成功',
				});
			} else {
				console.error('修改失败');
				return ctx.app.emit('error', usercpwdError, ctx);
			}
		}
	}
	async accountDelete(ctx, next) {
		const { id } = ctx.request.body;
		const res = await uesrExistenceAPI({ id });
		if (res) {
			try {
				await accountDeleteAPI({ id });
				ctx.body = {
					infocode: 1000,
					msg: '删除成功',
				};
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error('用户不存在');
			ctx.app.emit('error', ExistentialNameNoExistError, ctx);
		}
	}
}
module.exports = new Controller();
