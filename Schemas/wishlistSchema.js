const localProperty=require('../Properties');
const mongoose=localProperty.Property.getMongoose
const Schema=mongoose.Schema;
const WishListModel=new Schema(localProperty.wishlistSchema)
module.exports=WishListModel;