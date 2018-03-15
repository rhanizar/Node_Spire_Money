const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    minute : Date,
    symbol : String,
    title : String,
    url : String
}, {
    versionKey: false 
});
//save news to db
NewsSchema.statics.saveNews = function(data, callback){
    var news = new this(data);
    news.save(callback);
};
//search for a symbol 
NewsSchema.statics.findAllBySymbol = function  (sym, callback) {
    this.find({'symbol' : sym}, callback);
};
//search for a symbol 
NewsSchema.statics.findOneSBySymbol = function  (sym, min, callback) {
    this.find({'symbol' : sym, 'minute' : min}, callback);
};
//Find all news
NewsSchema.statics.findAll = function (start, end, callback){
    this.find({"minute": {"$gte": start, "$lt": end}}, 'title url symbol -_id', callback);
}
//Find latest news
NewsSchema.statics.findLatest = function (callback){
    this.find({}, 'title url -_id').sort({'minute': -1}).limit(30).exec(callback);;
}
module.exports = mongoose.model('News', NewsSchema);