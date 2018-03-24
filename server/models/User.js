const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username : { type : String, required : true, unique : true },
    password : { type : String, required : true },
    name : { type : String, required : true },
    email : { 
        type : String, 
        //cannot be created without
        required : true, 
        //optimises search, it knows that there is one document
        unique : true, 
        //use valid email
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
}, {
    versionKey: false 
});
// save to db
UserSchema.statics.saveUser = function(data, callback){
    var user = new this(data);
    user.save(callback);
};
//find all users
UserSchema.statics.findUser = function(callback) {
    this.find({}, '-_id', callback);
};
//get user by password
UserSchema.statics.findUserByName = function(username, callback) {
    this.find({'username' : username},'-_id', callback);
};
//update password
UserSchema.statics.updateUser = function(username, password, callback){
    //var now = new Date(),
    query = { "username" : username },
    update = {
        "$set": { "password": password } 
    },
    options = { "multi": true };

    this.update(query, update, options, callback);
 
};
module.exports = mongoose.model('User', UserSchema);