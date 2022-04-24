//dependencies
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

//variables
const app = express();
const uri = process.env.MONGODB_URI;
const PORT = 3000;
app.use(bodyParser.json());

//import Routes and other files
const postsRoute = require('../Routes/posts');
const { authenticate } = require('../middleware/authentication');
const cookieParser = require('cookie-parser');

//use middleware
app.use('/api', postsRoute);
app.use(cookieParser())

//path to webpages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/levels/level1.html', authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, 'levels/level1.html'));
});
app.get('/levels/level2.html', authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, 'levels/level2.html'));
});
app.get('/levels/level3.html', authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, 'levels/level3.html'));
});
app.get('/levels/level4.html', authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, 'levels/level4.html'));
});
app.get('/levels/level5.html', authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, 'levels/level5.html'));
});
app.get('/levels/cert.html', authenticate, (req, res) => {
  res.sendFile(path.join(__dirname, 'levels/cert.html'));
});

//Database connection
mongoose.connect(`${uri}`, () => {
  console.log(`Connected to DB`)
})

// Set the default path, /, to our /src
app.use(express.static(path.join(__dirname, '../enlight-master')));

// Create server function
app.listen(PORT, function() {
    console.log(`Web app listening on port ${PORT}`);
});