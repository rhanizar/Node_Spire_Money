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
const MAX_QUOTES_ITEMS = 30;

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

		let me = this;
		this.state = this.init(this.props);

		this.newQuoteEventHandler = this.newQuoteEventHandler.bind(this);
		
		this.props.socket.on(NEW_QUOTE_EVENT, function(msg){
		    me.newQuoteEventHandler(msg);
		});
	}

	formatQuote(element)
	{
		let obj = element.quote;
		obj.news = element.news;
		obj.time = this.formatTime(element.time);
		return obj;
	}

	componentWillUpdate(nextProps, nextState)
	{
		if ( (this.props == null) || (nextProps != null && nextProps.data != this.props.data) ){
			
			this.setState(this.init(nextProps));
		}
	}

	init(props)
	{
		let dataFormatted = props.data.map((element) => {
			return this.formatQuote(element);
		});
		return ({dataFormatted : dataFormatted });
	}

	newQuoteEventHandler(msg)
	{
		let dataFormatted = this.state.dataFormatted;

		if (dataFormatted.length == MAX_QUOTES_ITEMS)
				dataFormatted = dataFormatted.slice(1);

		let formatted = this.formatQuote(msg);
		dataFormatted.push(formatted);
		let arr = [];
		this.setState({ dataFormatted : arr.concat(dataFormatted) });
	}

	formatTime(time)
	{
		let date = new Date(time);
		let content = `${date.getUTCHours()}:${("0"+date.getUTCMinutes()).slice(-2)}`;
		return content;
	}

	handleClick(e) {
	  let news = e.activePayload[0].payload.news;
	  if (news.length > 0)
	  	window.open(news[0].link,'_blank');
	}
/*
	componentDidUpdate(prevProps, prevState)
	{
		if ( prevProps && (prevProps.symbol != this.props.symbol) )
		{
			this.socket.emit(LEAVE_MSG, prevProps.symbol);
			this.socket.emit(JOIN_MSG, this.props.symbol);
		}
	}*/

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
								<LineChart onClick={this.handleClick} data={this.state.dataFormatted} >
								       <XAxis dataKey="time"/>
								       <YAxis/>
								       <CartesianGrid strokeDasharray="3 3"/>
								       <Tooltip />
								       <Legend />
								       <Line type="monotone" dataKey="close" stroke={CLOSE_COLOR} activeDot={{r: 8}} isAnimationActive={true} animationEasing={'linear'} animationDuration={1000}/>
								       <Line type="monotone" dataKey="high" stroke={HIGH_COLOR} activeDot={{r: 8}} isAnimationActive={true} animationEasing={'linear'} animationDuration={1000}/>
								       <Line type="monotone" dataKey="low" stroke={LOW_COLOR} activeDot={{r: 8}} isAnimationActive={true} animationEasing={'linear'} animationDuration={1000}/>
								       <Line type="monotone" dataKey="open" stroke={OPEN_COLOR} activeDot={{r: 8}} isAnimationActive={true} animationEasing={'linear'} animationDuration={1000}/>

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
	socket : PropTypes.object.isRequired,
};