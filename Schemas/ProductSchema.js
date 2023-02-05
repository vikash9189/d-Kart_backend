const localProperty=require('../Properties');
const mongoose=localProperty.Property.getMongoose
const Schema=mongoose.Schema;

const ProductModel=new Schema(localProperty.itemSchema)
module.exports=ProductModel;