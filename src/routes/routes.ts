import { Router } from 'express';
import { ping } from '../controllers/pingController';

const router = Router();

router.post('/api/ping', ping);

export default router;
