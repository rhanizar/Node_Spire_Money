const https = require("https");
const express = require('express');
	// create express app
const app = express();
const bodyParser  = require('body-parser');
	// use body-parser to parse data
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
//request package to get informations from alpha vantage
var request = require("request");
//Mongoose for database: mongodb
const mongoose = require('mongoose');
// DATABASE
// ===========================================================================
// Configuring the database
var dbConfig = require('../server/config/database.config.js');
//mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
	//useMongoClient: true
});
mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
});
// ===========================================================================
// import mongoose schema
//quote schema
const QuotePerDay = require('../server/models/QuotePerDay');
//companies schema
const Company = require('../server/models/Company');
//search symbols and for each one get quotes
Company.find({}, 'symbol -_id', (err, companies) => {
  if (!err)
   //browse companies to get symbol
    for(comp in companies){
      //company symbol
      //console.log(companies[comp].symbol);
      //url 
      var url ="";
      url="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
      url += companies[comp].symbol;
      url += "&interval=15min&outputsize=full&apikey=T4U4DMJSJXBRB1YN";
      //console.log(url);
      request({
        url: url,
        json: true
      }, function (error, response, body) {
      
          if (!error && response.statusCode === 200) {
              for(item in body["Time Series (Daily)"]){
                const quote = {
                  "close" : body["Time Series (Daily)"][item]["4. close"],
                  "high"  : body["Time Series (Daily)"][item]["2. high"],
                  "low"   : body["Time Series (Daily)"][item]["3. low"],
                  "minute": item,
                  "open"  : body["Time Series (Daily)"][item]["1. open"],
                  "symbol": body["Meta Data"]["2. Symbol"],
                  "volume": body["Time Series (Daily)"][item]["5. volume"]
                }

                console.log("quote");
                console.log(quote);
                console.log("**********************");
                QuotePerDay.saveQuotePerDay(new QuotePerDay(quote), (err) => {
                  if(!err)
                    console.log("saved!");
                  else{
                    console.log("err");
                    console.log(err);
                  }
                });
              }
          }
      });
    }
});