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
//Find quotes of a specific date & symbol between two dates
QuotePerMinuteSchema.statics.findByDate = function (sym, start, end, callback){
    this.find({"symbol" : sym, "minute": {"$gte": start, "$lt": end}}, '-_id', callback);
}
//Find quotes of a specific date & symbol between two dates
QuotePerMinuteSchema.statics.findByDay = function (sym, day, callback){
	let start = new Date(day);
	let end  = new Date(day);
	start.setHours(0, 0, 0, 0);
	end.setHours(23, 59, 59, 999);
	//console.log(start);
	//console.log(end);
    this.find({"symbol" : sym, "minute": {"$gte": start, "$lt": end}}, '-_id', callback);
}
//Find Latest quotes
QuotePerMinuteSchema.statics.findLatest = function (sym, limit, callback){
	var result;
	this.find({ symbol: sym }, 'volume open low minute close high _id').sort({'minute': 1}).limit(limit).exec((err, quotes) => {
        if (!err) {
			result = [];
			let i = 0, cpt = 0;
			let indexes = {};
			for(var item in quotes){
				var quote = quotes[item];
				const News = require('../models/News');
				const obj = { "quote" : {
								"open" : quote.open,
								"high" : quote.high,
								"low" : quote.low,
								"close" : quote.close,
								"volume" : quote.volume,
								"_id" : quote._id
							}, "news" : [], "time" : quote.minute
						};

				result.push(obj);
				let key = new Date(quote.minute);
				indexes[key] = i;
				News.find({'time': quote.minute, 'symbol': sym}, '-_id -symbol', (er, news) => {
					if(!er){
						if (news.length > 0){
							let key2 = new Date(news[0].time);
							let index = indexes[key2];
							result[index].news = news;
						}
					}
					
					cpt++;
					if (cpt == quotes.length){
						callback({
							[sym] : result 
						});
					}
				});

				i++;
			}
		}
	});
}

module.exports = mongoose.model('QuotePerMinute', QuotePerMinuteSchema);