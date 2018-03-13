// QuotePerMinuteRoute.js
// importing the packages we need: express
// express is used for building the REST APIs
const express = require('express');
// setup express router
const router = express.Router();
// import mongoose schema
const QuotePerMinute = require('../models/QuotePerMinute');

//get Quotes
router.get('/', (req, res, next) => {
	QuotePerMinute.findAll( (err, quotes) => {
        if (err) {
            res.send(err);
        }
        res.json(quotes);
	});
});
//post Quotes
router.post('/', (req, res, next) => {
	const Quote = new QuotePerMinute({
        "close" : req.body.close,
        "high" : req.body.high,
        "low" : req.body.low,
        "minute" : req.body.minute,
        "open" : req.body.open,
        "symbol" : req.body.symbol,
        "volume" : req.body.volume
    });
   
    QuotePerMinute.saveQuotePerMinute(Quote, (err) => {
        if (err)
            res.send(err);
            res.status(201).json(); 
    });
});
//get Quotes with symbol
router.post('/symbol', (req, res, next) => {
	const symbol = req.body.symbol;
	QuotePerMinute.findAllBySymbol(symbol, (err, quotes) => {
        if (err) {
            res.send(err);
        }
        res.json(quotes);
	});
}); 

module.exports = router;