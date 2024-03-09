const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const sellSchema = require('../schemas/sellSchema');
const SellProduct = new mongoose.model("SellProduct", sellSchema);
const verifyLogin = require("../middlewares/verifyLogin");


router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const itemsPerPage = parseInt(req.query.itemsPerPage);

        // calculate the skip value
        const skip = page * itemsPerPage;

        // Total number of blogs
        const totalCount = await SellProduct.countDocuments();

        const data = await SellProduct.find().skip(skip).limit(itemsPerPage).sort({ sellingDate: -1 });
        res.json({ data, totalCount });
    } catch (err) {
        res.status(500).json({
            message: "error",
        });
    }
})
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new Object(id) };
    await SellProduct.findOne(query).sort({ sellingDate: -1 }).then((data) => {
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

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new Object(id) }
    await SellProduct.deleteOne(query).then(() => {
        res.status(200).json({
            message: 'item deleted'
        })
    }).catch((err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: 'error'
            })
        }
    })
})


module.exports = router;