const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

//import schema
const Post = require('../Models/Post');
const Answer = require('../Models/Answer')


//on post request, create new entry, save entry to database, save entry in JSON formatting
router.post('/post', async (req, res) => {
    //encrypt password
    if (!req.body.email) {
        return res.status(400).send({ error: "Please enter an email and password" });
    };
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        return res.status(400).send({ error: "Please enter a valid email address" })
    };
    const encryptPass = await bcrypt.hash(req.body.password, 10);

    //If user exists, send message that user already exists
    const userExists = await Post.findOne( {email: req.body.email })
    if (userExists) {
        return res.status(400).send({ error: "User with this email already exists"});
    }
    //create new post using schema from Models
    const post = new Post({
        email: req.body.email,
        password: encryptPass,
        level: 1
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
            id: user._id,
            email: user.email,
            level: user.level
        }, JWT_SECRET)
        return res.cookie('jwt', token, { maxAge: 10000 * 360 }) + res.status(200)
         .send({ token: token, message: "Login Successful", level: user.level })
    } else {
        return res.status(400).json({ error: 'Invalid username or password' });
    }
})

router.post('/checkAnswer', async (req, res) => {

    const result = await Answer.findOne({ level: req.body.level }).lean()
    if (!req.body.answer) {
        return res.json({ message: "Please enter an answer" })
    }
    if (result.answer == req.body.answer) {
        return res.status(200).json({ message: 'You\'re Correct' })
    } else {
        return res.status(400).json({ error: "You\'re Wrong" })
    }
})

router.patch("/updateUser", async (req, res) => {
    console.log(req.body)
    if(req.body.level == req.body.userlevel){
        const useremail = await Post.findOneAndUpdate({ email: req.body.useremail }, {$inc:{level:1}})
    }
})

module.exports = router;