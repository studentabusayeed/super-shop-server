const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: String,
    quantity: String,
    price: String,
    date: Date,
    category: String,
    productCode: String,
    image: String,
    status: String
})

module.exports = orderSchema;