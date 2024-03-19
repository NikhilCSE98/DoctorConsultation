const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URL'
);

oauth2Client.setCredentials({
  refresh_token: 'YOUR_REFRESH_TOKEN'
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'your@gmail.com',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    refreshToken: 'YOUR_REFRESH_TOKEN',
    accessToken: accessToken
  }
});

function bookAppointment(name, email, doctor, date, callback) {
  // Send email to the doctor to confirm the appointment
  const mailOptions = {
    from: 'your@gmail.com',
    to: 'doctor@gmail.com', // Replace with doctor's email
    subject: 'New Appointment Request',
    text: `You have a new appointment request from ${name} for ${doctor} on ${date}.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      callback(false);
    } else {
      console.log('Email sent:', info.response);
      callback(true);
    }
  });
}

module.exports = {
  bookAppointment
};
