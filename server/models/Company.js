const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create a schema
const CompanySchema = new Schema({
	about : String,
	name : String,
	symbol : String
}, {
    versionKey: false 
});
//save a company
CompanySchema.statics.saveCompany = function(data, callback){
    var company = new this(data);
    company.save(callback);
};
//search for a symbol 
CompanySchema.statics.findBySymbol = function  (sym, callback) {
    this.find({ symbol: sym }, 'name symbol about -_id', callback);
};
//Find all companies 
CompanySchema.statics.findAll = function (callback){
    this.find({}, 'name symbol -_id', callback);
}
module.exports = mongoose.model('Company', CompanySchema);