/**
 * 连接数据库
 */
const { Sequelize } = require('sequelize');
const { MYSQL_USER, MYSQL_PWD, MYSQL_HOST } = require('../config/config');

const sql = new Sequelize(MYSQL_USER, MYSQL_USER, MYSQL_PWD, {
	host: MYSQL_HOST,
	dialect: 'mysql',
	timezone: '+08:00',
	dialectOptions: {
		dateStrings: true,
		typeCast: true,
		pool: {
			max: 10, //连接池中最大连接数量
			min: 0, //连接池中最小连接数量
			idle: 10000, //如果一个线程10秒内没有被使用过，则释放线程
		},
	},
});
sql
	.authenticate()
	.then(() => {
		console.log('数据库连接成功');
	})
	.catch((err) => {
		console.log('数据库连接失败', err);
	});
module.exports = sql;
