//--- static data -----
	const symbols = [
	  {symbol : "AAPL", company : "Apple"},
	  {symbol : "AMX",  company : "Amx com"},
	  {symbol : "AMX 2",  company : "Amx com2"},
	  {symbol : "AMX 3",  company : "Amx com3"},
	  {symbol : "AMX 4",  company : "Amx com3"},
	  {symbol : "MSFT", company : "Microsoft"},
	  {symbol : "CC",   company : "CC Company"},
	  {symbol : "CC2",  company : "CC2 Company"},
	  {symbol : "CSCO", company : "Cisco"},
	  {symbol : "IBM",  company : "IBM"},
	  {symbol : "IIS",  company : "IIS Company"},
	  {symbol : "IXIC",  company : "Nasdaq"}
	];

	const news =  {
		url : 'https://www.forbes.com/sites/joannmuller/2018/02/16/tesla-thinks-it-will-school-toyota-on-lean-manufacturing-fixing-model-3-launch-would-be-a-start',
		title : 'Musk Thinks Tesla Will School Toyota On Lean Manufacturing; Fixing Model 3 Launch Would Be A Start'
	};

	const states = [
		{ symbol : 'MSFT', volume : 2023210, price : 171.6520, difference : -1.59 },
		{ symbol : 'AAPL', volume : 2023210, price : 171.6520, difference : 0.59 },
		{ symbol : 'MSFT', volume : 20232665656, price : 171.6520, difference : -1.59 },
		{ symbol : 'MSFT', volume : 2023210, price : 171.6520, difference : 2.59 },
	];
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
			time : now
		},
		{
			quote : {
				open : 111,
				high : 134,
				low : 101,
				close : 120,
			},
			news : news,
			time : now2
		},
		{
			quote : {
				open : 40,
				high : 60,
				low : 33,
				close : 50,
			},
			news : news,
			time : now3
		}
	];

	const latestNews = [
		{ title : 'News 1', url : '#'},
		{ title : 'News 2', url : '#'},
		{ title : 'News 3', url : '#'},
		{ title : 'News 4', url : '#'},
		{ title : 'News 5', url : '#'},
	];
//---------------------

const 9 = require('./RealTimeMiddleware');
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

let app = express();
let PORT = process.env.PORT || 3000;
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
	res.send({ latestNews : latestNews });
});

app.get(routes.quoteDataPerDay, (req, res) => {
	res.send({ quoteData : data });
});

app.get(routes.companiesStates, (req, res) => {

	res.send({ states : states });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

const realTimeMiddleware = new RealTimeMiddleware(app, PORT+1);

let i = 0;

symbols.forEach((element) => {
	setInterval(function(){
		i++;
		console.log("Sending for "+element.symbol);
		realTimeMiddleware.sendQuote(element.symbol, i);
	}, 1000);
});