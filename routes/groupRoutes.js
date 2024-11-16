// routes/groupRoutes.js
import express from 'express';
import { createGroup, getGroups } from '../controllers/groupControler.js';


const router = express.Router();

router.post('/createGroup', createGroup);
router.get('/getGroups', getGroups);

export default router;
