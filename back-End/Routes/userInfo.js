const { Router } = require('@material-ui/icons');
const localProperty = require('../Properties')
const mongoose = localProperty.Property.getMongoose
const express = require('express');
const UserModel = require('../Schemas/userSignUp');
const router = express.Router();
const Model = mongoose.model('USERS', UserModel);
const fetchUser = require('./middleWare/fetchUser');

router.get('/getUser', fetchUser, async (req, res) => {
    try {
        let userId = req.user.id;
        const getUser = await Model.findById(userId).select(['-password', '-accountCreationDateTime']);
        return res.json({ success: true, getUser });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal Server Error" })
    }
})



router.patch('/update', async (req, res) => {
    try {
        if (!req.body.userId || !req.body.info) {
            return res.status(404).json({ success: false, message: 'Bad request' })
        }
        let updateUser = await Model.findByIdAndUpdate(req.body.userId, req.body.info);
        return res.json({success:true,updateUser});

    } catch (error) {
        return res.status(500).json({ success: false, error })
    }
})

module.exports = router;