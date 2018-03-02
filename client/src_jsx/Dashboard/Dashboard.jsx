import React from 'react';
import ReactDOM from 'react-dom';
import CompaniesPanel from './CompaniesPanel';
import NewsPanel from './NewsPanel';
import RealTimePanel from './RealTimePanel';
import AboutCompany from './AboutCompany';
import TabContentHeader from '../TabContentHeader';
import PropTypes from 'prop-types';

export default class Dashboard extends React.Component{
	constructor(props){
		super(props);
		this.company = this.companyFromSymbol(props.symbol);
	}
	companyFromSymbol(symbol){
		const company = 'Microsoft'; // Attaquer la base de données
		return company;
	}

	render(){
		const aboutCompany = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.';
		const states = [
			{ symbol : 'MSFT', volume : 2023210, price : 171.6520, difference : -1.59 },
			{ symbol : 'AAPL', volume : 2023210, price : 171.6520, difference : 0.59 },
			{ symbol : 'MSFT', volume : 20232665656, price : 171.6520, difference : -1.59 },
			{ symbol : 'MSFT', volume : 2023210, price : 171.6520, difference : 2.59 },
		];

		const latestNews = [
			{ title : 'News 1', url : '#'},
			{ title : 'News 2', url : '#'},
			{ title : 'News 3', url : '#'},
			{ title : 'News 4', url : '#'},
			{ title : 'News 5', url : '#'},
		];

		const symbolNews = [
			{ title : 'Company News 1', url : '#'},
			{ title : 'Company News 2', url : '#'},
			{ title : 'Company News 3', url : '#'},
			{ title : 'Company News 4', url : '#'},
			{ title : 'Company News 5', url : '#'},
		];

		return (
			<div>
				<TabContentHeader title="Dashboard" />

				<CompaniesPanel companies={states}/>

				<div className="row">
					<div className="col-md-12">
						<NewsPanel news={latestNews} className='panel-danger' title='Latest'/>		 
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<RealTimePanel />
					</div>
				</div>

				<div className="row">
					<div className="col-md-6">
						<NewsPanel news={symbolNews} className='panel-info' title={this.company}/>	 
					</div>

					<div className="col-md-6">
						<AboutCompany company={this.company} about={aboutCompany} />
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	symbol : PropTypes.string.isRequired
};