/*const http = require('http');
const socketIo = require('socket.io');
*/
/*var http = require('http').Server(app);
var io = require('socket.io')(http);*/

const NEW_QUOTE_EVENT = 'NEW_QUOTE_EVENT';
const NEW_NEWS_EVENT = 'NEW_NEWS_EVENT';
const NEW_STATES_EVENT = 'NEW_STATES_EVENT';
const JOIN_MSG = 'JOIN_MSG';
const LEAVE_MSG = 'LEAVE_MSG';
const PREDICTION_RESPONSE = "PREDICTION_RESPONSE";
const PREDICTION_REQUEST = "PREDICTION_REQUEST";
const JOIN_PREDICTION_ROOM = "JOIN_PREDICTION_ROOM";
const PREDICTION_ROOM = "6425ce37b792b9ce0b98bbb1397793cac43ecb0108f9bc6b4f2360d0165d482e";

class RealTimeMiddleware
{
	constructor(app, port)
	{
		const http = require('http').Server(app);
		this.port = port;
		this.io = require('socket.io')(http);
		this.io.listen(this.port);
		this.io.on('connection', function(socket) {
		    socket.on(JOIN_MSG, function(symbol) {
		        socket.join(symbol);
		    });

		    socket.on(LEAVE_MSG, function(symbol) {
		        socket.leave(symbol);
		    });

		    //socket.emit(PREDICTION_REQUEST, { msg : "My message" });

			socket.on(JOIN_PREDICTION_ROOM, function(room) {
				if (room == PREDICTION_ROOM)
		        	socket.join(room);
		    });

		    socket.on(PREDICTION_RESPONSE, function(data) {
		    	console.log("data from SPARK :");
		    	console.log(data);
		    	console.log("-------------------");
		    });
		});

		console.log(`Socket.io listening on port ${this.port}`);
	}

	sendNews(news){
		this.io.emit(NEW_NEWS_EVENT, news); // broadcast
	}

	sendQuote(symbol, quote)
	{
		this.io.to(symbol).emit(NEW_QUOTE_EVENT, quote); // multicast
	}

	sendStates(symbol, states)
	{
		const obj = { symbol : symbol, state : states[symbol]};
		this.io.emit(NEW_STATES_EVENT, obj); // broadcast
	}

	sendPredictionRequest(input, callback)
	{
		//this.io.sockets.emit(PREDICTION_REQUEST, { msg : "My message" });
		setInterval (()=>{
			this.io.to(PREDICTION_ROOM).emit(PREDICTION_REQUEST, { msg : "My message" }); // multicast
			console.log('Message was sent to '+ PREDICTION_ROOM +' !!');	
		}, 5000);
		
	}
}

module.exports = RealTimeMiddleware;