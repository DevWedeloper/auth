import { Router } from 'express';
import {
  createUserEndpoint,
  deleteUserByEmailEndpoint,
  forgotPasswordEndpoint,
  getAllUsersEndpoint,
  getUserByIdEndpoint,
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
router.get('/:id', getUserByIdEndpoint);
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

export default router;
