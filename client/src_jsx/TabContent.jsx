import React from 'react';
import ReactDOM from 'react-dom';

import Dashboard from './Dashboard/Dashboard';
import SymbolsPanel from './Companies/SymbolsPanel';
import LivePanel from './Live/LivePanel';
import MapPanel from './Map/MapPanel';
import AccountPanel from './MyAccount/AccountPanel';

import PropTypes from 'prop-types';


export default class TabContent extends React.Component {
	render(){
		return (
			<div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
				<AccountPanel />
			</div>
		);
	}
}

TabContent.propTypes = {
	symbols : PropTypes.array.isRequired
};