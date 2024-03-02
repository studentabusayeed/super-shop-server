const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: String,
    quantity: String,
    price: String,
    deliveryDate: Date,
    category: String,
    productCode: String,
    // image: String,
    status: String,
    email: String
})

module.exports = orderSchema;