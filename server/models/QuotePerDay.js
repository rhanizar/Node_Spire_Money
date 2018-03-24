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
    quote.minute.setHours(0, 0, 0, 0);
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
//search latest by symbol 
QuotePerDaySchema.statics.findLatestBySymbol = function  (sym, date, limit, callback) {
	date.setHours(0, 0, 0, 0);
    this.find({ symbol: sym}, 'volume symbol open minute low close high -_id').where('minute').lte(date).sort({'minute': -1}).limit(limit).exec(callback);
};

module.exports = mongoose.model('QuotePerDay', QuotePerDaySchema);