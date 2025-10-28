import express from 'express';

import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// When a request hits this URL, it will run `protect` first.
// If the token is valid, it will then run `getUserProfile`.
router.get('/profile', protect, getUserProfile);

export default router;