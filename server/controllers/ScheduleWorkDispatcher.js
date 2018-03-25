//const ServerHistoryKeeper = require('../ServerHistoryKeeper');
const QuotePerDayController = require('./QuotePerDayController');
const PredictionsController = require('./PredictionsController');
const RecommendationsController = require('./RecommendationsController');

function mainSymbol(symbol, date)
{
	console.log("mainSymbol");
	QuotePerDayController.quoteOfToday(date, symbol, (quote) => {
		console.log("QuoteOfToday result for "+ symbol +" : ");
		console.log(quote);
		PredictionsController.saveBestPrediction(quote, () => {
			PredictionsController.makePrediction(date, symbol, (symbolPredictions) => {
				let today = new Date();
				today.setHours(0,0,0,0);
				date.setHours(0,0,0,0);

				if (date == today)
					RecommendationsController.update(quote.close, symbolPredictions);
				else
					console.log("It's not today for recommendations");
			});
		});
	});
}

class ScheduleWorkDispatcher {
	static main(symbols, date)
	{
		if (symbols)
		{
			/*symbols.forEach((element) => {
				ScheduleWorkDispatcher.mainSymbol(element.symbol, date);
			});*/
			mainSymbol(symbols[0].symbol, date);
		}
	}
}

module.exports = ScheduleWorkDispatcher;