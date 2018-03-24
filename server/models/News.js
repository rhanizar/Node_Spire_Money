const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    time : Date,
    symbol : String,
    titre : String,
    link : String,
    description : String
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
    this.find({'symbol' : sym, 'time' : min}, callback);
};
//Find all news
NewsSchema.statics.findAll = function (start, end, callback){
    this.find({"time": {"$gte": start, "$lt": end}}, 'titre link symbol -_id', callback);
}
//Find latest news
NewsSchema.statics.findLatest = function (callback){
    this.find({}, 'time symbol titre link -_id').sort({'time': -1}).limit(30).exec(callback);;
}

module.exports = mongoose.model('News', NewsSchema);