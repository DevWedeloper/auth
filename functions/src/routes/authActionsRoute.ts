import { Router } from 'express';
import { login } from '../controllers/loginController';
import { logout } from '../controllers/logoutController';
import { refreshAccessToken } from '../controllers/refreshAccessTokenController';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshAccessToken);

export default router;
