// const { Router } = require('@material-ui/icons');
const localProperty = require('../Properties')
const mongoose = localProperty.Property.getMongoose
const express = require('express');
const UserModel = require('../Schemas/userSignUp');
const router = express.Router();
const Model = mongoose.model('USERS', UserModel);
const bcrypt = localProperty.Property.bcrypt;
const jwt = localProperty.Property.jwt
const dotenv=require('dotenv').config({path:__dirname+'/.env'});
router.post('/', async (req, res) => {
    try {
        if (req.body.email == "" || req.body.password == "") {
            return res.status(401).json({ success: false, message: "Email or Password can't be empty" });
        }
        let User = await Model.findOne({ email: req.body.email });
        if (!User ||(User.userType && User.userType=="admin")) {
            return res.status(401).json({ success: false, message: 'Sorry, invalid credentials' });
        }


        const passwordCheck = await bcrypt.compare(req.body.password, User.password);
        if (!passwordCheck) {
            return res.status(401).json({ success: false, message: 'Sorry, invalid credentials' });
        }

        let authToken = jwt.sign({ id: User._id.toString() }, process.env.jwtSecret);
        return res.json({ success: true, authToken,userType:'user'});


    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
})

router.post('/admin', async (req, res) => {
    try {
        if (req.body.email == "" || req.body.password == "") {
            return res.status(401).json({ success: false, message: "Email or Password can't be empty" });
        }
        let User = await Model.findOne({ email: req.body.email });
        if (!User || !User.userType) {
            return res.status(401).json({ success: false, message: 'Sorry, invalid credentials' });
        }

        if (User.userType != "admin") {
            return res.status(401).json({ success: false, message: 'Sorry, invalid credentials' });
        }

        const passwordCheck = await bcrypt.compare(req.body.password, User.password);
        if (!passwordCheck) {
            return res.status(401).json({ success: false, message: 'Sorry, invalid credentials' });
        }

        let authToken = jwt.sign({ id: User._id.toString() }, process.env.jwtSecret);
        return res.json({ success: true, authToken,userType:"admin"});


    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
})



module.exports = router
