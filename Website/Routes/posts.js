const express = require('express');

const router = express.Router();

//import schema
const Post = require('../Models/Post');

router.get('/', (req,res)=>{
    res.send('we are on posts');
});

//on post request, create new entry, save entry to database, save entry in JSON formatting
router.post('/', async (req, res) => {
    const post = new Post({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        level: req.body.level
    });
    const savedPost = await post.save();
    res.json(savedPost);
});

module.exports = router;