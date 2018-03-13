//NewsRoute.js
// importing the packages we need: express
// express is used for building the REST APIs
const express = require('express');
//setup express router
const router = express.Router();

// import mongoose schema
const News = require('../models/News');

//get news
router.get('/', (req, res, next) => {
    const start = req.body.start;
    const end = req.body.end;
	News.findAll( (err, news) => {
        if (err) {
            res.send(err);
        }
        res.json(news);
	});
});
//post news
router.post('/', (req, res, next) => {
	const New = new News({
        'minute' : req.body.minute,
        'title' : req.body.title,
		'url' : req.body.url,        
		'symbol' : req.body.symbol
    });
   
    News.saveNews(New, (err) => {
        if (err)
            res.send(err);
            res.status(201).json(); 
    });
});
//get news with symbol
router.post('/symbol', (req, res, next) => {
	const symbol = req.body.symbol;
	News.findAllBySymbol(symbol, (err, news) => {
        if (err) {
            res.send(err);
        }
        res.json(news);
	});
});

//get news with symbol in a minute
router.post('/symbol/minute', (req, res, next) => {
    const symbol = req.body.symbol;
    const minute = req.body.minute;
	News.findOneBySymbol(symbol, minute, (err, news) => {
        if (err) {
            res.send(err);
        }
        res.json(news);
	});
});

module.exports = router;