// PredictionRoute.js
// Root : /predictions
/*
    Routes : 
        / : GET the predictions of a symbol
        /history : GET the history of predictions with real values for a symbol
*/

const express = require('express');
//setup express router
const router = express.Router();
const ServerHistoryKeeper = require('../ServerHistoryKeeper');

// import mongoose schema
//const News = require('../models/News');

const predictionStaticData = {
			week : [ { prediction : 450, time : 'date_1' },
					 { prediction : 789, time : 'date_2' },
					 { prediction : 200, time : 'date_3' },
					 { prediction : 300, time : 'date_4' } 
			],
			month : [ { prediction : 198, time : 'date_5' },
					 { prediction : 510, time : 'date_6' },
					 { prediction : 476, time : 'date_7' },
					 { prediction : 510, time : 'date_8' } 
			],
			trimestre : [ { prediction : 774, time : 'date_9' },
					 { prediction : 747, time : 'date_3' },
					 { prediction : 444, time : 'date_3' },
					 { prediction : 510, time : 'date_3' } 
			],
			year : [ { prediction : 447, time : 'date_4' },
					 { prediction : 5110, time : 'date_4' },
					 { prediction : 477, time : 'date_4' },
					 { prediction : 510, time : 'date_4' } 
			],
			max : [ { prediction : 147, time : 'date_5' },
					 { prediction : 710, time : 'date_5' },
					 { prediction : 860, time : 'date_5' },
					 { prediction : 130, time : 'date_5' } 
			],
};

const predictionHistoryData = {
			week : [ { reality : 450, prediction : 400, time : 'date_1' },
					 { reality : 789, prediction : 700, time : 'date_2' },
					 { reality : 200, prediction : 150, time : 'date_3' },
					 { reality : 300, prediction : 250, time : 'date_4' } 
			],
			month : [ { reality : 198, prediction : 150, time : 'date_5' },
					  { reality : 510, prediction : 450, time : 'date_6' },
					  { reality : 476, prediction : 450, time : 'date_7' },
					  { reality : 510, prediction : 450, time : 'date_8' } 
			],
			trimestre : [ { reality : 774, prediction : 750, time : 'date_9' },
						  { reality : 747, prediction : 700, time : 'date_10' },
						  { reality : 444, prediction : 400, time : 'date_11' },
						  { reality : 510, prediction : 490, time : 'date_12' } 
			],
			year : [ { reality : 446, prediction : 400, time : 'date_13' },
					 { reality : 500, prediction : 450, time : 'date_4' },
					 { reality : 471, prediction : 450, time : 'date_4' },
					 { reality : 500, prediction : 480, time : 'date_4' } 
			],
			max : [  { reality : 400, prediction : 350, time : 'date_5' },
					 { reality : 710, prediction : 650, time : 'date_5' },
					 { reality : 860, prediction : 800, time : 'date_5' },
					 { reality : 130, prediction : 100, time : 'date_5' } 
			],
};

//GET the predictions of a symbol
router.get('/', (req, res) => {
	const symbol = req.query.symbol;
	if (symbol)
	{
		res.send({ predictions : predictionStaticData });	
	}
});

//GET the history of predictions with real values for a symbol
router.get('/history', (req, res) => {
	const symbol = req.query.symbol;
	if (symbol)
	{
		res.send({ history : predictionHistoryData });	
	}
});

module.exports = router;