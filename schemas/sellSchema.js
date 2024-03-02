const mongoose = require('mongoose');

const sellSchema = mongoose.Schema({
    name: String,
    quantity: String,
    price: String,
    sellingDate: Date,
    category: String,
    productCode: String,
    image: String,
    email: String
})

module.exports = sellSchema;