import React from 'react';
import ReactDOM from 'react-dom';
import Symbol from './Symbol';
import PropTypes from 'prop-types';

const PANELS_PER_LINE = 3;
export default class SymbolsTabContent extends React.Component{
	render(){
		let symbols = this.props.symbols;
		let tab = [];
		let i;
		for (i = 0; i < symbols.length; i++){
			let j = parseInt(i / PANELS_PER_LINE);
			if ( (i % PANELS_PER_LINE == 0) || (tab[j] == undefined) )
				tab[j] = [symbols[i]];
			else
				tab[j].push(symbols[i]);
		}
		
		i = 0;
		let rows = tab.map(element => {
			let panels = element.map(panel => {
				return (
					<div className="col-md-4" key={panel.symbol}>
						<Symbol company={panel.company} symbol={panel.symbol} key={panel.symbol}/>
					</div>);
			});
			i++;
			return (
				<div className="row"  key={i}>
					{panels}
				</div>);
		});

		return (
			<div className={"tab-pane fade "+ this.props.className} id={this.props.id}>
				<div className="col-sm-12 main">
					{rows}
				</div>          
			</div>
		);
	}
}

SymbolsTabContent.propTypes = {
	className : PropTypes.string,
	id : PropTypes.string.isRequired,
	symbols : PropTypes.array.isRequired
};