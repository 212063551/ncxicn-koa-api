const Router = require('@koa/router');

const router = new Router({ prefix: '/' });

const { register, login, cpwd, accountDelete } = require('../controllers/user');
const {
	IncomingCheck,
	Btfd,
	uesrExistence,
	crpytPassword,
	verifyLogin,
	auth,
	NewPwdA,
} = require('../middlewares/user');

router.post(
	'register',
	IncomingCheck,
	Btfd,
	uesrExistence,
	crpytPassword,
	register
);
router.post('login', verifyLogin, login);
router.put('cpwd', auth, NewPwdA, cpwd);
router.delete('accountDelete', accountDelete);

module.exports = router;
