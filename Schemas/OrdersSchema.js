const localProperty=require('../Properties');
const mongoose=localProperty.Property.getMongoose
const Schema=mongoose.Schema;

const OrdersModel=new Schema(localProperty.orders)
module.exports=OrdersModel;