import { Router } from 'express';
import {
  getAutoLogoutAtEndpoint,
  getRoleEndpoint,
  googleOAuthHandlerEndpoint,
  isLoggedInEndpoint,
  loginEndpoint,
  logoutEndpoint,
  refreshAccessTokenEndpoint,
} from '../controllers';

const router = Router();

router.post('/login', loginEndpoint);
router.post('/logout', logoutEndpoint);
router.post('/refresh', refreshAccessTokenEndpoint);
router.get('/isLoggedIn', isLoggedInEndpoint);
router.get('/getRole', getRoleEndpoint);
router.post('/sessions/oauth/google', googleOAuthHandlerEndpoint);
router.get('/autoLogoutAt', getAutoLogoutAtEndpoint);

export default router;
