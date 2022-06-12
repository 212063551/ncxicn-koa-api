const Router = require('@koa/router');
const parser = require('ua-parser-js');
// 获取当前设备信息
const router = new Router({ prefix: '/' });

router.get('/', async (ctx, next) => {
	let ua = parser(ctx.headers['user-agent']);
	let title = 'hello api请求页面!';
	await ctx.render('index', {
		code: 200,
		msg: '请求成功！',
		dataTitle: title,
		ua: ua,
		Browser: ua.browser.name,
		BrowserVersion: ua.browser.version,
		os: ua.os.name,
		osVersion: ua.os.version,
	});
});
module.exports = router;
