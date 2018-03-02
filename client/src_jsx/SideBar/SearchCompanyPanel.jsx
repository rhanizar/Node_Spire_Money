import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SearchCompanyPanel extends React.Component{
	render(){
		let keyValArr = this.props.symbols;
		let options = [], alpha;
		
		for (alpha in keyValArr){
			let optionsArray = keyValArr[alpha].map(
				(element) => (<option value={element.symbol} key={element.symbol}>{element.symbol}</option>) 
			);

			options.push(
				<optgroup label={alpha} key={alpha}>
					{optionsArray}
				</optgroup>
			);
		}

		return (
			<form role="search">
				<div className="form-group">
					<label className="center">Search a company</label>
					<input type="text" className="form-control" placeholder="Name of company" />
				</div>

				<div className="form-group">
					<label className="center">Select a symbol</label>
					<select className="form-control">
						{options}
					</select>
				</div>
			</form>
		);
	}
}

SearchCompanyPanel.propTypes = {
	symbols : PropTypes.array.isRequired
};