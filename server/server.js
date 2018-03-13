//Constants	
	const dbConfig = require('./config/database.config.js');
	const express = require('express');
	const mongoose = require('mongoose');
	const sourceMapSupport = require('source-map-support');
	const QuotePerMinuteRoutes = require('./routes/QuotePerMinuteRoute');
	const CompanyRoutes = require('./routes/CompanyRoute');
	const NewsRoutes = require('./routes/NewsRoute');
	const UserRoutes = require('./routes/UserRoute');
	const RealTimeMiddleware = require('./RealTimeMiddleware');
	const KafkaConsumer = require('./KafkaConsumer');
	const ServerHistoryKeeper = require('./ServerHistoryKeeper');
	//const bodyParser  = require('body-parser');

	const app = express();
	const PORT = process.env.PORT || 3000;

	const TOPIC_NAME = 'SpireMoney';
	const ZOOKEEPER_HOST = 'localhost:2181';
	const PARTITION = 0;

//Express server manipulation
	//Initialize the history
	ServerHistoryKeeper.Init();
	//Initialize the real time middleware
	const realTimeMiddleware = new RealTimeMiddleware(app, PORT+1);
	//Install sourcemap for mapping between js & jsx
	sourceMapSupport.install();
	//Conect to MongoDB
	mongoose.connect(dbConfig.url, {
		//useMongoClient: true
	});
	//Error handler for MongoDB connection
	mongoose.connection.on('error', function() {
	    console.log('Could not connect to the database. Exiting now...');
	    process.exit();
	});
	//Success connection handler
	mongoose.connection.once('open', function() {
	    console.log("Successfully connected to the database");
	});

	//Setting up routes
	app.use('/quote-per-minute', QuotePerMinuteRoutes);
	app.use('/company', CompanyRoutes);
	app.use('/news', NewsRoutes);
	app.use('/user', UserRoutes);

	// Route not found error
	app.use((req, res, next) => {
		const error = new Error('Not found');
		error.status = 404;
		next(error);
	});

	// Other routes errors
	app.use((error, req, res, next) => {
		res.status(error.status || 500);
		res.json({
			error : {
				message : error.message
			}
		});
	});

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

	const onErrorKafka = function (err) {
	   	console.log('KafkaConsumer error :');
	   	console.log(err);
	};

	const kafkaConsumer = new KafkaConsumer(TOPIC_NAME, ZOOKEEPER_HOST, PARTITION, onMsgKafka, onErrorKafka);

//Listening for requests
	app.listen(PORT, () => {
	    console.log(`App listening on port ${PORT}`);
	});

//Tests
/*let i = 0;
let tabs = [];
let data = ServerHistoryKeeper.fetchQuotes();

ServerHistoryKeeper.fetchSymbols().forEach((element) => {
	tabs[element.symbol] = 0;
	setInterval(function(){
		if (tabs[element.symbol] == data.length)
			tabs[element.symbol] = 0;
		realTimeMiddleware.sendQuote(element.symbol, data[tabs[element.symbol]]); // Multicast
		tabs[element.symbol]++;
	},3000);
});*/