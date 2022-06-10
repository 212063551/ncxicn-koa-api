/**
 * 如果您不熟悉node.js,请勿删除或改动已下代码。
 *如需多个分离接口请在routers目录下兴建文件夹系统会自动识别
 */
const fs = require('fs');
const Router = require('@koa/router');
const router = new Router();

fs.readdirSync(__dirname).forEach((file) => {
	if (file !== 'index.js') {
		let r = require('./' + file);
		router.use(r.routes());
	}
});

module.exports = router;
