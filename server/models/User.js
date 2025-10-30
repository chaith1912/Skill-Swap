// server/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // New users are not admins by default
    },
    // You can add more fields here (e.g., skills, profilePic)
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Encrypt password using bcrypt BEFORE saving
userSchema.pre('save', async function (next) {
  // Only run this function if password was modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;