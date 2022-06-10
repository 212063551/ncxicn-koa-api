const { registerAPI } = require('../services/user');
const { registerError } = require('../constant/err.typs');
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
				code: 1000,
				msg: '用户注册成功！',
				data: res.data,
			};
		} catch (error) {
			console.error('用户注册失败，请稍后重试！', error);
			ctx.app.emit('error', registerError, ctx);
		}
	}
	async login(ctx, next) {
		try {
		} catch (error) {}
	}
	async cpwd(ctx, next) {
		try {
		} catch (error) {}
	}
	async accountDelete(ctx, next) {
		try {
		} catch (error) {}
	}
}
module.exports = new Controller();
