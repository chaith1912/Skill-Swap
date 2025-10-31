import express from 'express';
const router = express.Router();
import { getSkills, createSkill, deleteSkill, getSkillsByUserId } from '../controllers/skillController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Import your gatekeeper

// /api/skills
router.route('/')
  .get(getSkills) // Anyone can get all skills
  .post(protect, createSkill); // Only logged-in users can create a skill
  
router.route('/user/:id').get(protect, admin, getSkillsByUserId);
router.delete('/:id', protect, admin, deleteSkill);

export default router;

