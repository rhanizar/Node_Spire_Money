import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'whatwg-fetch';

const PREDICTION_COLOR = "#ff0000";

/*
	Data structure :
		data = {
			symbol : 'AAPL',
			week : [ { prediction : 510, time : 'date' } ],
			month : [ { prediction : 510, time : 'date' } ],
			trimestre : [ { prediction : 510, time : 'date' } ],
			year : [ { prediction : 510, time : 'date' } ],
			max : [ { prediction : 510, time : 'date' } ],
		}
*/


export default class Predictions extends React.Component {
	constructor(props)
	{
		super(props);

		this.state = { activePeriod : 'week' };
		this.predictions = null;

		this.fetchData = this.fetchData.bind(this);
		this.routes = {
			latestPredictions : '/api/predictions/'
		}

		this.onClickHandler = this.onClickHandler.bind(this);
		console.log("constructor");
	}

	componentDidMount()
	{
		this.fetchData();
	}

	fetchData()
	{
		let params = new URLSearchParams();
		params.append('symbol', this.props.symbol);

		fetch(`${this.routes.latestPredictions}?${params.toString()}`, { method: 'GET' }).then(response => {
			console.log("response");
			console.log(response);
          if (response.ok) {
            response.json().then(data => {
             	this.predictions  = data.predictions;
             	this.forceUpdate();
            });
          }
        }).catch(err => {
            console.log("Error in sending data to server: " + err.message);
        });
	}

	onClickHandler(key)
	{
		if (key != this.state.activePeriod)
			this.setState({activePeriod : key});
	}

	render(){
		if (this.predictions == null)
			return null;

		return (
			<div className="panel panel-danger">
				<div className="panel-heading">
					Predictions
					<span className="pull-right clickable panel-toggle panel-button-tab-left"><em className="fa fa-toggle-up"></em></span>
				</div>
				<div className="panel-body">
					<div className="col-md-12">
						<div className="panel panel-default">
							<div className="panel-body tabs">
								<ul className="nav nav-pills">
									<li className="active">
										<a href="#week2" onClick={() => this.onClickHandler('week')} data-toggle="tab">5 days</a>
									</li>
									<li>
										<a href="#month2" onClick={() => this.onClickHandler('month')} data-toggle="tab">1 month</a>
									</li>
									<li>
										<a href="#trimestre2" onClick={() => this.onClickHandler('trimestre')} data-toggle="tab">3 months</a>
									</li>
									<li>
										<a href="#year2" onClick={() => this.onClickHandler('year')} data-toggle="tab">1 year</a>
									</li>
									<li>
										<a href="#max2" onClick={() => this.onClickHandler('max')} data-toggle="tab">max</a>
									</li>
								</ul>
								<div className="tab-content">
									<div className='tab-pane fade in active' id={`${this.state.activePeriod}2`}>
										{/*Hello {this.state.activePeriod}*/}
										<div className="canvas-wrapper">
											<div className="main-chart dataSeriesChart2">
												<ResponsiveContainer  aspect={1.2}>
													<LineChart data={this.predictions[this.state.activePeriod]}>
													       <XAxis dataKey="time"/>
													       <YAxis/>
													       <CartesianGrid strokeDasharray="3 3"/>
													       <Tooltip />
													       <Legend />
													       <Line type="monotone" dataKey="prediction" stroke={PREDICTION_COLOR} activeDot={{r: 8}} isAnimationActive={true} animationEasing={'linear'} animationDuration={1000}/>
												    </LineChart>
												</ResponsiveContainer>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>				
					{/*<div className="canvas-wrapper">
						<div className="main-chart dataSeriesChart">
							<ResponsiveContainer height='100%' width='100%'>
								<LineChart data={this.predictions} >
								       <XAxis dataKey="time"/>
								       <YAxis/>
								       <CartesianGrid strokeDasharray="3 3"/>
								       <Tooltip />
								       <Legend />
								       <Line type="monotone" dataKey="reality" stroke={REALITY_COLOR} activeDot={{r: 8}} isAnimationActive={true} animationEasing={'linear'} animationDuration={1000}/>
								       <Line type="monotone" dataKey="prediction" stroke={PREDICTION_COLOR} activeDot={{r: 8}} isAnimationActive={true} animationEasing={'linear'} animationDuration={1000}/>
							    </LineChart>
							</ResponsiveContainer>
						</div>
					</div>*/}
				</div>
			</div>
		);
	}
}

Predictions.propTypes = {
	symbol : PropTypes.string.isRequired
}