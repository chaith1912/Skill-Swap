import express from 'express';
const router = express.Router();
import { getSkills, createSkill } from '../controllers/skillController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import your gatekeeper

// /api/skills
router.route('/')
  .get(getSkills) // Anyone can get all skills
  .post(protect, createSkill); // Only logged-in users can create a skill

export default router;

