const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://Nikhil:GKetDsd8ciHgXjl0@sanio.rvzfl8x.mongodb.net/?retryWrites=true&w=majority&appName=sanio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));
const UserSignup = require('./nodejs/UserSignup');

// Middleware
// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('images'));
app.use(express.static('css'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/Userlogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'patientLogin.html'));
});

app.get('/UserSignup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sign-up-patient.html'));
});

app.get('/doctorlogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'doctorLogin.html'));
});

app.get('/doctorSignup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'doctorSign-up.html'));
});

app.get('/Dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'patientHome.html'));
});

// Sign up route
app.post('/UserSignup', (req, res) => {
    const { name, email, pass, age, mobile, home_city, gender } = req.body;

    // Simple data validation
    if (!name || !email || !pass || !age || !mobile || !home_city || !gender) {
        return res.status(400).send('All fields are required');
    }

    const newUser = new UserSignup({ name, email, pass, age, mobile, home_city, gender });
    newUser.save()
        .then(() => {
            console.log('User signed up successfully');
            res.redirect('/'); // Redirect to home page after sign up
        })
        .catch(err => console.error('Error signing up user:', err));
});

// Login route
app.post('/Userlogin', (req, res) => {
    const { email, pass } = req.body;

    // Simple data validation
    if (!email || !pass) {
        return res.status(400).send('Email and pass are required');
    }
  else
    // Find user by email
    UserSignup.findOne({ email })
        .then(user => {
            if (user && user.pass === pass) {
                res.redirect('/dashboard'); // Redirect to dashboard on successful login
            } else {
                res.status(401).send('Invalid email or pass');
            }
        })
        .catch(err => console.error('Error logging in:', err));
});


app.post('/doctorSignup', (req, res) => {
    const { name, email, pass, age, mobile, home_city, gender } = req.body;

    // Simple data validation
    if (!name || !email || !pass || !age || !mobile || !home_city || !gender) {
        return res.status(400).send('All fields are required');
    }

    const newDoctor = new DoctorSignup({ name, email, pass, age, mobile, home_city, gender });
    newDoctor.save()
        .then(() => {
            console.log('User signed up successfully');
            res.redirect('/'); // Redirect to home page after sign up
        })
        .catch(err => console.error('Error signing up user:', err));
});

// Login route
app.post('/doctorlogin', (req, res) => {
    const { email, pass } = req.body;

    // Simple data validation
    if (!email || !pass) {
        return res.status(400).send('Email and pass are required');
    }
  else
    // Find user by email
    DoctorSignupSignup.findOne({ email })
        .then(user => {
            if (user && user.pass === pass) {
                res.redirect('/dashboard'); // Redirect to dashboard on successful login
            } else {
                res.status(401).send('Invalid email or pass');
            }
        })
        .catch(err => console.error('Error logging in:', err));
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
