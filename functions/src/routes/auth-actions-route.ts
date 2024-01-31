import { Router } from 'express';
import {
  getAutoLogoutAtEndpoint,
  getEmailEndpoint,
  getRoleEndpoint,
  googleOAuthHandlerEndpoint,
  isLoggedInEndpoint,
  loginEndpoint,
  logoutEndpoint,
  refreshAccessTokenEndpoint,
  requestEmailVerificationCodeEndpoint,
} from '../controllers';

const router = Router();

router.post('/login', loginEndpoint);
router.post('/logout', logoutEndpoint);
router.post('/refresh', refreshAccessTokenEndpoint);
router.get('/isLoggedIn', isLoggedInEndpoint);
router.get('/getEmail', getEmailEndpoint);
router.get('/getRole', getRoleEndpoint);
router.post('/sessions/oauth/google', googleOAuthHandlerEndpoint);
router.get('/autoLogoutAt', getAutoLogoutAtEndpoint);
router.post('/requestCode', requestEmailVerificationCodeEndpoint);

export default router;
