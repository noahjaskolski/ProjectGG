const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

//import schema
const Post = require('../Models/Post');
//const { findOne } = require('../Models/Post');

//on post request, create new entry, save entry to database, save entry in JSON formatting
router.post('/post', async (req, res) => {
    //encrypt password
    const encryptPass = await bcrypt.hash(req.body.password, 10);

    //If user exists, send message that user already exists
    const userExists = await Post.findOne( {email: req.body.email })
    if (userExists) {
        return res.status(400).send(`User with this email already exists`);
    }
    //create new post using schema from Models
    const post = new Post({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: encryptPass,
        level: req.body.level
    });
    //save post to database
    const savedPost = await post.save();
    return res.status(200).send({ message: "Success" })
});

router.post('/login', async (req, res) => {

    const user = await Post.findOne({ email: req.body.email }).lean()

    if (!user) {
        console.log('unsuccessful')
        return res.status(400).json({ error: 'Invalid username or password' })
    }

    if (await bcrypt.compare( req.body.password, user.password )) {
        const token = jwt.sign({
            id: Post._id,
            email: Post.email
        }, JWT_SECRET)
        console.log("Success")
        console.log(token)
        res.cookie('jwt', token, {expire: new Date() +1 })
        res.status(200).send({ token: token, message: "Success" })
    } else {
        return res.status(400).json({ error: 'Invalid username or password' });
    }
})

module.exports = router;