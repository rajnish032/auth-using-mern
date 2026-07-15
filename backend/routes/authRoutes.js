import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendOTP,
    googleAuth
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOTP);
router.post('/google', googleAuth);

export default router;
