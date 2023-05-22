import { Router } from 'express'
import { getUserStats, login, updateLevel } from '../controller/user';

const router = Router();


router.post('/user/login', login);

router.put('/user/level', updateLevel);

router.post('/user/stats', getUserStats);

export default router;