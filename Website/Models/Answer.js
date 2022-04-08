const mongoose = require('mongoose');

//create schema
const AnswerSchema = mongoose.Schema({
    level: {
        type: Number
    },
    answer: { 
        type: String,
        required: true
    }
}, {collection: 'answers'});

module.exports = mongoose.model('Answer', AnswerSchema);