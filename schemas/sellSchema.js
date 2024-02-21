const mongoose = require('mongoose');

const sellSchema = mongoose.Schema({
    name: String,
    quantity: String,
    price: String,
    date: Date,
    category: String,
    productCode: String,
    image: String,
})

module.exports = sellSchema;