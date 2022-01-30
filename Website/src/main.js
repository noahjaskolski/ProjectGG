const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home/welcome.html'));
});

app.get('/level1', (req, res) => {
  res.sendFile(path.join(__dirname, 'level1/level1.html'));
});

// Set the path to our /www
app.use(express.static(path.join(__dirname, '../src/')));

// Create server function
app.listen(PORT, function() {
    console.log('Web app listening on port 3000');
});

//account page
app.get('/createaccount', (req, res) => {
  res.sendFile(path.join(__dirname, 'account/createaccount.html'));
});