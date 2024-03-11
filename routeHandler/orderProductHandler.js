const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const orderSchema = require('../schemas/orderSchema');
const OrderProduct = new mongoose.model("OrderProduct", orderSchema);
const verifyLogin = require("../middlewares/verifyLogin");


// router.get('/', async (req, res) => {
//     await OrderProduct.find().sort({ deliveryDate: 1 }).then((data) => {
//         res.json(data)
//     }).catch(err => {
//         console.log(err);
//         res.json({
//             message: "error"
//         })
//     })
// })

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
        else {
            return res.status(400).json({ message: 'Invalid user' });
        }
        if (searchValue && searchValue.trim() !== ' ') {
            query.$or = [{ productCode: searchValue }];
        }
        const items = await OrderProduct.find(query);
        console.log(searchValue, email, role)
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