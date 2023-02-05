const localProperty=require('../Properties');
const mongoose=localProperty.Property.getMongoose
const Schema=mongoose.Schema;

const cartModel=new Schema(localProperty.cartSchema)
module.exports=cartModel;