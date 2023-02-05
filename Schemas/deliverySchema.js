const localProperty=require('../Properties');
const mongoose=localProperty.Property.getMongoose
const Schema=mongoose.Schema;

const addressModel=new Schema(localProperty.addressSchema)
module.exports=addressModel;