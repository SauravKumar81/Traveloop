import express from 'express';
import { registerUser, loginUser, logoutUser, getMe, googleAuth, googleAuthCallback } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);

export default router;
