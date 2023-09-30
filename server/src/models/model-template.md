const mongoose = require('mongoose');

// Mongoose schema
export const xSchema = new mongoose.Schema({
    
  }, { timestamps: true});

// Export model
export const x = mongoose.model('x', xSchema);
module.exports = { x };