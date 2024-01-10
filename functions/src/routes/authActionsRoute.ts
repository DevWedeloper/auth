import { Router } from 'express';
import { getRole } from '../controllers/getRole';
import { isLoggedIn } from '../controllers/isLoggedIn';
import { login } from '../controllers/loginController';
import { logout } from '../controllers/logoutController';
import { refreshAccessToken } from '../controllers/refreshAccessTokenController';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshAccessToken);
router.get('/isLoggedIn', isLoggedIn);
router.get('/getRole', getRole);

export default router;
