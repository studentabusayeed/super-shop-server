const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const categorySchema = require('../schemas/categorySchema');
const Category = new mongoose.model("Category", categorySchema);


router.get('/', async (req, res) => {
    try {
        const data = await Category.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({
            message: "error",
        });
    }
})


router.post('/', async (req, res) => {
    const data = req.body;
    const query = { category: data?.category };
    const existingCategory = await Category.findOne(query);
    if (existingCategory) {
        return res.json({ message: 'Category has already added' })
    }
    const NewCategory = new Category(data);
    await NewCategory.save().then((data) => {
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
})

module.exports = router;