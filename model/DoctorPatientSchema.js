const mongoose = require('mongoose');

const DoctorPatientSchema = new mongoose.Schema({
  doctorName: String,
  fee: Number,
  availability: String,
  time: String,
  requestAppointment: String,
  isFavorite: { type: Boolean, default: false }, 
});

module.exports = mongoose.model('Doctor', DoctorPatientSchema);
