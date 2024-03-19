const mongoose = require('mongoose');

// Define mongoose schema and model for user
const UserSignupSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    age: String,
    mobile: String,
    home_city: String,
    gender: String,
});

module.exports = mongoose.model('UserSignup', UserSignupSchema);
