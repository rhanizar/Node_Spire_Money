const startDate = new Date(2010, 1, 1);
const tmpDate = new Date(2010, 1, 1);

class DevServer
{
	static startPredictions(symbols)
	{
		if (symbols)
		{
			symbols.forEach((element) => {
				PredictionsController.makePrediction(startDate, element.symbol, (symbolPredictions) => {});
				const quote = QuotePerDay(element.symbol, tmpDate);
				PredictionsController.saveBestPrediction(quote, () => {
					tmpDate.setDate( tmpDate.getDate() + 1);
				});

			});
		}
	}
}

module.exports = DevServer;