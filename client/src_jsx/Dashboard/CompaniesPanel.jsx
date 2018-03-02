import React from 'react';
import ReactDOM from 'react-dom';
import CompanyState from './CompanyState';
import PropTypes from 'prop-types';

export default class CompaniesPanel extends React.Component {
	render(){
		const companies = this.props.companies;
		let i = 0;
		const content = companies.map((company) => {
			i++;
			return (<CompanyState  symbol={company.symbol} volume={company.volume}
					 price={company.price} difference={company.difference} key={i}/>);
		});

		return (
			<div className="panel panel-container">
				<div className="row">
					{content}
				</div>
			</div>
		);
	}
}

CompaniesPanel.propTypes = {
	companies : PropTypes.array.isRequired,
};