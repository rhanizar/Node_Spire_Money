const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username : String,
    password : String,
    name : String,
    email : String
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