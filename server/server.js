//--- static data -----
	const symbols = [

	  {symbol : "AAPL", company : "Apple"},
	  {symbol : "GOOG",  company : "Amx com"},
	  {symbol : "ORCL",  company : "Amx com2"},
	  {symbol : "INTC",  company : "Amx com3"},
	  {symbol : "VOD",  company : "Amx com3"},
	  {symbol : "MSFT", company : "Microsoft"},
	  {symbol : "QCOM",   company : "CC Company"},
	  {symbol : "AMZN",  company : "CC2 Company"},
	  {symbol : "CSCO", company : "Cisco"},
	  {symbol : "IBM",  company : "IBM"},
	  {symbol : "AMGN",  company : "IIS Company"},
	  {symbol : "IXIC",  company : "Nasdaq"}
	];
	const news =  [{
		link : 'https://www.forbes.com/sites/joannmuller/2018/02/16/tesla-thinks-it-will-school-toyota-on-lean-manufacturing-fixing-model-3-launch-would-be-a-start',
		titre : 'Musk Thinks Tesla Will School Toyota On Lean Manufacturing; Fixing Model 3 Launch Would Be A Start'
	}];

	const states = {
		MSFT : { volume : 2023210, price : 171.6520, difference : -1.59 },
		AAPL : { volume : 2023210, price : 171.6520, difference : 0.59 },
		CSCO : { volume : 20232665656, price : 171.6520, difference : -1.59 },
		IBM : { volume : 2023210, price : 171.6520, difference : 2.59 },
	}

	const now = new Date();
	const now2 = new Date();
	const now3 = new Date();

	now2.setMinutes(now.getMinutes() + 1);
	now3.setMinutes(now2.getMinutes() + 1);

	const data = [

		{
			quote : {
				open : 100,
				high : 123,
				low : 90,
				close : 110,
			},
			news : news,
			time : "2018-03-11 09:59:00"
		},
		{
			quote : {
				open : 111,
				high : 134,
				low : 101,
				close : 120,
			},
			news : news,
			time : "2018-03-11 10:00:00"
		},
		{
			quote : {
				open : 40,
				high : 60,
				low : 33,
				close : 50,
			},
			news : news,
			time : "2018-03-11 10:01:00"
		}
	];

//---------------------

const express = require('express');
const sourceMapSupport = require('source-map-support');
const routes = {
	      companyInfo : '/api/company_info',
	      quoteDataPerDay : '/api/quote_data_last_day',
	      symbols : '/api/symbols',
      	  userInfo : '/api/user_info',
      	  companiesStates : '/api/companies_states',
      	  latestNews : '/api/latest_news'
};

/*------ Kafka configuration ------------*/

const TOPIC_NAME = 'SpireMoney';
const ZOOKEEPER_HOST = 'localhost:2181';
const PARTITION = 0;

/*---------------------------------------*/

/*------------ Import classes -----------------*/

const RealTimeMiddleware = require('./RealTimeMiddleware');
const KafkaConsumer = require('./KafkaConsumer');
const ServerHistoryKeeper = require('./ServerHistoryKeeper');

/*---------------------------------------*/

// Initialisation
let app = express();
let PORT = process.env.PORT || 3000;

ServerHistoryKeeper.Init(symbols); // Symbols from MongoDB

sourceMapSupport.install();
/*
let CLIENT_DIR = path.resolve(`./client/static_content/`);
let INDEX_PAGE = `${CLIENT_DIR}/index.html`;
*/

const user = {'x-auth' : '1233333', name : 'Account name', email : 'email@email.com', username : 'user_2016'};

app.get(routes.symbols, (req, res) => {
    res.send({ symbols : symbols });
    //res.status(500).send({});
});

app.get(routes.userInfo, (req, res) => {
	res.send({ user : user });
});

app.get(routes.companyInfo, (req, res) => {
	console.log(req.query);
	let symbol = req.query.symbol;
	if (symbol)
	{
		const company = { name : `Microsoft`, about : `About the company of ${symbol}` }; // Attaquer la base de données
		res.send({ company : company });
	}
});

app.get(routes.latestNews, (req, res) => {
	res.send({ latestNews : ServerHistoryKeeper.fetchNews() });
});

app.get(routes.quoteDataPerDay, (req, res) => {
	let symbol = req.query.symbol;
	console.log(routes.quoteDataPerDay+' : Symbol : '+symbol)
	if (symbol)
		res.send({ quoteData : ServerHistoryKeeper.fetchQuotes(symbol) });
		//res.send({ quoteData : data });
});

app.get(routes.companiesStates, (req, res) => {

	res.send({ states : states });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

const realTimeMiddleware = new RealTimeMiddleware(app, PORT+1);

//Kafka consumer manipulation
const onMsgKafka = function (message) {
		/*console.log("message Kafka :");
		console.log(message);*/
		//const msg = message; // Just for test
    	const msg = JSON.parse(message.value);
		console.log("message Kafka [parsed] :");
		console.log(msg);
    	const formattedMessage = formatKafkaMsg(msg);
    	//const formattedMessage = msg.data;
    	ServerHistoryKeeper.newDataFromConsumer(msg.symbol, formattedMessage);
    	if (formattedMessage.news.length > 0)
    		realTimeMiddleware.sendNews(formattedMessage.news); // Broadcast
    	
    	if (formattedMessage.quote.open){
    		console.log("Sending quote : ");
    		console.log(formattedMessage.quote)
    		realTimeMiddleware.sendQuote(msg.symbol, formattedMessage); // Multicast
    		realTimeMiddleware.sendStates(msg.symbol, ServerHistoryKeeper.fetchStates()); // Broadcast
    	}
};

const onErrorKafka = function (err) {
   	console.log('KafkaConsumer error :');
   	console.log(err);
};

function formatKafkaMsg(msg)
{
	let result = msg.data;
	let open = parseFloat( parseFloat(result.quote.open).toFixed(2));
	let high = parseFloat( parseFloat(result.quote.high).toFixed(2));
	let low = parseFloat( parseFloat(result.quote.low).toFixed(2));
	let close = parseFloat( parseFloat(result.quote.close).toFixed(2));
	let volume = parseFloat( parseFloat(result.quote.volume).toFixed(2));
	result.quote = { open : open, high : high, low : low, close : close };
	return result;
}

const kafkaConsumer = new KafkaConsumer(TOPIC_NAME, ZOOKEEPER_HOST, PARTITION, onMsgKafka, onErrorKafka);


//Static test for socket.io
/*let i = 0;
symbols.forEach((element) => {
	setInterval(function(){
		i++;
		console.log("Sending for "+element.symbol);
		realTimeMiddleware.sendQuote(element.symbol, i);
	}, 1000);
});*/