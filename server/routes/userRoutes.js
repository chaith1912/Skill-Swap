import express from 'express';

import { registerUser, loginUser, getUserProfile, getAllUsers} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define routes
router.post('/register', registerUser);
router.post('/login', loginUser);


// When a request hits this URL, it will run `protect` first.
// If the token is valid, it will then run `getUserProfile`.
router.get('/profile', protect, getUserProfile);

// This route will first 'protect' (check for token)
// then 'admin' (check if user.isAdmin is true)
// then 'getAllUsers' (run the controller)
router.get('/', protect, admin, getAllUsers);

export default router;