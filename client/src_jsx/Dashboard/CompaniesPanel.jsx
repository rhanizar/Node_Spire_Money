import React from 'react';
import ReactDOM from 'react-dom';
import CompanyState from './CompanyState';
import PropTypes from 'prop-types';

const NEW_STATES_EVENT = 'NEW_STATES_EVENT';

export default class CompaniesPanel extends React.Component {
	constructor(props)
	{
		super(props);

		this.companies = this.props.companies;

		let me = this;

		this.newStateEventHandler = this.newStateEventHandler.bind(this);
		
		this.props.socket.on(NEW_STATES_EVENT, function(msg){
		    me.newStateEventHandler(msg);
		});
	}

	newStateEventHandler(msg)
	{
		/*console.log('Hello from the newStateEventHandler handler !!');
		console.log(msg);
		console.log('End of message');*/
	}

	render(){
		const companies = this.companies;
		let i = 0;
		const content = [];
		for (let symbol in companies)
		{
			const company = companies[symbol];
			content[i] = (<CompanyState  symbol={symbol} volume={company.volume}
					 price={company.price} difference={company.difference} key={i} />);
			i++;
		}
/*		const content = companies.map((company) => {
			i++;
			return (<CompanyState  symbol={company.symbol} volume={company.volume}
					 price={company.price} difference={company.difference} key={i}/>);
		});*/

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
	companies : PropTypes.object.isRequired,
	socket : PropTypes.object.isRequired,
};