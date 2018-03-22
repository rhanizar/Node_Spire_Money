// Constants	
	const dbConfig = require('./config/database.config.js');
	const express = require('express');
	const mongoose = require('mongoose');
	const sourceMapSupport = require('source-map-support');
	const QuotePerMinuteRoutes = require('./routes/QuotePerMinuteRoute');
	const QuotePerMinute = require('./models/QuotePerMinute');
	const CompanyRoutes = require('./routes/CompanyRoute');
	const NewsRoutes = require('./routes/NewsRoute');
	const PredictionsRoutes = require('./routes/PredictionsRoute');
	const News = require('./models/News');
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


// Database connection
	//Conect to MongoDB
	const options = { autoReconnect : true, reconnectTries: Number.MAX_VALUE, reconnectInterval: 500};
	const connectWithRetry = () => {
		mongoose.connect(dbConfig.url, options).then(
			() => {
				console.log("Successfully connected to the database");
		    	mainServer();
			},
			(err) => {
				console.log('Could not connect to the database. Reconnecting...');
				mongoose.disconnect();
				setTimeout(connectWithRetry, 500);
			}
		);
	};

	connectWithRetry();

// Express server manipulation
	function mainServer()
	{
		//Express server intialization
			//Initialize the real time middleware
			const realTimeMiddleware = new RealTimeMiddleware(app, PORT+1);
			//Install sourcemap for mapping between js & jsx
			sourceMapSupport.install();
			//Initialize the history
			ServerHistoryKeeper.Init();
			//Setting up routes
			app.use('/quote-per-minute', QuotePerMinuteRoutes);
			app.use('/company', CompanyRoutes);
			app.use('/news', NewsRoutes);
			app.use('/user', UserRoutes);
			app.use('/predictions', PredictionsRoutes);

			// Route not found error
			app.use((req, res, next) => {
				const error = new Error('Not found');
				error.status = 404;
				next(error);
			});

			// Other routes errors
			app.use((error, req, res) => {
				res.status(error.status || 500);
				res.json({
					error : {
						message : error.message
					}
				});
			});

		// Kafka consumer manipulation
			const onMsgKafka = function (message) {
					/*console.log("message Kafka :");
					console.log(message);*/
					//const msg = message; // Just for test
			    	const msg = JSON.parse(message.value);
					//console.log("message Kafka [parsed] :");
					//console.log(msg);
			    	const formattedMessage = formatKafkaMsg(msg);
			    	//console.log("formattedMessage : ");
			    	//console.log(formattedMessage);
			    	//const formattedMessage = msg.data;
			    	ServerHistoryKeeper.newDataFromConsumer(msg.symbol, formattedMessage);
			    	if (formattedMessage.news.length > 0){
			    		realTimeMiddleware.sendNews(formattedMessage.news); // Broadcast
			    		saveNewsToDB(msg.symbol, formattedMessage);
			    	}

			    	if (formattedMessage.quote.open){
			    		//console.log("Sending quote : ");
			    		//console.log(formattedMessage.quote)
			    		realTimeMiddleware.sendQuote(msg.symbol, formattedMessage); // Multicast
			    		realTimeMiddleware.sendStates(msg.symbol, ServerHistoryKeeper.fetchStates()); // Broadcast
			    		saveQuoteToDB(msg.symbol, formattedMessage);
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
				result.quote = { open : open, high : high, low : low, close : close, volume : volume,  };
				return result;
			}

			const onErrorKafka = function (err) {
			   	console.log('KafkaConsumer error :');
			   	console.log(err);
			};

			const kafkaConsumer = new KafkaConsumer(TOPIC_NAME, ZOOKEEPER_HOST, PARTITION, onMsgKafka, onErrorKafka);

		// Database middleware functions
			function saveQuoteToDB(symbol, formattedMessage)
			{
				const Quote = new QuotePerMinute({
			        "close"  : formattedMessage.quote.close, //THE VALUES YOU WANT TO INSERT
			        "high"   : formattedMessage.quote.high,
			        "low"    : formattedMessage.quote.low,
			        "open"   : formattedMessage.quote.open,
			        "volume" : formattedMessage.quote.volume,
			        "minute" : formattedMessage.time,
			        "symbol" : symbol,
			    });

			    QuotePerMinute.saveQuotePerMinute(Quote);
			}

			function saveNewsToDB(symbol, formattedMessage)
			{
				const news = formattedMessage.news;
				news.forEach((newsItem) => {
					const item = {
							time : formattedMessage.time, 
							symbol : symbol, 
							titre : newsItem.titre, 
							link : newsItem.link 
					};

					News.saveNews(item);
				});
			}

		// Listening for requests
			app.listen(PORT, () => {
			    console.log(`App listening on port ${PORT}`);
			});
	}