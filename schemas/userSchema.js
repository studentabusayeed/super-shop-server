const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    role: String,
    image: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = userSchema;