const mongoose = require('mongoose');

const QuotePerDaySchema = mongoose.Schema({
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
QuotePerDaySchema.statics.saveQuotePerDay = function(data, callback){
    var quote = new this(data);
    quote.save(callback);
};
//search for a symbol 
QuotePerDaySchema.statics.findAllBySymbol = function  (sym, callback) {
    this.find({ symbol: sym }, 'volume symbol open minute low close high -_id', callback);
};
//Find all quotes per day 
QuotePerDaySchema.statics.findAll = function (callback){
    this.find({}, '-_id', callback).sort('-symbol');
}
module.exports = mongoose.model('QuotePerDay', QuotePerDaySchema);