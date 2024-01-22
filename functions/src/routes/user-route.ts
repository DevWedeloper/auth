import { Router } from 'express';
import {
  createUserEndpoint,
  getAllUsersEndpoint,
  getUserByIdEndpoint,
} from '../controllers';

const router = Router();

router.post('/', createUserEndpoint);
router.get('/', getAllUsersEndpoint);
router.get('/:id', getUserByIdEndpoint);

export default router;
