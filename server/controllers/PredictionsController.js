const DayPrediction = require('../models/DayPrediction');
const FinalDayPrediction = require('../models/FinalDayPrediction');
const QuotePerDay = require('../models/QuotePerDay');

/*	symbol : (string)
	close : (double)
	day : (date)
	insertion_date : (date)*/

const dataBase = [
	{ close : 14 },
	{ close : 9 },
	{ close : 11 },
	{ close : 3 },
];

class PredictionsController {
	/*
		3- Obtenir les predictions pour la même date et le même symbole à partir de 
		   la collection DayPrediction
		4- Calculer la quote la plus proche de 'quote' => O2
		5- Stocker O2 dans la collection  FinalPrediction
	*/
	static saveBestPrediction(quote, callback) {
		/* Dynamic work */
		let myDate = new Date('2018-02-27 16:10:00');
		/*DayPrediction.findByDate(quote.symbol, quote.day, (err, result) => {
			let close = result[0].close;
			for (let i = 1; i < result.length; i++)
			{
				if ( Math.abs(close - quote.close) > Math.abs(result[i].close - quote.close))
					close = result[i].close;
			}
			const finalPrediction = { close : close, symbol : quote.symbol, day : quote.day };
			FinalDayPrediction.saveFinalDayPrediction(finalPrediction, (err, prediction) => {
				callback();
			});
		});*/


		let close = dataBase[0].close;
		for (let i = 1; i < dataBase.length; i++)
		{
			if ( Math.abs(close - quote.close) > Math.abs(dataBase[i].close - quote.close))
				close = dataBase[i].close;
		}
		
		callback();
	}

	/*
		6- Obtenir les 22 dérnières QuotePerDay pour le symbol en question à 
		   partir de la date 'date' => D1
		7- Envoyer D1 à SPARK <=> PN
		8- Stocker PN dans la base de données (collection DayPrediction)
	*/
	static makePrediction(date, symbol, callback)
	{
		const limitForPredictions = 22;
		QuotePerDay.findLatestBySymbol(symbol, date, limitForPredictions, (error, result) => {
			console.log("result");
			console.log(result);
			//Partie SPARK
			//Stockage de chaque prédiction + incrémenter un compteur avant d'appeler le callback
		})

		const symbolPredictions = {
				symbol : 'AAPL',
				week : [ { prediction : 510, time : 'date' },
						 { prediction : 192, time : 'date' },
						 { prediction : 510, time : 'date' },
						 { prediction : 10, time : 'date' },
				], // 5,
				month : [ { prediction : 159, time : 'date' },
						 { prediction : 110, time : 'date' },
						 { prediction : 9, time : 'date' },
						 { prediction : 8, time : 'date' },
				], // 22,
				trimestre : [ { prediction : 982, time : 'date' },
						 { prediction : 192, time : 'date' },
						 { prediction : 100, time : 'date' },
						 { prediction : 20, time : 'date' },
				], // 22 * 3,
				year : [ { prediction : 100, time : 'date' },
						 { prediction : 110, time : 'date' },
						 { prediction : 90, time : 'date' },
						 { prediction : 50, time : 'date' },
				], // 22 * 12,
				max : [ { prediction : 510, time : 'date' },
						 { prediction : 192, time : 'date' },
						 { prediction : 510, time : 'date' },
						 { prediction : 9, time : 'date' },
				] // 22 * 5,
			}
		callback(symbolPredictions);
		
	}
}

module.exports = PredictionsController;