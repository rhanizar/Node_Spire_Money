import React from 'react';
import ReactDOM from 'react-dom';
import CompaniesPanel from './CompaniesPanel';
import NewsPanel from './NewsPanel';
import RealTimePanel from './RealTimePanel';
import AboutCompany from './AboutCompany';
import TabContentHeader from '../TabContentHeader';
import PropTypes from 'prop-types';
import LoadScript  from 'load-script';
import 'whatwg-fetch';


const MAX_DATA_AMOUNT = 30;

export default class Dashboard extends React.Component{
	constructor(props){
		super(props);

		this.states = null;
		this.latestNews = null;
		this.open  = [];
		this.high  = [];
		this.low   = [];
		this.close = [];

		this.routes =  {
	      companyInfo : '/api/company_info',
	      quoteDataPerDay : '/api/quote_data_last_day',
	      companiesStates : '/api/companies_states',
	      latestNews : '/api/latest_news'
	    };

		this.fetchData();
	}

	dataIsComplete()
	{
		return ( this.company != null && this.quoteData != null &&
				 this.states != null && this.latestNews != null );
	}

	fetchData()
	{
		this.fetchCompanyInfo();
		this.fetchQuoteDataLastDay();
		this.fetchCompaniesStates();
		this.fetchLatestNews();
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

	fetchQuoteDataLastDay(){
		fetch(this.routes.quoteDataPerDay, { method: 'GET' }).then(response => {
          if (response.ok) {
            response.json().then(data => {
             	this.quoteData = data.quoteData;
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

	fetchCompanyInfo()
	{
		let params = new URLSearchParams();
		params.append('symbol', this.props.symbol);

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

	pushData(info) {
		if ((typeof(info.quote) == 'undefined') || (info.quote == null))
			return;

		if (this.open.length === MAX_DATA_AMOUNT){
			this.open = this.open.slice(1);
			this.high = this.high.slice(1);
			this.low = this.low.slice(1);
			this.close = this.close.slice(1);
		}

		this.open.push({
			x: info.time,
			y: info.quote.open,
			news : info.news,
			color: OPEN_COLOR
		});

		this.high.push({
			x: info.time,
			y: info.quote.high,
			news : info.news,
			color: HIGH_COLOR
		});

		this.low.push({
			x: info.time,
			y: info.quote.low,
			news : info.news,
			color: LOW_COLOR
		});

		this.close.push({
			x: info.time,
			y: info.quote.close,
			news : info.news,
			color: CLOSE_COLOR
		});
	}

	componentDidMount()
	{
		LoadScript('js/news.js');
	}

	componentDidUpdate(prevProps, prevState){
		if (prevProps != null && prevProps.symbol != this.props.symbol)
			this.fetchData();
	}
	

	render(){

		if (this.dataIsComplete() == false)
			return null;

		return (
			<div>
				<TabContentHeader title="Dashboard" />

				<CompaniesPanel companies={this.states}/>

				<div className="row">
					<div className="col-md-12">
						<NewsPanel news={this.latestNews} className='panel-danger' title='Latest'/>		 
						{/*<NewsPanel news={symbolNews} className='panel-info' title={this.company.name}/>	*/}
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<RealTimePanel symbol={this.props.symbol} data={this.quoteData} />
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<AboutCompany company={this.company.name} about={this.company.about} />
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	symbol : PropTypes.string.isRequired
};