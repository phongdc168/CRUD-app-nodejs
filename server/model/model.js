const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    account:{ 
        type:String,
        required:true,
    },
    password:{
        type: String,
    },
    type: String,
    status: String,
   
});

const accountDB = mongoose.model('account', schema);

module.exports = accountDB;