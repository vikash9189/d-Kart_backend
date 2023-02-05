const express = require('express');
const router = express.Router();
const localProperty = require('../Properties');
const mongoose = localProperty.Property.getMongoose;
const cartModel = require('../Schemas/cartSchema')
const Model = mongoose.model('CART', cartModel);


router.post('/add', async (req, res) => {
    try {
        let request = JSON.parse(JSON.stringify(req.body));
        delete request['quantity'];
        if (request.size != undefined) {
            delete request['size'];
        }
        const findUserCartItem = await Model.findOne(request);
        if (findUserCartItem) {
            return res.json({ success: false, message: "Product already present in the cart" });
        }
        const cartItem = await Model.create(req.body);
        if (!cartItem) {
            return res.json({ success: false, message: " Failed to add product to cart" })
        }

        return res.json({ success: true, message: "Item added to cart successfully", data: cartItem })
    } catch (error) {
        return res.json({ success: false, error });
    }


})

router.delete('/remove', async (req, res) => {
    try {
        const deleteUserCartItem = await Model.deleteOne(req.body);
        return res.json({ success: true, message: "Product successfully removed", result: deleteUserCartItem });

    } catch (error) {
        res.status(500).json({ success: false, message: "Some internal error occured" });
    }


})


router.patch('/updateQuantity', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const request = { userId, productId };
        const newQuantity = { quantity };

        const updatedItem = await Model.findOneAndUpdate(request, newQuantity).select('-quantity');
        if (!updatedItem) {
            return res.json({ success: false, message: "item not updated" });
        }
        return res.json({ success: true, result: updatedItem });

    } catch (error) {
        return res.json({ success: false, error });
    }
})

router.patch('/updateSize',async(req,res)=>{
    try {
        const { userId, productId, size } = req.body;
        const request = { userId, productId };
        const newSize = {size};
        const updatedItem = await Model.findOneAndUpdate(request, newSize).select('-quantity');
        if (!updatedItem) {
            return res.json({ success: false, message: "item not updated" });
        }
        return res.json({ success: true, result: updatedItem });
    } catch (error) {
        return res.json({ success: false, error });
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const getUserCartItems = await Model.find({ userId: req.params.userId });
        return res.json(getUserCartItems);

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }

})

router.delete('/empty/:userId', async (req, res) => {
    try {
        const emptyCart = await Model.deleteMany({ userId: req.params.userId });
        return res.json(emptyCart);
    } catch (error) {
        return res.status(500).json(error);
    }
})
module.exports = router;
