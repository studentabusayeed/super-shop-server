const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const UserInfo = new mongoose.model("User", userSchema);
const verifyLogin = require("../middlewares/verifyLogin");


router.get('/', async (req, res) => {
    await UserInfo.find().sort({ data: 'desc' }).then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.json({
            message: 'error'
        })
    })
})



router.post('/', async (req, res) => {
    const NewUserInfo = new UserInfo(req.body);
    await NewUserInfo.save().then((data) => {
        res.status(200).json({
            message: 'Success'
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

router.patch('/admin/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new Object(id) };
    const updatedDoc = {
        $set: {
            role: 'admin'
        }
    }
    await UserInfo.updateOne(filter, updatedDoc).then(() => {
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

router.patch('/employee/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new Object(id) };
    const updatedDoc = {
        $set: {
            role: 'employee'
        }
    }
    await UserInfo.updateOne(filter, updatedDoc).then(() => {
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
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new Object(id) };
    const updatedDoc = {
        $set: {
            role: 'user'
        }
    }
    await UserInfo.updateOne(filter, updatedDoc).then(() => {
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

