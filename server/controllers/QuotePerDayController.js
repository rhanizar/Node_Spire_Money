const QuotePerDay = require('../models/QuotePerDay');
const QuotePerMinute = require('../models/QuotePerMinute');

const dataBase = [
	{ volume : 1000, open : 10, high : 15, low : 8, close : 11 },
	{ volume : 1515, open : 11, high : 19, low : 5, close : 13 },
	{ volume : 1000, open : 13, high : 21, low : 12, close : 20 },
	{ volume : 446541, open : 20, high : 18, low : 11, close : 12 },
];

function getHighLow(cmp, data, field)
{
	let val = data[0][field];
	
	for(let i=1; i < data.length; i++)
		val = cmp(val, data[i][field]);

	return val;
}

class QuotePerDayController {
	/* 1- Calcul de QuotePerDay
	   2- Stocker de QuotePerDay
	*/
	static quoteOfToday(date, symbol, callback)
	{
		//Calcul de quote de date
		let quote = { symbol : symbol, minute : date };

		let myTestDate = new Date('2018-02-27T16:00:00.000Z');

		/* Dynamic data
		QuotePerMinute.findByDay(symbol, date, (err, result) => {
			quote.open = result.open;
			quote.high = getHighLow(Math.max, result, "high");
			quote.low = getHighLow(Math.min, result, "low");	
			quote.close = result[result.length - 1].close;
			quote.volume = result[result.length - 1].volume;
		});*/

		quote.open = dataBase[0].open;
		quote.high = getHighLow(Math.max, dataBase, "high");
		quote.low = getHighLow(Math.min, dataBase, "low");	
		quote.close = dataBase[dataBase.length - 1].close;
		quote.volume = dataBase[dataBase.length - 1].volume;
		console.log("Quote : ");
		console.log(quote);
		//Stockage
		QuotePerDay.saveQuotePerDay(quote, (err, savedQuote) => {
			callback(savedQuote);
		});
		
		//Appel de callback après le stockage
		
	}
}

module.exports = QuotePerDayController;