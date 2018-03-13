// QuotePerMinuteRoute.js
// Root : /quote-per-minute
/*
    Routes : 
        /latest : GET the latest quotes for a symbol
*/

const express = require('express');
const ServerHistoryKeeper = require('../ServerHistoryKeeper');

// setup express router
const router = express.Router();
// import mongoose schema
const QuotePerMinute = require('../models/QuotePerMinute');

//Get the latest quotes for a symbol
router.get('/latest', (req, res) => {
    const symbol = req.query.symbol;
    res.send({ quoteData : ServerHistoryKeeper.fetchQuotes(symbol) });
});


module.exports = router;