const mongoose = require('mongoose');

const QuotePerMinuteSchema = mongoose.Schema({
	close : Number,
	high : Number,
	low : Number,
	minute : Date,
	open : Number,
	symbol : String,
	volume : Number
}, {
    versionKey: false 
}); 
// save to db
QuotePerMinuteSchema.statics.saveQuotePerMinute = function(data, callback){
    var quote = new this(data);
    quote.save(callback);
};
//search for a symbol 
QuotePerMinuteSchema.statics.findAllBySymbol = function  (sym, callback) {
    this.find({ symbol: sym }, 'volume symbol open minute low close high -_id', callback);
};
//Find all quotes per minute 
QuotePerMinuteSchema.statics.findAll = function (callback){
    this.find({}, '-_id', callback).sort('-symbol');
}
module.exports = mongoose.model('QuotePerMinute', QuotePerMinuteSchema);