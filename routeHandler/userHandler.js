const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const UserInfo = new mongoose.model("User", userSchema);
const verifyLogin = require("../middlewares/verifyLogin");


router.get('/', async (req, res) => {
    await UserInfo.find().then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.json({
            message: 'error'
        })
    })
});

router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const userInfo = await UserInfo.findOne({ email: email });

        if (userInfo) {
            res.json(userInfo);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const user = await UserInfo.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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

