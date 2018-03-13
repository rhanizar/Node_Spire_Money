//QuotePerDayRoute.js
// importing the packages we need: express
// express is used for building the REST APIs
const express = require('express');
//setup express router
const router = express.Router();

// import mongoose schema
const QuotePerDay = require('../models/QuotePerDay');

//get Quotes
router.get('/', (req, res, next) => {
	QuotePerDay.find({}, '-_id', (err, quotes) => {
        if (err) {
            res.send(err);
        }
        res.json(quotes);
	});
});
//post Quotes
router.post('/', (req, res, next) => {
	const Quotes = req.body;
    for(var quote in Quotes){
        QuotePerDay.saveQuotePerDay(new QuotePerDay(Quotes[quote]), (err) => {
            if (err)
            res.send(err);
            res.status(201).json(); 
        });
    };
});
//get Quotes with symbol
router.get('/:symbol', (req, res, next) => {
	//const symbol = req.params.symbol;
	QuotePerDay.findOne({'symbol' : req.params.symbol}, (err, quotes) => {
        if (err) {
            res.send(err);
        }
        res.json(quotes);
	});
});

module.exports = router;