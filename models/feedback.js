const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  feedback: {
    type: String,
    required: true
  },
  colorTheme: {
    type: String,
    default: 'blue',
    enum: ['blue', 'red', 'green', 'yellow', 'purple']
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;