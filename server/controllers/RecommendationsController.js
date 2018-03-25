function getAdvice(lastRealValue, predictionData)
{
	/*let up = 0, down = 0;

	predictionData.forEach((element) => {

	});*/
	last = predictionData[predictionData.length - 1].prediction;
	return (last > lastRealValue);
}

class RecommendationsController
{
	/*
		9- Calculer les recommandations selon symbolPredictions
		[ 10- Envoyer les recommandations aux clients avec Socket.io ]
		11- Stocker les recommandations dans la base de données
	*/
	static update(symbolLastValue, symbolPredictions)
	{
		//AAPL : { week : true, month : false, trimestre : true, year : false, max :true },
		console.log("update from RecommendationsController : ");
		console.log(symbolPredictions);

		const advice = {};
		advice.week = getAdvice(symbolLastValue, symbolPredictions.week);
		advice.month = getAdvice(symbolLastValue, symbolPredictions.month);
		advice.trimestre = getAdvice(symbolLastValue, symbolPredictions.trimestre);
		advice.year = getAdvice(symbolLastValue, symbolPredictions.year);
		advice.max = getAdvice(symbolLastValue, symbolPredictions.max);

		console.log("advice");
		console.log(advice);
	}

}

module.exports = RecommendationsController;