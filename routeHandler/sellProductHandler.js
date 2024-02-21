const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const sellSchema = require('../schemas/sellSchema');
const SellProduct = new mongoose.model("SellProduct", sellSchema);


router.get('/', async (req, res) => {
    await SellProduct.find().sort({data: 'desc'}).then((data) => {
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.json({
            message: "error"
        })
    })
})

router.post('/', async (req, res) => {
    const NewSellProduct = new SellProduct(req.body);
    await NewSellProduct.save().then((data) => {

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