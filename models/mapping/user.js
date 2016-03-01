var mongoose = require("mongoose");
var schema = new mongoose.Schema({
    username:String,
    password:String,
    status:{type:Number,default:0},
    type:{type:Number,default:0}
}, {collection : 'user'});
var user = mongoose.model('user', schema);
exports = user;
