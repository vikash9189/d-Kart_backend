// const { Router } = require('@material-ui/icons');
const localProperty = require('../Properties')
const mongoose = localProperty.Property.getMongoose
const express = require('express');
const wishlistModel = require('../Schemas/wishlistSchema');
const router = express.Router();
const Model = mongoose.model('WISHLIST', wishlistModel);

router.post('/add', async (req, res) => {
    try {
        if (!req.body.productId || !req.body.userId) {
            return res.json({ success: false, message: "Please,provide required credentials" });
        }
        const findUserWishlistItem = await Model.findOne(req.body);
        if (findUserWishlistItem) {
            return res.json({ success: false, message: "Item already present in the wishlist" });
        }
        const userWishlistItem = await Model.create(req.body);
        return res.json({ success: true, userWishlistItem });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }

})

// req.body={userId}
router.get('/:userId', async (req, res) => {
    try {
        const getUserWishlist = await Model.find({ userId: req.params.userId });
        return res.json(getUserWishlist);

    } catch (error) {
        res.status(500).json(error);
    }

})


router.delete('/remove', async (req, res) => {
    try {
        const deleteUserWishlistItem = await Model.deleteOne(req.body);
        return res.json({ success: true, message: "Product successfully removed", result: deleteUserWishlistItem });

    } catch (error) {
        res.status(500).json({ success: false, message: "Some internal error occured" });
    }


})


router.get('/present/:userId/:productId', async (req, res) => {
    try {
        const request = {
            userId: req.params.userId,
            productId: req.params.productId
        }
        const wishlistItem = await Model.findOne(request);
        if (wishlistItem) {
            return res.json({ success: true });
        }
        return res.json({ success: false });
    } catch (error) {
        return res.status(500).json(error);
    }
})


module.exports = router;






