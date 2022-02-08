const express = require('express');

const router = express.Router();
const Post = require('../Models/Post');

router.get('/', (req,res)=>{
    res.send('we are on posts');
});


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