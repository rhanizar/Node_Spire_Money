import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'whatwg-fetch';

const REALITY_COLOR = "#4baffe";
const PREDICTION_COLOR = "#ff0000";

/*
	Data structure :
		data = {
			symbol : 'AAPL',
			week : [ { reality : 610, prediction : 510, time : 'date' } ],
			month : [ { reality : 610, prediction : 510, time : 'date' } ],
			trimestre : [ { reality : 610, prediction : 510, time : 'date' } ],
			year : [ { reality : 610, prediction : 510, time : 'date' } ],
			max : [ { reality : 610, prediction : 510, time : 'date' } ],
		}
*/

export default class PredictionsHistory extends React.Component {
	constructor(props)
	{
		super(props);
		//this.strs = { week : '1 week', month : '1 month', trimestre : '3 months', year : '1 year' };
		this.state = { activePeriod : 'week' };
		this.history = null;
		this.routes = {
			history : '/api/predictions/history'
		}
		this.fetchData = this.fetchData.bind(this);
		this.onClickHandler = this.onClickHandler.bind(this);
	}

	componentDidMount()
	{
		this.fetchData();
	}

	fetchData()
	{
		let params = new URLSearchParams();
		params.append('symbol', this.props.symbol);

		fetch(`${this.routes.history}?${params.toString()}`, { method: 'GET' }).then(response => {
          if (response.ok) {
            response.json().then(data => {
             	this.history = data.history;
             	this.forceUpdate();
            });
          }
        }).catch(err => {
            console.log("Error in sending data to server : " + err.message);
        });
	}

	onClickHandler(key)
	{
		if (key != this.state.activePeriod)
			this.setState({activePeriod : key});
	}

	render(){
		if (this.history == null)
			return null;

		return (
			<div className="panel panel-success">
				<div className="panel-heading">
					History
					<span className="pull-right clickable panel-toggle panel-button-tab-left"><em className="fa fa-toggle-up"></em></span>
				</div>
				<div className="panel-body">
					<div className="col-md-12">
						<div className="panel panel-default">
							<div className="panel-body tabs">
								<ul className="nav nav-pills">
									<li className="active">
										<a href="#week" onClick={() => this.onClickHandler('week')} data-toggle="tab">5 days</a>
									</li>
									<li>
										<a href="#month" onClick={() => this.onClickHandler('month')} data-toggle="tab">1 month</a>
									</li>
									<li>
										<a href="#trimestre" onClick={() => this.onClickHandler('trimestre')} data-toggle="tab">3 months</a>
									</li>
									<li>
										<a href="#year" onClick={() => this.onClickHandler('year')} data-toggle="tab">1 year</a>
									</li>
									<li>
										<a href="#max" onClick={() => this.onClickHandler('max')} data-toggle="tab">max</a>
									</li>
								</ul>
								<div className="tab-content">
									<div className='tab-pane fade in active' id={this.state.activePeriod}>
										{/*Hello {this.state.activePeriod}*/}
										<div className="canvas-wrapper">
											<div className="main-chart dataSeriesChart2">
												<ResponsiveContainer  aspect={1.2}>
													<LineChart data={this.history[this.state.activePeriod]}>
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
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>				
					{/*<div className="canvas-wrapper">
						<div className="main-chart dataSeriesChart">
							<ResponsiveContainer height='100%' width='100%'>
								<LineChart data={this.history} >
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

PredictionsHistory.propTypes = {
	symbol : PropTypes.string.isRequired
}