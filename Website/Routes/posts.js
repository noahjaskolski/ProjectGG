const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

//import schema
const Post = require('../Models/Post');

router.get('/', (req,res)=>{
    res.send('we are on posts');
});

//on post request, create new entry, save entry to database, save entry in JSON formatting
router.post('/', async (req, res) => {
    //encrypt password
    const encryptPass = await bcrypt.hash(req.body.password, 10);

    //If user exists, send message that user already exists
    const userExists = await Post.findOne( {email: req.body.email })
    if (userExists) {
        return res.status(400).send(`User with this email already exists`);
    }

    const post = new Post({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: encryptPass,
        level: req.body.level
    });
    const savedPost = await post.save();
    res.json(savedPost);
});

module.exports = router;