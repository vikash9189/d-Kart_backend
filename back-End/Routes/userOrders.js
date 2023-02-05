const express = require('express');
const router = express.Router();
const localProperty = require('../Properties');
const mongoose = localProperty.Property.getMongoose;
const ordersModel = require('../Schemas/OrdersSchema')
const Model = mongoose.model('ORDERS', ordersModel);

router.post('/confirm', async (req, res) => {
    try {
        if (req.body[0].paymentMethod == 'UPI' && (req.body[0].UPI_Id == null || req.body[0].UPI_Id == "")) {
            return res.status(404).json({ success: false, message: 'Please, provide UPI_Id' });
        }
        if (!req.body[0].paymentMethod) {
            return res.status(404).json({ success: false, message: 'Please,choose any one paymentMethod' })
        }
        const orders = await Model.insertMany(req.body);
        if (orders.length == 0 || orders == null) {
            return res.status(400).json({ success: false, message: "Orders not placed successfully due to missing data" })
        }
        return res.json({ success: true,orders});
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }

})

router.get('/:userId', async (req, res) => {
    try {
        const fetchOrders = await Model.find({ userId: req.params.userId });
        return res.json(fetchOrders)
    } catch (error) {
        return res.status(500).json(error);
    }
})

router.patch('/cancel/:orderId', async (req, res) => {
    try {
        const cancelOrder = await Model.findByIdAndUpdate(req.params.orderId, { order: 'cancelled' });
        return res.json({success:true,cancelOrder});
    } catch (error) {
        return res.status(500).json({success:false,error});
    }
})


module.exports = router;