// routes/userRoutes.js
import express from 'express';
import { getAllUsers, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/getUser', getAllUsers);
export default router;
