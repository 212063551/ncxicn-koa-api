module.exports = (err, ctx) => {
	let status = 500;
	switch (err.code) {
		//请求错误
		case '400':
			status = 400;
			break;
		// 验证未授权
		case '401':
			status = 401;
			break;
		// 服务器拒绝请求
		case '403':
			status = 403;
			break;
		// 请求未找到
		case '404':
			status = 404;
			break;
		// 请求超时
		case '408':
			status = 408;
			break;
		// 资源已删除
		case '409':
			status = 409;
			break;
		default:
			status = 500;
	}
	ctx.status = status;
	ctx.body = err;
};
