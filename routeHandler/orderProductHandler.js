const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const orderSchema = require('../schemas/orderSchema');
const OrderProduct = new mongoose.model("OrderProduct", orderSchema);
const verifyLogin = require("../middlewares/verifyLogin");


router.get('/', async (req, res) => {
    try {
        const data = await OrderProduct.find().sort({ deliveryDate: 1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({
            message: "error",
        });
    }
})
router.get('/state', async (req, res) => {
    const { email, searchValue, role, currentPage, itemsPerPage } = req.query;
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
        else {
            return res.status(400).json({ message: 'Invalid user' });
        }
        if (searchValue && searchValue.trim() !== ' ') {
            query.$or = [{ productCode: searchValue }];
        }

        const skip = currentPage * itemsPerPage;
        console.log(skip);

        const items = await OrderProduct.find(query).skip(skip).limit(itemsPerPage).sort({ deliveryDate: -1 });
        if (!items || items.length === 0) {
            return res.status(404).json({ message: 'No items found for the given email and search term' });
        }
        // console.log(items);

        // Total number of blogs
        const totalCount = await OrderProduct.countDocuments();
        res.status(200).json({ items, totalCount });
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
    await OrderProduct.findOne(query).sort({ deliveryDate: 1 }).then((data) => {
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.json({
            message: "error"
        })
    })
})

router.get('/1/search', async (req, res) => {
    const { email, searchValue, role, currentPage, itemsPerPage, status } = req.query;
    try {
        let query = {};
        if (role === 'employee') {
            if (!email) {
                return res.status(400).json({ message: 'Missing email for employee role' });
            }
            query.email = email;
        } else if (role === 'admin') {
            query = {};
        } else {
            return res.status(400).json({ message: 'Invalid user' });
        }

        if (searchValue && searchValue.trim() !== ' ') {
            query.$or = [{ productCode: searchValue }];
        }

        if (status) {
            query.status = status;
        }

        const skip = currentPage * itemsPerPage;

        const items = await OrderProduct.find(query).skip(skip).limit(itemsPerPage).sort({ deliveryDate: -1 });

        if (!items || items.length === 0) {
            return res.status(404).json({ message: 'No items found for the given email and search term' });
        }
        // Total number of blogs
        const totalCount = await OrderProduct.countDocuments(query);
        res.status(200).json({ items, totalCount });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error occurred while searching for items',
        });
    }
});

router.get('/1/filter', async (req, res) => {
    const { filterName } = req.query;
    let query = {};
    console.log(filterName, query)
    try {
        if (filterName === 'weekly' || filterName === 'monthly' || filterName === 'yearly') {
            let days;
            if (filterName === 'weekly') {
                days = 7;
            } else if (filterName === 'monthly') {
                days = 30;
            } else if (filterName === 'yearly') {
                days = 365;
            }

            if (!isNaN(days)) {
                const startDate = new Date();
                startDate.setDate(startDate.getDate() - days);
                query.deliveryDate = { $gte: startDate };
            }
        }

        const data = await OrderProduct.find(query);
        console.log(data);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving sell products" });
    }
});

router.post('/', async (req, res) => {
    const data = req.body;
    const query = { productCode: data?.productCode }
    const existingProductCode = await OrderProduct.findOne(query)

    if (existingProductCode) {
        return res.json({ message: 'Product Code has alredy taken' })
    }
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