const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home/index.html'));
});

// Set the path to our /www
app.use(express.static(path.join(__dirname, '../www')));

// Create server function
app.listen(PORT, function() {
    console.log('Web app listening on port 3000');
});