import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Dashboard from './Dashboard/Dashboard';
import SymbolsPanel from './Companies/SymbolsPanel';
import LivePanel from './Live/LivePanel';
import MapPanel from './Map/MapPanel';
import AccountPanel from './MyAccount/AccountPanel';

export default class TabContent extends React.Component {
	render(){
		let content;
		switch(this.props.activeItem){
			case 'dashboard' : content = (<Dashboard symbol={this.props.selectedSymbol} />); break;
			case 'companies' : content = (<SymbolsPanel symbols={this.props.symbols} />); break;
			case 'live'      : content = (<LivePanel />); break;
			case 'map'       : content = (<MapPanel />); break;
			case 'account'   :  content = (<AccountPanel user={this.props.user} />); break;
			case 'logout'    : 
				//content = (<h1> Logout [To Do] </h1>); 
				window.location.href = '/';
			break;
		}

		return (
			<div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
				{content}
			</div>
		);
	}
}

TabContent.propTypes = {
	symbols : PropTypes.array.isRequired,
	user : PropTypes.object.isRequired,
	activeItem : PropTypes.string.isRequired,
	selectedSymbol : PropTypes.string.isRequired,
};