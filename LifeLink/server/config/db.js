require('dotenv').config()
const mongoose = require('mongoose');


const  ConnectDB = async() =>{
    try{

        await mongoose.connect(process.env.Mongo_Url)
        console.log(`MongoDB is connected Successful✅`)

    }catch(error){
        console.log(`MongoDB connection  failed❌: ${+ error.message}`)
    }
};


module.exports = ConnectDB;

