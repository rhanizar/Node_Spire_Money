/*
	- Data structure :
		- QuoteHistory = { 
			AAPL : [{
				quote : { open : 1, high : 2, low : 3, close : 4 },
				news : [{ url : 'url', title : 'title', "description": ""desc}]
				time : 'time per minute'
			}]
		}
		- NewsHistory = [{
			news : { url : 'url', title : 'title' },
			time : 'time per minute'
		}]

		- StatesHistory = { 
			MSFT : { volume : 2023210, price : 171.6520, difference : -1.59 }
		};

		- Kafka consumer output = {
			symbol : 'AAPL'
			quote : { open : 1, high : 2, low : 3, close : 4 },
			news : { url : 'url', title : 'title' },
			time : 'time per minute'
		}

		- Si (la donnée n'existe pas dans l'historique) alors attaquer le DAO pour le trouver
*/

const MAX_QUOTES_HISTORY_PER_SYMBOL = 5;
const MAX_NEWS_HISTORY = 5;
let QuoteHistory = null;
let StatesHistory = null;
let NewsHistory = [];

class ServerHistoryKeeper 
{
	static Init(symbols)
	{
		if (QuoteHistory == null){
			QuoteHistory = {};
			symbols.forEach((element) => {
				let symbol = element.symbol;
				QuoteHistory[symbol] = [];
			});
		}

		if(StatesHistory == null){
			StatesHistory = {};
			symbols.forEach((element) => {
				let symbol = element.symbol;
				StatesHistory[symbol] = {volume : 0, price : 0, difference : 0};
			});
		}

	}

	//Input form : QuoteHistory form
	static newDataFromConsumer(symbol, data)
	{
		//Adding the quote
		if (data.quote.open)
		{
			let quote = data.quote;
			if (QuoteHistory[symbol].length == MAX_QUOTES_HISTORY_PER_SYMBOL)
				QuoteHistory[symbol] = QuoteHistory[symbol].slice(1);
			let obj = {
				quote : quote,
				news : data.news,
				time : data.time
			};
			
			QuoteHistory[symbol].push(obj);

			/*console.log(`QuoteHistory[${symbol}] = `);
			console.log(QuoteHistory[symbol]);*/
			//Calculating the state
			const last = StatesHistory[symbol];
			const difference = ((quote.close - last.price) / last.price) * 100;

			StatesHistory[symbol] = {volume : quote.volume, price : quote.close, difference : difference};
		}
		
		//Adding the news
		if (data.news.length > 0){
			let toRemove = data.news.length + NewsHistory.length - MAX_NEWS_HISTORY;
			if (toRemove > 0)
				NewsHistory = NewsHistory.slice(toRemove);

			NewsHistory = NewsHistory.concat(data.news);
		}

	}


	static fetchNews(){
		return NewsHistory;
	}

	static fetchStates(){
		return StatesHistory;
	}

	static fetchQuotes(symbol){
		return QuoteHistory[symbol];
	}
}

module.exports = ServerHistoryKeeper;