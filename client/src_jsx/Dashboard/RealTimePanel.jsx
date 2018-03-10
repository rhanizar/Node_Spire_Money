import React from 'react';
import ReactDOM from 'react-dom';
import LoadScript  from 'load-script';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import socketClient from 'socket.io-client';

const OPEN_COLOR = "#4baffe";
const HIGH_COLOR = "#3d9400";
const LOW_COLOR = "#ff0000";
const CLOSE_COLOR = "#ffc20f";
const NEW_QUOTE_EVENT = 'NEW_QUOTE_EVENT';
const NEW_NEWS_EVENT = 'NEW_NEWS_EVENT';
const JOIN_MSG = 'JOIN_MSG';
const LEAVE_MSG = 'LEAVE_MSG';

/*{
	quote : {
		open : 100,
		high : 123,
		low : 90,
		close : 110,
	},
	news : news,
	time : now
},

{ open, high, low, clos, time=>formatted, news },*/

export default class RealTimePanel extends React.Component {
	constructor(props)
	{
		super(props);
		this.dataFormatted = this.props.data.map((element) => {
			let obj = element.quote;
			obj.news = element.news;
			obj.time = this.formatTime(element.time);
			return obj;
		});

		const symbol = this.props.symbol;
		this.socket = socketClient.connect(`${window.location.host}`,
			 { reconnect: true });
		
		this.socket.on('connect', () => {
			this.socket.emit(JOIN_MSG, symbol);
		});

		this.socket.on(NEW_QUOTE_EVENT, function(msg){
		    console.log(`New quote for ${symbol} :`);
		    console.log(msg);
		});

		this.socket.on(NEW_NEWS_EVENT, function(msg){
		    console.log(`News arrived : `);
		    console.log(msg);
		});
	}

	formatTime(time)
	{
		let date = new Date(time);
		let content = `${date.getUTCHours()}:${date.getUTCMinutes()}`;
		return content;
	}

	handleClick(e) {
	  let news = e.activePayload[0].payload.news;
	  if (news.length > 0)
	  	window.open(news[0].url,'_blank');
	}

	componentDidUpdate(prevProps, prevState)
	{
		if ( prevProps && (prevProps.symbol != this.props.symbol) )
		{
			this.socket.emit(LEAVE_MSG, prevProps.symbol);
			this.socket.emit(JOIN_MSG, this.props.symbol);
		}
	}

	render(){
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Stock time series data : <label>{this.props.symbol}</label>
					<span className="pull-right clickable panel-toggle panel-button-tab-left"><em className="fa fa-toggle-up"></em></span>
				</div>
				<div className="panel-body">
					<div className="canvas-wrapper">
						<div className="main-chart dataSeriesChart">
							<ResponsiveContainer height='100%' width='100%'>
								<LineChart onClick={this.handleClick} data={this.dataFormatted}>
								       <XAxis dataKey="time"/>
								       <YAxis/>
								       <CartesianGrid strokeDasharray="3 3"/>
								       <Tooltip />
								       <Legend />
								       <Line type="monotone" dataKey="close" stroke={CLOSE_COLOR} activeDot={{r: 8}}/>
								       <Line type="monotone" dataKey="high" stroke={HIGH_COLOR} activeDot={{r: 8}}/>
								       <Line type="monotone" dataKey="low" stroke={LOW_COLOR} activeDot={{r: 8}}/>
								       <Line type="monotone" dataKey="open" stroke={OPEN_COLOR} activeDot={{r: 8}}/>

							    </LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

RealTimePanel.propTypes = {
	symbol : PropTypes.string.isRequired,
	data : PropTypes.array.isRequired,
};