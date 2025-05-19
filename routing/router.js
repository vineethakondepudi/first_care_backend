const express = require('express');
const multer = require('multer');
const router = express.Router();
const Registration = require('../model/Registration');
const DropdownOptions = require('../model/DropdownOptionsSchema');
const DoctorPatientSchema = require ('../model/DoctorPatientSchema');







// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST /api/register
router.post('/register', upload.single('image'), async (req, res) => {
  try {
    const {
        firstName, lastName, dob, gender, phone, email, address,
      aadharNumber, spouseName, EmergencyContactNumber, height, weight, BloodGroup
    } = req.body;

    const image = req.file ? req.file.path : null;

    const newEntry = new Registration({
     firstName,
     lastName,
      dob,
      gender,
      phone,
      email,
      address,
      aadharNumber,
      spouseName,
      EmergencyContactNumber,
      height,
      weight,
      BloodGroup,
      image
    });

    await newEntry.save();
    res.status(201).json({ message: 'Registration successful', data: newEntry });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});






router.get('/register', async (req, res) => {
    try {
      const allEntries = await Registration.find();
      res.status(200).json(allEntries);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });


// PATCH: Edit User API
router.patch('/register/edit', async (req, res) => {
    const { aadharNumber, phone, address, email, spouseName, EmergencyContactNumber } = req.body;
  
    try {
      // Find user by Aadhar number and update details
      const updatedUser = await Registration.findOneAndUpdate(
        { aadharNumber: aadharNumber },
        { 
          phone: phone,
          address: address,
          email: email,
          spouseName: spouseName,
          EmergencyContactNumber: EmergencyContactNumber
        },
        { new: true } // This will return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found. Please check the Aadhar number.' });
      }
  
      res.status(200).json({ message: 'User details updated successfully', data: updatedUser });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  router.delete('/register/delete/:firstName', async (req, res) => {
    const { firstName } = req.params;
  
    try {
      const deletedUser = await Registration.findOneAndDelete({ firstName });
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found with the given first name.' });
      }
  
      res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
// POST: Login API
router.post('/login', async (req, res) => {
    const { phone, aadharNumber } = req.body; // Only phone is required now
  
    try {
      // Find user with matching phone number
      const user = await Registration.findOne({ phone: phone, aadharNumber: aadharNumber });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found. Please register first.' });
      }
  
      // If user exists, return success
      res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
  
  
// POST: Add new dropdown options
router.post('/dropdown-options', async (req, res) => {
  try {
    const {
      specialization,
      location,
      language,
      feeRange,
      availability
    } = req.body;

    const newOptions = new DropdownOptions({
      specialization,
      location,
      language,
      feeRange,
      availability
    });

    await newOptions.save();
    res.status(201).json({ message: 'Dropdown options saved successfully', data: newOptions });
  } catch (err) {
    res.status(500).json({ message: 'Error saving dropdown options', error: err.message });
  }
});

// GET: Fetch dropdown options (latest one)
router.get('/dropdown-options', async (req, res) => {
  try {
    const options = await DropdownOptions.findOne().sort({ createdAt: -1 });
    if (!options) {
      return res.status(404).json({ message: 'No dropdown options found' });
    }
    res.status(200).json(options);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dropdown options', error: err.message });
  }
});

// POST: Create a new doctor entry
router.post('/patientNewAppointment', async (req, res) => {
  const { doctorName, fee, availability, time, requestAppointment } = req.body;

  const newDoctor = new DoctorPatientSchema({
    doctorName,
    fee,
    availability,
    time,
    requestAppointment,
  });

  try {
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// GET: Fetch all doctor entries
router.get('/patientNewAppointment', async (req, res) => {
  try {
    const doctors = await DoctorPatientSchema.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Added
router.put('/doctor/:id/favorite', async (req, res) => {
  const { isFavorite } = req.body;
  try {
    const updatedDoctor = await DoctorPatientSchema.findByIdAndUpdate(
      req.params.id,
      { isFavorite },
      { new: true }
    );
    res.json(updatedDoctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

