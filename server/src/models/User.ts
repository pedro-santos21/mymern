const mongoose = require('mongoose');

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    MODERATOR = 'moderator'
}

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: UserRole.USER,
    required: true
  },
  businessAccountIds: [{
    type: mongoose.Types.ObjectId,
    ref: "BusinessAccount"
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model('User', userSchema);

module.exports = {User, UserRole};