// const { Router } = require('@material-ui/icons');
const localProperty = require('../Properties')
const mongoose = localProperty.Property.getMongoose
const express = require('express');
const ProductModel = require('../Schemas/ProductSchema');
const router = express.Router();
const Model = mongoose.model('PRODUCT', ProductModel);

let getTotalQuantity = (req) => {
    return parseInt(req.small) + parseInt(req.medium) + parseInt(req.large) + parseInt(req.xLarge);
}

// changing 1st letter to uppercase
let changeToUppercase = (string) => {
    return string[0].toUpperCase() + string.slice(1, string.length);
}

let removeSpace = (imageName) => {
    imageName = imageName.replace(/[/\\?%*:|"<>]/g, " ");
    let list = imageName.split(" ");
    return list.join("");
}
let parseSpecs = (string) => {
    let list = string.split(",");
    return list;
}

// for creating product 
router.post('/add', async (req, res) => {

    try {
        if (req.body.category == "" || req.body.itemType == "" || req.body.price == null || req.body.brand == "" || req.body.name == "") {
            return res.set(400).json({ success: false, message: "Incomplete data found,please provide required fields" })
        }
        req.body.itemType = changeToUppercase(req.body.itemType);
        req.body.category = changeToUppercase(req.body.category);
        if (req.body.category != "Clothing") {
            delete req.body["gender"];
            delete req.body["small"];
            delete req.body["medium"];
            delete req.body["large"];
            delete req.body["xLarge"];
        }
        else {
            req.body.quantity = req.body["small"] + req.body["medium"] + req.body["large"] + req.body["xLarge"]
        }


        if (req.body.category == "Clothing" && !req.body.gender) {
            return res.set(400).json({ success: false, message: "Incomplete data found,please provide required fields" })
        }


        req.body.name = changeToUppercase(req.body.name);
        req.body.image = removeSpace(req.body.name);
        req.body.description = parseSpecs(req.body.description);

        const product = await Model.findOne({ image: req.body.image });
        if (product) {
            return res.json({ success: false, message: "Product already exist" });
        }
        Model.create(req.body).then((result) => {
            return res.json({ success: true, message: "Product added successfully", result });
        })
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }




})



// for updating product quantity
router.patch('/updateQuantity/:id', async (req, res) => {
    try {
        if (!req.params.id || req.body == null) {
            return res.status(404).json({ success: false, message: "Please provide required details" })
        }

        const product = await Model.findById(req.params.id);
        if (!product) {
            return res.json({ success: false, message: "Product doesn't exist" });
        }
        const newQuantity = { quantity: req.body.quantity };

        let updateRecord = await Model.findByIdAndUpdate(req.params.id, newQuantity);

        return res.json({ success: true, message: "Product quantity updated successfully", updateRecord })

    } catch (error) {
        return res.status(500).json({ success: false, error })

    }
})

router.patch('/updateQuantity/Clothing/:id', async (req, res) => {
    try {
        if (!req.params.id || !req.body) {
            return res.status(404).json({ success: false, message: "Please provide required details" })
        }
        const product = await Model.findById(req.params.id);
        if (!product) {
            return res.json({ success: false, message: "Product doesn't exist" });
        }

        req.body.quantity = getTotalQuantity(req.body);

        let updateRecord = await Model.findByIdAndUpdate(req.params.id, req.body);

        return res.json({ success: true, message: "Product quantity updated successfully", updateRecord })

    } catch (error) {
        return res.status(500).json({ success: false, error })

    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteProduct = await Model.findByIdAndDelete(req.params.id);
        return res.json({ success: true, message: 'Product deleted' });

    } catch (error) {
        return res.status(500).json({ success: false, error })

    }
})

module.exports = router;


