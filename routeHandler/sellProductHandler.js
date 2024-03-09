const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const sellSchema = require('../schemas/sellSchema');
const SellProduct = new mongoose.model("SellProduct", sellSchema);
const verifyLogin = require("../middlewares/verifyLogin");


router.get('/', async (req, res) => {
    await SellProduct.find().sort({ sellingDate: -1 }).then((data) => {
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.json({
            message: "error"
        })
    })
});
router.get('/search', async (req, res) => {
    const email = req.query.email;
    const searchValue = req.query.searchValue;
    const role = req.query.role;
    // console.log(email, searchValue, role)
    try {
        let query = {};
        if (role === 'employee') {
            if (!email) {
                return res.status(400).json({ message: 'Missing email for employee role' });
            }
            query.email = email;
        }
        else if (role === 'admin') {
            query = {};
        }
        else{
            return res.status(400).json({ message: 'Invalid user' });
        }
        if (searchValue && searchValue.trim() !== ' ') {
            query.$or = [{ productCode: searchValue }];
        }
        const items = await SellProduct.find(query);
        console.log(searchValue, email,role)
        if (!items || items.length === 0) {
            return res.status(404).json({ message: 'No items found for the given email and search term' });
        }
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error occurred while searching for items"
        });
    }
});
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
    const data = req.body;
    const query = { productCode: data?.productCode }
    const existingProductCode = await SellProduct.findOne(query)
    console.log(existingProductCode)
    if (existingProductCode) {
        return res.json({ message: 'Product Code has alredy taken' })
    }
    const NewSellProduct = new SellProduct(data);
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