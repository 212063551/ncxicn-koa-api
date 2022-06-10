const User = require('../models/user');

class userService {
	async registerAPI({ name, account, password, admin, email, visitor }) {
		const res = await User.create({
			name,
			account,
			password,
			admin,
			email,
			visitor,
		});
		return res;
	}
	async loginAPI({}) {}
	async cpwdAPI({}) {}
	async accountDeleteAPI({}) {}
	/*
	 * Check whether the user exists
	 */
	async uesrExistenceAPI({
		id,
		name,
		account,
		password,
		admin,
		email,
		visitor,
	}) {
		const whereOpt = {};
		id && Object.assign(whereOpt, { id });
		name && Object.assign(whereOpt, { name });
		account && Object.assign(whereOpt, { account });
		password && Object.assign(whereOpt, { password });
		admin && Object.assign(whereOpt, { admin });
		email && Object.assign(whereOpt, { email });
		visitor && Object.assign(whereOpt, { visitor });
		const res = await User.findOne({
			attributes: [
				'id',
				'name',
				'account',
				'password',
				'admin',
				'email',
				'visitor',
			],
			where: whereOpt,
		});
		return res ? res.dataValues : null;
	}
}

module.exports = new userService();
