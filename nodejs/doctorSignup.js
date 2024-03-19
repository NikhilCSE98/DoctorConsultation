const mongoose = require('mongoose');

// Define mongoose schema and model for doctor
const DoctorSignupSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    specialization: String,
    experience: String,
    mobile: String,
    clinic_address: String,
});

module.exports = mongoose.model('DoctorSignup', DoctorSignupSchema);
