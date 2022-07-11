const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentsSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  user_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Appointment', appointmentsSchema);
