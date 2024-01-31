import { Router } from 'express';
import {
  getAutoLogoutAtEndpoint,
  getRoleEndpoint,
  googleOAuthHandlerEndpoint,
  isLoggedInEndpoint,
  loginEndpoint,
  logoutEndpoint,
  refreshAccessTokenEndpoint,
  requestEmailVerificationCodeForLoggedInUserEndpoint,
  requestEmailVerificationCodeForNewEmailEndpoint,
} from '../controllers';

const router = Router();

router.post('/login', loginEndpoint);
router.post('/logout', logoutEndpoint);
router.post('/refresh', refreshAccessTokenEndpoint);
router.get('/isLoggedIn', isLoggedInEndpoint);
router.get('/getRole', getRoleEndpoint);
router.post('/sessions/oauth/google', googleOAuthHandlerEndpoint);
router.get('/autoLogoutAt', getAutoLogoutAtEndpoint);
router.post(
  '/requestCode/loggedInUser',
  requestEmailVerificationCodeForLoggedInUserEndpoint,
);
router.post(
  '/requestCode/newEmail',
  requestEmailVerificationCodeForNewEmailEndpoint,
);

export default router;
