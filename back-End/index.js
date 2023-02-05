const express=require('express');
const localProperty=require('./Properties');
const app=express();
const dbConnect=require('./db');
const signUpRouting=require('./Routes/SignUp');
const logInRouting=require('./Routes/LogIn')
const createProductRouting=require('./Routes/CreateProduct');
const getItemDetails=require('./Routes/FetchProduct');
const getUserDetails=require('./Routes/userInfo');
const userWishlist=require('./Routes/userWishlist');
const userCart=require('./Routes/userCart');
const deliveryAddress=require('./Routes/address');
const orders=require('./Routes/userOrders');
const sendOTP   =require('./Routes/OTPverification');
const { verify } = require('jsonwebtoken');
const dotenv=require('dotenv').config({path:__dirname+'/.env'});
const portNum=process.env.port;
dbConnect();

app.use(express.json())

// for SignUp
app.use('/signUp',signUpRouting);

// for logIn
app.use('/logIn',logInRouting);

//for creating and updating products
app.use('/product',createProductRouting);

// for users
app.use('/product',getItemDetails); 

//getting user details
app.use('/user',getUserDetails)

//operations on user wishlist items
app.use('/wishlist',userWishlist);

//operations on user cart items
app.use('/cart',userCart);

//operations on user deliveryAddress 
app.use('/delivAddress',deliveryAddress);

//operations on user orders
app.use('/order',orders);

app.get('/user/sendOTP/:contactNumber',async(req,res)=>{
   let otp= await sendOTP(req.params.contactNumber); 
   res.json({otp});
})

app.listen(portNum,()=>{
    console.log('listening at port',portNum);
})


