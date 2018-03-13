// NewsRoute.js
// Root : /news
/*
    Routes : 
        /latest : GET the latest news
*/

const express = require('express');
//setup express router
const router = express.Router();
const ServerHistoryKeeper = require('../ServerHistoryKeeper');

// import mongoose schema
const News = require('../models/News');

//Get symbols
router.get('/latest', (req, res) => {
    const latestNews = ServerHistoryKeeper.fetchNews();
    res.send({ latestNews : latestNews });
});

module.exports = router;