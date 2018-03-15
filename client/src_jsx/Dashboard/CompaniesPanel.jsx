import React from 'react';
import ReactDOM from 'react-dom';
import CompanyState from './CompanyState';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

const NEW_STATES_EVENT = 'NEW_STATES_EVENT';

export default class CompaniesPanel extends React.Component {
	constructor(props)
	{
		super(props);

		this.companies = this.props.companies;

		let i = 0, total = 0;
		this.GlobalTab = [];
		this.indexes = {}; // For dynamic modification
		this.state = { currentIndex : 0 };

		let keys = Object.keys(this.props.companies);
		while(total < keys.length)
		{
			let j = 0;
			while(j < 4 && total < keys.length){
				let key = keys[total];
				let obj = { symbol : key, state : this.props.companies[key] };
				if (!(this.GlobalTab[i]))
					this.GlobalTab[i] = [ obj ];
				else
					this.GlobalTab[i].push(obj);

				this.indexes[key] = { line : i, column : j };
				total++;
				j++;
			}
			i++;
		}

		let me = this;


		this.newStateEventHandler = this.newStateEventHandler.bind(this);
		
		this.props.socket.on(NEW_STATES_EVENT, function(msg){
		    me.newStateEventHandler(msg);
		});
		this.changeIndex = this.changeIndex.bind(this);
		this.timerID = setInterval(this.changeIndex, 3000);
	}

	changeIndex()
	{
		let newIndex = this.state.currentIndex + 1;
		if (newIndex == this.GlobalTab.length)
			newIndex =	0;
		this.setState({ currentIndex : newIndex });
	}

	newStateEventHandler(msg)
	{
		const index = this.indexes[msg.symbol];
		const tab = this.GlobalTab[index.line];
		tab[index.column].state = msg.state;
		const child = this.refs[msg.symbol];
		child.forceUpdate();
	}

	componentWillUnmount() {
	    clearInterval(this.timerID);
	}

	render(){
		const companies = this.companies;
		let i = 0;
		const content = [];
		this.GlobalTab[this.state.currentIndex].forEach((element) => {
			content[i] = (<CompanyState ref={element.symbol} symbol={element.symbol} volume={element.state.volume}
					 price={element.state. 	price} difference={element.state.difference} key={element.symbol} />);
			i++;
		});
/*
		for (let symbol in companies)
		{
			const company = companies[symbol];
			content[i] = (<CompanyState  symbol={symbol} volume={company.volume}
					 price={company.price} difference={company.difference} key={i} />);
			i++;
		}*/
/*		const content = companies.map((company) => {
			i++;
			return (<CompanyState  symbol={company.symbol} volume={company.volume}
					 price={company.price} difference={company.difference} key={i}/>);
		});*/

		return (
			<div className="panel panel-container">
				<div className="row statesPanel">
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