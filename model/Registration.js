const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  spouseName: { type: String, required: true },
  EmergencyContactNumber: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  BloodGroup: { type: String, required: true }, 
  image: { type: String }, 
});

module.exports = mongoose.model('Registration', registrationSchema);
