const localProperty = require('../Properties')
const mongoose = localProperty.Property.getMongoose
const express = require('express');
const UserModel = require('../Schemas/userSignUp');
const router = express.Router();
const dotenv=require('dotenv').config({path:__dirname+'/.env'});
const Model = mongoose.model('USERS', UserModel);
const bcrypt = localProperty.Property.bcrypt;
const jwt = localProperty.Property.jwt


let getDateAndTime = () => {
    newDate = new Date();
    return {
        date: newDate.toDateString(),
        time: newDate.toTimeString().slice(0, 8)
    }
}

let getSecurePassword = async (password) => {
    return await bcrypt.hash(password, localProperty.Property.saltRound);
}

let emailValidation = (email_id) => {
    const regex_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex_pattern.test(email_id);
}

let capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}

// for inserting user info in database
router.post('/', async (req, res) => {
    try {
        let request = req.body;
        if (emailValidation(request.email) == false) {
            return res.status(404).json({ success: false, message: "Please enter a valid email-id" });
        }
        let validateContactNumber = await Model.findOne({ contactNumber: req.body.contactNumber });
        if (validateContactNumber) {
            return res.status(401).json({ success: false, message: 'Account already exists for this Contact Number' })
        }

        let validateEmail = await Model.findOne({ email: req.body.email });
        if (validateEmail) {
            return res.status(401).json({ success: false, message: 'Account already exists for this mail Id' })
        }
        request.firstName = capitalize(request.firstName);
        if (request.lastName && request.lastName != "") {
            request.lastName = capitalize(request.lastName);
        }

        request.accountCreationDateTime = getDateAndTime();
        let securePassword = await getSecurePassword(request.password);
        request.password = securePassword;
        Model.create(request).then((result) => {
            // let authToken = jwt.sign({ id: result._id.toString() }, localProperty.Property.jwtSecret);
            return res.json({ success: true, message: "Congratulations, your account has been created" })
        }).catch((error) => {
            return res.json({ success: false, message: 'User with this email already exists' });
        })
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }

})

router.get('/findUser/:email/:contactNumber', async (req, res) => {
    try {
        let email = req.params.email;
        let contactNumber = req.params.contactNumber;
        if (emailValidation(email) == false) {
            return res.status(404).json({ success: false, message: "Please enter a valid email-id" });
        }
        let validateContactNumber = await Model.findOne({ contactNumber });
        if (validateContactNumber) {
            return res.status(401).json({ success: false, message: 'Account already exists for this Contact Number' })
        }

        let validateEmail = await Model.findOne({ email });
        if (validateEmail) {
            return res.status(401).json({ success: false, message: 'Account already exists for this mail Id' })
        }

        return res.json({ success: true, message: 'No user found' })
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }
})


module.exports = router;