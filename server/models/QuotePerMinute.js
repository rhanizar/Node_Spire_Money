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

QuotePerMinuteSchema.statics.findLatest = function (sym, limit, callback){
	var result;
	this.find({ symbol: sym }, 'volume open low minute close high _id').sort({'minute': 1}).limit(limit).exec((err, quotes) => {
        if (!err) {
			result = [];
			console.log("quotes for "+ sym +": ");
			console.log(quotes);
			let i = 0, cpt = 0;
			let indexes = {};
			for(var item in quotes){
				var quote = quotes[item];
				console.log("quote");
				console.log(quote);
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
				console.log("key : "+key+" value : "+i);
				//console.log('hello after declaring news model');
				News.find({'time': quote.minute, 'symbol': sym}, '-_id -symbol', (er, news) => {
					if (er)
						console.log(er);
					if(!er){
						if (news.length > 0){
							let key2 = new Date(news[0].time);
							let index = indexes[key2];
							console.log("key2 : "+ key2 +" value2 : "+index);
							result[index].news = news;
						}

						cpt++;
						if (cpt == quotes.length){
							console.log('result :');
							console.log(result);
							callback({
								[sym] : result 
							});
						}
					}
				});

				i++;
			}

			console.log("*********************");
		}
	});
}

module.exports = mongoose.model('QuotePerMinute', QuotePerMinuteSchema);