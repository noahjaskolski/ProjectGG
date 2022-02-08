//import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

//variables
const app = express();
const uri = process.env.MONGODB_URI;

app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./Routes/posts');

//Middlewares, functions to use when routes are being hit
app.use('/posts', postsRoute); //everytime localhost:3000/post, use postsRoute

//Create route for home
app.get('/', (req, res) => {
    res.send(`We are on home`)
});

//connecting to db
mongoose.connect(uri, () => {
    console.log(`Connected to DB`)
})

//Listen on port
app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});