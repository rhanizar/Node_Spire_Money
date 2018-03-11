import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Typeahead} from 'react-bootstrap-typeahead';

const nasdaqSymbol = 'IXIC'; // Indice de NASDAQ

export default class SearchCompanyPanel extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = { selectedSymbol : this.props.selectedSymbol};
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleTypeAhead = this.handleTypeAhead.bind(this);
	}

	init()
	{
		
	}

	handleTypeAhead(selected){
		if (selected[0])
			this.props.onChangeSymbol(selected[0].symbol);
	}

	handleSelectChange(event)
	{
		event.preventDefault();
		this.props.onChangeSymbol(event.target.value);
	}

	render(){
		let keyValArr = this.props.symbols;
		let options = [];
		let elements = [];

		let alpha;
		for (alpha in keyValArr){
			const optionsArray = [];
			keyValArr[alpha].forEach(
				(element) => {
					elements.push({
						symbol : element.symbol,
						label : element.company
					});
					optionsArray.push(<option value={element.symbol} key={element.symbol}>{element.symbol}</option>);
				}
			);

			options.push(
				<optgroup label={alpha} key={alpha}>
					{optionsArray}
				</optgroup>
			);
		}

		const type = (<Typeahead onChange={this.handleTypeAhead} options={elements} />);
		return (
			<form role="search">
				<div className="form-group">
					<label className="center">Search a company</label>
					{type}
				</div>

				<div className="form-group">
					<label className="center">Select a symbol</label>
					<select className="form-control" onChange={this.handleSelectChange} 
						value={this.props.selectedSymbol}>
						{options}
					</select>
				</div>
			</form>
		);
	}
}

SearchCompanyPanel.propTypes = {
	symbols : PropTypes.array.isRequired,
	onChangeSymbol : PropTypes.func.isRequired,
	selectedSymbol : PropTypes.string.isRequired,
};