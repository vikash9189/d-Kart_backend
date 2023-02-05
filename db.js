const mongoose=require('mongoose')
const dotenv=require('dotenv').config({path:__dirname+'/.env'});
const connectionString=process.env.mongoURI;
const connection=()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(connectionString,()=>{
        console.log("Database Connection Successful")
    })
}


module.exports=connection;