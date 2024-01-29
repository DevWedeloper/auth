import { Router } from 'express';
import {
  checkResetPasswordTokenExistenceEndpoint,
  createUserEndpoint,
  deleteUserByEmailEndpoint,
  forgotPasswordEndpoint,
  getAllUsersEndpoint,
  getUserByIdEndpoint,
  isEmailUniqueEndpoint,
  isUsernameUniqueEndpoint,
  resetPasswordEndpoint,
  updateEmailByEmailEndpoint,
  updatePasswordByEmailEndpoint,
  updateUsernameByEmailEndpoint,
} from '../controllers';
import {
  isTokenFromUserMiddleware,
  restrictedUserActionsMiddleware,
} from '../middlewares';

const router = Router();

router.post('/', createUserEndpoint);
router.get('/', getAllUsersEndpoint);
router.get('/unique/email/:email', isEmailUniqueEndpoint);
router.get('/unique/username/:username', isUsernameUniqueEndpoint);
router.put(
  '/updateEmail',
  isTokenFromUserMiddleware,
  restrictedUserActionsMiddleware,
  updateEmailByEmailEndpoint,
);
router.put(
  '/updatePassword',
  isTokenFromUserMiddleware,
  restrictedUserActionsMiddleware,
  updatePasswordByEmailEndpoint,
);
router.put(
  '/updateUsername',
  isTokenFromUserMiddleware,
  restrictedUserActionsMiddleware,
  updateUsernameByEmailEndpoint,
);
router.delete(
  '/deleteUser',
  isTokenFromUserMiddleware,
  restrictedUserActionsMiddleware,
  deleteUserByEmailEndpoint,
);
router.post('/forgotPassword', forgotPasswordEndpoint);
router.post('/resetPassword', resetPasswordEndpoint);
router.get(
  '/checkResetPasswordToken/:token',
  checkResetPasswordTokenExistenceEndpoint,
);
router.get('/:id', getUserByIdEndpoint);

export default router;
