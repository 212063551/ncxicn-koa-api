const { DataTypes } = require('sequelize');

const sql = require('../db/sql.js');

const User = sql.define(
	'api_users',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			comment: '用户名, 唯一',
		},
		account: {
			type: DataTypes.CHAR(64),
			allowNull: false,
			comment: '账号',
		},

		password: {
			type: DataTypes.CHAR(64),
			allowNull: false,
			comment: '密码',
		},
		email: {
			type: DataTypes.CHAR(64),
			allowNull: false,
			comment: '用户邮箱',
		},
		admin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			comment: '管理员权限',
		},
		visitor: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			comment: '访客权限',
		},
	},
	{
		freezeTableName: false,
	}
);
// User.sync({ force: true });

module.exports = User;
