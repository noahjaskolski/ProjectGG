const mongoose = require('mongoose');

//create schema
const PostSchema = mongoose.Schema({
    firstName: {
        type: String,
        //required: true
    },

    lastName: {
        type: String,
        //required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    level: String
}, {collection: 'users_info'});

module.exports = mongoose.model('Posts', PostSchema);