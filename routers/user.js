const Router = require('@koa/router');

const router = new Router({ prefix: '/' });

const {
	register,
	login,
	cpwd,
	accountDelete,
	users,
} = require('../controllers/user');
const {
	IncomingCheck,
	AuthorityJudge,
	crpytPassword,
	Existential,
	auth,
	verifyLogin,
	ToClosePermissions,
} = require('../middlewares/user');

// 查找全部用户
router.get('users', auth, AuthorityJudge, users);
router.post('register', IncomingCheck, Existential, crpytPassword, register);
router.post('login', IncomingCheck, verifyLogin, login);
router.put('cpwd', auth, IncomingCheck, crpytPassword, cpwd);
router.delete('accountDelete', auth, AuthorityJudge, accountDelete);

module.exports = router;
