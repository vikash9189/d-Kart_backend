const { Router } = require('@material-ui/icons');
const localProperty = require('../Properties')
const mongoose = localProperty.Property.getMongoose
const express = require('express');
const ProductModel = require('../Schemas/ProductSchema');
const router = express.Router();
const Model = mongoose.model('PRODUCT', ProductModel);



// for getting all the products
router.get('/', async (req, res) => {
    try {
        const availableProducts = await Model.find();
        if (availableProducts.length == 0) {
            return res.json({ message: "No products available right now" });
        }
        return res.json(availableProducts);

    } catch (error) {
        return res.status(500).json("Internal Server error occured")

    }

})
router.get('/category', async (req, res) => {
    try {

        const availableProducts = await Model.find().distinct("category");
        return res.json(availableProducts);

    } catch (error) {
        return res.status(500).json(error)

    }

})
router.get('/categoryCount/:category',async(req,res)=>{

    try {
        const getCatCount=await Model.countDocuments({category:req.params.category});
        return res.json(getCatCount);

    } catch (error) {
        return res.status(500).json(error)
    }
})
router.get('/typeCount/:itemType',async(req,res)=>{

    try {
        const getTypeCount=await Model.countDocuments({itemType:req.params.itemType});
        return res.json(getTypeCount);

    } catch (error) {
        return res.status(500).json(error)
    }
})
router.get('/itemType', async (req, res) => {
    try {

        const availableProducts = await Model.find().distinct("itemType");
        return res.json(availableProducts);

    } catch (error) {
        return res.status(500).json("Internal Server error occured")

    }

})

router.get('/brand', async (req, res) => {
    try {

        const availableProducts = await Model.find().distinct("brand");
        return res.json(availableProducts);

    } catch (error) {
        return res.status(500).json("Internal Server error occured")

    }

})

router.get('/id/:id', async (req, res) => {
    try {
        const product = await Model.findById(req.params.id);
        if (!product) { 
            return res.json({ message: "No details regarding this product " });
        }
        return res.json(product);

    } catch (error) {
        return res.status(500).json({ message: "Some internal error occured while loading Product Info" })
    }


})


//get products by categories
router.get('/category/:category', async (req, res) => {
    try {
      
        product = await Model.find({ category: req.params.category });  

        if (product.length == 0) {
            return res.json({ message: `no product found in ${req.params.category} category` });
        }
        let sort = req.query.sort;
        if (sort != undefined) {
            return res.json(product.sort(sort == "ascending" ? comparator1 : comparator2));
        }
        return res.json(product);


    } catch (error) {
        return res.status(500).json(error);
    }

})


router.get('/brand/:brand', async (req, res) => {
    try {
        const product = await Model.find({ brand: req.params.brand });
        if (product.length == 0) {
            return res.json({ message: `no product found with ${req.params.brand} brand` });
        }
        return res.json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
   
})

router.get('/type/:type', async (req, res) => {
    try {
        const product = await Model.find({ itemType: req.params.type });
        return res.json(product);
    } catch (error) {
        return res.status(500).json(error);
    }

})

router.get('/gender/:gender', async (req, res) => {
    try {
        gender=req.params.gender=="Men"?"Male":"Female";
        const product = await Model.find({ gender});
        return res.json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
})






module.exports = router;