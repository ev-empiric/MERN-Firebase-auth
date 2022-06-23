const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id : {type:String, required:true},
    name: {type:String,required:true,trim: true},
    email: {type:String,required:true,trim: true},
    contact: {type:String,required:true,trim: true},
    profile : {type:String},
    isAdmin:{type:Boolean},
    token: { type: String },
})

const User = mongoose.model("user", userSchema);

module.exports = { User }