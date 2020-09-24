const mongoose = require('mongoose');

const userSchema ={
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    register_date:{
        type:Date,
        default:Date.now
    }
}

const User = new mongoose.model('User', userSchema);

module.exports = User;