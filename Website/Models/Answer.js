const mongoose = require('mongoose');

//create schema
const AnswerSchema = mongoose.Schema({
    answer: { 
        type: String,
        required: true
    }
}, {collection: 'answers'});

module.exports = mongoose.model('Answer', AnswerSchema);