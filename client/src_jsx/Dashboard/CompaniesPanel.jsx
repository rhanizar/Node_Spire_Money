import React from 'react';
import ReactDOM from 'react-dom';
import CompanyState from './CompanyState';

export default class CompaniesPanel extends React.Component {
	render(){
		return (
			<div className="panel panel-container">
				<div className="row">
					<CompanyState />
					<CompanyState />
					<CompanyState />
					<CompanyState />
				</div>
			</div>
		);
	}
}