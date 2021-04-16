import { Router } from 'express';
import { urlLoader } from '../controller/url';

const router = Router();

router.route('/:code').get(urlLoader);

export default router;
