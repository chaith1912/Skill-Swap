import Skill from '../models/Skill.js';

import asyncHandler from 'express-async-handler';

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */


const getSkills = asyncHandler(async (req, res) => {
  // Find all skills and populate the 'user' field with just their name
  const skills = await Skill.find({}).populate('user', 'name');
  res.status(200).json(skills);
});


/**
 * @desc    Create a new skill
 * @route   POST /api/skills
 * @access  Private
 */
const createSkill = asyncHandler(async (req, res) => {
  // Get data from the request body
  const { title, description, skillType, category } = req.body;

  // Basic validation
  if (!title || !description || !skillType || !category) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Create the new skill and link it to the logged-in user
  const skill = new Skill({
    title,
    description,
    skillType,
    category,
    user: req.user._id, // req.user comes from your 'protect' middleware
  });

  const createdSkill = await skill.save();
  res.status(201).json(createdSkill);
});

export { getSkills, createSkill };