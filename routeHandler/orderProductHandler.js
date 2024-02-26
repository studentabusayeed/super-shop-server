const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const orderSchema = require('../schemas/orderSchema');
const OrderProduct = new mongoose.model("OrderProduct", orderSchema);


router.get('/', async (req, res) => {
    await OrderProduct.find().sort({data: 'desc'}).then((data) => {
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.json({
            message: "error"
        })
    })
})

router.post('/', async (req, res) => {
    const NewOrderPorduct = new OrderProduct(req.body);
    await NewOrderPorduct.save().then((data) => {

        res.status(200).json({
            message: 'success'
        })
    }).catch((err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: 'error'
            })
        }
    })
});


module.exports = router;