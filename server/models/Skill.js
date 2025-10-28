import mongoose from 'mongoose';

const skillSchema = mongoose.Schema(
  {
    // This connects the skill to a specific user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This creates the link to the 'User' model
    },
    title: {
      type: String,
      required: [true, 'Please add a skill title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    // We can use 'enum' to restrict the value to one of two choices
    skillType: {
      type: String,
      required: true,
      enum: ['Offering', 'Seeking'], // The user must choose one of these
    },
    category: {
      type: String,
      required: [true, 'Please add a category (e.g., Programming, Design)'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;