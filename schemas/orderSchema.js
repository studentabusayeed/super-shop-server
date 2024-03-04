const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: {
        type: String,
    },
    quantity: {
        type: String,
    },
    price: {
        type: String,
    },
    deliveryDate: {
        type: Date,
    },
    category: {
        type: String,
    },
    productCode: {
        type: String,
    },
    image: {
        type: String
    },
    status: {
        type: String,
    },
    email: {
        type: String,
    }
})

module.exports = orderSchema;