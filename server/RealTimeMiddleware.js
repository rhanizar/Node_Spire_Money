/*const http = require('http');
const socketIo = require('socket.io');
*/
/*var http = require('http').Server(app);
var io = require('socket.io')(http);*/

const NEW_QUOTE_EVENT = 'NEW_QUOTE_EVENT';
const NEW_NEWS_EVENT = 'NEW_NEWS_EVENT';
const JOIN_MSG = 'JOIN_MSG';
const LEAVE_MSG = 'LEAVE_MSG';

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
		});

		console.log(`Socket.io listening on port ${this.port}`);
	}

	sendNews(news){
		this.io.emit(NEW_NEWS_EVENT, news);
	}

	sendQuote(symbol, quote)
	{
		//this.io.sockets.in(room).emit(NEW_QUOTE_EVENT, `${quote} - Hello ${symbol}`);
		this.io.to(symbol).emit(NEW_QUOTE_EVENT, `${quote} - Hello ${symbol}`);
	}
}

module.exports = RealTimeMiddleware;