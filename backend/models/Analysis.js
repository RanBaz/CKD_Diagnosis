const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  patientData: {
    type: Object,
    required: true
  },
  aiResponse: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analysis', analysisSchema);