import { Router } from 'express';
import { loginUser,createUser } from '../controllers/Login';

const router = Router();
router.post('/', createUser);
router.post('/login',loginUser)

export default router;