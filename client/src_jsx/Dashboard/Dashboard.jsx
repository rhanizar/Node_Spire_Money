import React from 'react';
import ReactDOM from 'react-dom';
import CompaniesPanel from './CompaniesPanel';
import NewsPanel from './NewsPanel';
import RealTimePanel from './RealTimePanel';
import AboutCompany from './AboutCompany';
import TabContentHeader from '../TabContentHeader';

export default class Dashboard extends React.Component{
	render(){
		return (
			<div>
				<TabContentHeader title="Dashboard" />

				<CompaniesPanel />

				<div className="row">
					<div className="col-md-12">
						<NewsPanel />		 
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<RealTimePanel />
					</div>
				</div>

				<div className="row">
					<div className="col-md-6">
						<NewsPanel />		 
					</div>

					<div className="col-md-6">
						<AboutCompany />
					</div>
				</div>
			</div>
		);
	}
}