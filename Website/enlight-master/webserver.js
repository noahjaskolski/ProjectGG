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

//import Routes
const postsRoute = require('../Routes/posts');

//use middleware
app.use('/api', postsRoute);

//path to webpages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'account.html'));
});
app.get('/level1', (req, res) => {
  res.sendFile(path.join(__dirname, 'level1.html'));
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