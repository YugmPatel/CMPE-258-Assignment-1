const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Saved', 'Applied', 'Interview', 'Offer'],
    default: 'Saved'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', ApplicationSchema);
