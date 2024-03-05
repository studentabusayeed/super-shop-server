const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const orderSchema = require('../schemas/orderSchema');
const OrderProduct = new mongoose.model("OrderProduct", orderSchema);
const verifyLogin = require("../middlewares/verifyLogin");


router.get('/', async (req, res) => {
    await OrderProduct.find().sort({ deliveryDate: 1 }).then((data) => {
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.json({
            message: "error"
        })
    })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new Object(id) };
    await OrderProduct.findOne(query).sort({ deliveryDate: 1 }).then((data) => {
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

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new Object(id) };
    const updatedDoc = {
        $set: {
            status: 'completed'
        }
    };
    await OrderProduct.updateOne(filter, updatedDoc).then(() => {
        res.status(200).json({
            message: 'success'
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'error'
        })
    })

})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new Object(id) };
    await OrderProduct.deleteOne(query).then(() => {
        res.status(200).json({
            message: 'item deleted'
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'error'
        })
    })
})


module.exports = router;