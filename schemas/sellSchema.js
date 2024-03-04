const mongoose = require('mongoose');

const sellSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sellingDate: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    productCode: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
})

module.exports = sellSchema;