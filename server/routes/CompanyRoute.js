//CompanyRoute.js
// importing the packages we need: express
// express is used for building the REST APIs
const express = require('express');
//setup express router
const router = express.Router();
// import mongoose schema
const Company = require('../models/Company');
//get companies
router.get('/', (req, res, next) => {
	Company.findAll( (err, companies) => {
        if (err) {
            res.send(err);
        }
        res.json(companies);
	});
});
//save companies
router.post('/', (req, res, next) => {
    const companies = req.body;
    for(var cmp in companies){
        var comp = new Company(companies[cmp]);
        Company.saveCompany(comp, (err) => {
            if (err)
            res.send(err);
            res.status(201).json(); 
        });
    };
});
//get companies with symbol
router.post('/symbol', (req, res, next) => {
	const symbol = req.body.symbol;
    Company.findBySymbol(symbol, (err, companies) => {
        if (err) {
            res.send(err);
        }
        res.json(companies);
	});
});

module.exports = router;