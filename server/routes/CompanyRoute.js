// CompanyRoute.js
// Root : /company
/*
    Routes : 
        /symbols : GET symbols
        /info    : GET company info by symbol
        /states  : GET the company states
*/

const express = require('express');
const ServerHistoryKeeper = require('../ServerHistoryKeeper');

//Setup express router
const router = express.Router();
//Import mongoose schema
const Company = require('../models/Company');

//Get symbols
router.get('/symbols', (req, res) => {
    const symbols = ServerHistoryKeeper.fetchSymbols();
    res.send({ symbols : symbols });
});

//Get company info by symbol
router.get('/info', (req, res) => {
	const symbol = req.query.symbol;
    Company.findBySymbol(symbol, (err, companies) => {
            if (err)
                    res.send(err);
            res.json({company : companies[0]});
    });
    /*company = { name : `Company name of ${symbol}`, about : `About the company name of ${symbol}` };
    res.send({ company : company });*/
});

//Get the company states
router.get('/states', (req, res) => {
    const states = ServerHistoryKeeper.fetchStates();
    res.send({ states : states });
});

module.exports = router;