import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Symbol extends React.Component{
	render(){
		const company = this.props.company;
		const symbol = this.props.symbol;
		const logo = `img/${symbol}.jpg`;
		return (
			<div className="panel panel-info">
				<div className="panel-heading">{company}
				</div>
				<div className="panel-body companiesPanelBody">
					<img src={logo} className="companiesLogo" height="80" />
					<label className="companiesSymbolName">{symbol}</label>
				</div>
			</div>
		);
	}
}

Symbol.propTypes = {
	company : PropTypes.string.isRequired,
	symbol : PropTypes.string.isRequired
};