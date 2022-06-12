const Koa = require('koa');
const views = require('koa-views');
const static = require('koa-static');
const cors = require('koa2-cors');
const KoaBody = require('koa-body');
const UserRouter = require('../routers/index.js');
const errorHandler = require('../config/errorHandler.js');

const app = new Koa();

app.use(cors());
// 设置public为默认目录
app.use(static('./public'));
app.use(views('views', { extension: 'ejs' }));
app.use(
	KoaBody({
		parsedMethods: ['POST', 'PUT', 'GET', 'DELETE'],
	})
);
app.use(UserRouter.routes());
app.on('error', errorHandler);

module.exports = app;
