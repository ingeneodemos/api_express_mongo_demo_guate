var mongoose=require("mongoose");

module.exports = new mongoose.Schema({
    identity:{type:Number, required:true},
    name:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true},
    line:{type:Number, required:true},
    balance:{type:Number, required:true}
});