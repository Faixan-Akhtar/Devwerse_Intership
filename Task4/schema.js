const mongoose = require('mongoose')

const travelSchema = new mongoose.Schema({
    country:{
        type:String,
        required:true,
        trim:true,
    },
    city:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true, 
    },
    verified:{
        type:Boolean,
        required:true
    }
});

const Travel_Bucket_list = mongoose.model('Travel_Bucket_List',travelSchema);

module.exports = Travel_Bucket_list;