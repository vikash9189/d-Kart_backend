const localProperty=require('../Properties');
const mongoose=localProperty.Property.getMongoose
const Schema=mongoose.Schema;

const UserModel=new Schema(localProperty.signUpSchema)
module.exports=UserModel;