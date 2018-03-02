import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Dashboard from './Dashboard/Dashboard';
import SymbolsPanel from './Companies/SymbolsPanel';
import LivePanel from './Live/LivePanel';
import MapPanel from './Map/MapPanel';
import AccountPanel from './MyAccount/AccountPanel';

const selectedSymbol = 'MSFT';
export default class TabContent extends React.Component {
	render(){
		return (
			<div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
				<AccountPanel user={this.props.user} />
			</div>
		);
	}
}

TabContent.propTypes = {
	symbols : PropTypes.array.isRequired,
	user : PropTypes.object.isRequired,
};