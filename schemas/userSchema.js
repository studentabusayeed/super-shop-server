const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    role: String,
    image: String,
    date: {
        type: Date, default: Date.now
    }
});

module.exports = userSchema;