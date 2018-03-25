// NewsRoute.js
// Root : /recommendations
/*
    Routes : 
        / : GET the pcm² recommendations for today
*/

const express = require('express');
//setup express router
const router = express.Router();

// import mongoose schema
//const News = require('../models/News');

const staticRecommendations = {
	AAPL : { week : true, month : false, trimestre : true, year : false, max :true },
	MSFT : { week : false, month : true, trimestre : true, year : false, max :true },
	IBM  : { week : false, month : false, trimestre : true, year : false, max :true },
	CSCO : { week : true, month : false, trimestre : true, year : false, max :true },
	ANSS : { week : true, month : true, trimestre : true, year : false, max :true },
	IXIC : { week : true, month : true, trimestre : true, year : true, max :true },
};

//Get symbols
router.get('/', (req, res) => {
    res.send({ recommendations : staticRecommendations });
});

module.exports = router;