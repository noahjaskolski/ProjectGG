const mongoose = require('mongoose');

//create schema
const PostSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },
    level: Number
}, {collection: 'users_info'});

module.exports = mongoose.model('Posts', PostSchema);