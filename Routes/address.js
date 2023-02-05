// const { Router } = require('@material-ui/icons');
const localProperty = require('../Properties')
const mongoose = localProperty.Property.getMongoose
const express = require('express');
const addressModel = require('../Schemas/deliverySchema');
const router = express.Router();
const Model = mongoose.model('Delivery', addressModel);

router.post('/add', async (req, res) => {
    try {
        let newAddress = req.body;
        if (newAddress.name == "" || newAddress.contactNumber == "" || newAddress.pincode == "" || newAddress.address == "" || newAddress.city == "" || newAddress.state == "" || newAddress.locality == "") {
            return res.status(401).json({ success: false, message: 'Please fill required fields' });
        }
        const findUserAddress = await Model.findOne(req.body);
        if (findUserAddress) {
            return res.json({ success: false, message: "Same delivery address for the user already present" });
        }
        const userAddress = await Model.create(req.body);
        if (!userAddress) {
            return res.json({ success: false, message: "Address not saved successfully" });
        }
        return res.json({ success: true, userAddress });

    } catch (error) {
        return res.status(400).json({ success: false, error });
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const userAddress = await Model.find({ userId: req.params.userId });
        return res.json(userAddress);
    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;
