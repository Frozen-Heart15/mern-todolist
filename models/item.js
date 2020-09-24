const mongoose = require('mongoose');

const itemSchema ={
    name:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
}

const Item = new mongoose.model('Item', itemSchema);

module.exports = Item;