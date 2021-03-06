const User = require('../models/user');

class userService {
	async registerAPI({ name, account, password, admin, email, visitor }) {
		if (admin !== undefined && visitor == undefined) {
			if (admin == true) {
				visitor = false;
			}
		}
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
	async accountDeleteAPI({ id }) {
		const res = await User.findByPk(id);
		if (res) await res.destroy();
		return res.dataValues;
	}
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
	async changeInformationAPI({
		id,
		name,
		account,
		password,
		admin,
		email,
		visitor,
	}) {
		const whereOpt = { id };
		const newUser = {};
		name && Object.assign(newUser, { name });
		account && Object.assign(newUser, { account });
		password && Object.assign(newUser, { password });
		admin && Object.assign(newUser, { admin });
		visitor && Object.assign(newUser, { visitor });
		email && Object.assign(newUser, { email });
		const res = await User.update(newUser, { where: whereOpt });
		console.log(newUser);
		return res[0] > 0 ? true : false;
	}
	async usersAPI() {
		const res = await User.findAll();
		return res;
	}
}

module.exports = new userService();
