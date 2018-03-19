import React from 'react';
import ReactDOM from 'react-dom';
import CompaniesPanel from './CompaniesPanel';
import NewsPanel from './NewsPanel';
import RealTimePanel from './RealTimePanel';
import AboutCompany from './AboutCompany';
import PredictionsHistory from './PredictionsHistory';
import Recommendations from './Recommendations';
import Predictions from './Predictions';
import TabContentHeader from '../TabContentHeader';
import PropTypes from 'prop-types';
import LoadScript  from 'load-script';
import socketClient from 'socket.io-client';
import 'whatwg-fetch';


const MAX_DATA_AMOUNT = 30;
const JOIN_MSG = 'JOIN_MSG';
const LEAVE_MSG = 'LEAVE_MSG';


export default class Dashboard extends React.Component{
	constructor(props){
		super(props);

		this.init();

		this.routes =  {
	      companyInfo : '/api/company/info',
	      quoteDataPerDay : '/api/quote-per-minute/latest',
	      companiesStates : '/api/company/states',
	      latestNews : '/api/news/latest'
	    };

	    this.socket = socketClient.connect(`${window.location.host}`,
			 { reconnect: true });

	    this.socket.on('connect', () => {
			this.socket.emit(JOIN_MSG, this.props.symbol);
		});

	    this.fetchLatestNews();
		this.fetchCompaniesStates();
		this.fetchData(this.props);
	}

	init()
	{
		this.states = null;
		this.company = null;
		this.quoteData = null;
		this.latestNews = null;
	}

	dataIsComplete()
	{
		return ( this.company != null && this.quoteData != null &&
				 this.states != null && this.latestNews != null );
	}

	fetchData(props)
	{
		this.fetchCompanyInfo(props);
		this.fetchQuoteDataLastDay(props);
	}

	fetchLatestNews()
	{
		fetch(this.routes.latestNews, { method: 'GET' }).then(response => {
          if (response.ok) {
            response.json().then(data => {
             	this.latestNews  = data.latestNews;
             	this.forceUpdate();
            });
          }
        }).catch(err => {
            console.log("Error in sending data to server: " + err.message);
        });
	}

	fetchQuoteDataLastDay(props){
		let params = new URLSearchParams();
		params.append('symbol', props.symbol);

		fetch(`${this.routes.quoteDataPerDay}?${params.toString()}`, { method: 'GET' }).then(response => {
          if (response.ok) {
            response.json().then(data => {
             	this.quoteData = data.quoteData;
             	/*console.log("------------------------------");
             	console.log(data);
             	console.log(data.quoteData[0]);
             	console.log("------------------------------");*/
             	this.forceUpdate();
            });
          }
        }).catch(err => {
            console.log("Error in sending data to server: " + err.message);
        });
	}

	fetchCompaniesStates()
	{
		fetch(this.routes.companiesStates, { method: 'GET' }).then(response => {
          if (response.ok) {
            response.json().then(data => {
             	this.states  = data.states;
             	this.forceUpdate();
            });
          }
        }).catch(err => {
            console.log("Error in sending data to server: " + err.message);
        });
	}

	fetchCompanyInfo(props)
	{
		let params = new URLSearchParams();
		params.append('symbol', props.symbol);

		fetch(`${this.routes.companyInfo}?${params.toString()}`, { method: 'GET' }).then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.company = data.company;
              this.forceUpdate();
            });
          }else{
          	console.log("Error in sending data to server: ");
          	console.log(response);
          }
        }).catch(err => {
            console.log("Error in sending data to server: " + err.message);
        });
	}

	componentDidMount()
	{
		LoadScript('js/news.js');
	}

	componentWillUpdate(nextProps, nextState)
	{
		if (nextProps != null && nextProps.symbol != this.props.symbol)
		{
			//this.init();
			this.fetchData(nextProps);
			this.socket.emit(LEAVE_MSG, this.props.symbol);
			this.socket.emit(JOIN_MSG, nextProps.symbol);
		}
	}

	render(){
		if (this.dataIsComplete() == false)
			return null;
		return (
			<div>
				<TabContentHeader title="Dashboard" />

				<CompaniesPanel companies={this.states} socket={this.socket}/>

				<div className="row">
					<div className="col-md-12">
						<NewsPanel news={this.latestNews} className='panel-danger' title='Latest'
							socket={this.socket}/>		 
						{/*<NewsPanel news={symbolNews} className='panel-info' title={this.company.name}/>	*/}
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<Recommendations />
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<RealTimePanel symbol={this.props.symbol} data={this.quoteData} socket={this.socket}/>
					</div>
				</div>

				<div className="row">
					<div className="col-md-6">
						<Predictions />
					</div>

					<div className="col-md-6">
						<PredictionsHistory />
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<AboutCompany company={this.company.name} about={this.company.about} symbol={this.props.symbol} />
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	symbol : PropTypes.string.isRequired
};