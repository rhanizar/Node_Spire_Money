import React from 'react';
import ReactDOM from 'react-dom';
import TabContentHeader from '../TabContentHeader';
import SymbolsTabContent from './SymbolsTabContent';
import PropTypes from 'prop-types';

export default class SymbolsPanel extends React.Component{
	render(){
		let keyValArr = this.props.symbols;
		let alpha;
		let active = { 'A' : 'in active'};
		let headerActive = { 'A' : 'active'};
		const tabsContent = [];
		const tabsHeader = [];

		for (alpha in keyValArr){
			tabsHeader.push(<li className={headerActive[alpha]} key={`${alpha}Tab`}> <a href={`#${alpha}`} data-toggle="tab"> {alpha} </a> </li>);
			tabsContent.push(
				<SymbolsTabContent className={active[alpha]} id={alpha} symbols={keyValArr[alpha]} key={alpha} />
			);
		}

		return (
			<div>
				<TabContentHeader title="Companies" />
				<div className="panel panel-info">
					<ul className="nav nav-tabs">
						{tabsHeader}
					</ul>
				</div>

				<div className="tab-content">
					{tabsContent}
				</div>
			</div>
		);
	}
}

SymbolsPanel.propTypes = {
	symbols : PropTypes.array.isRequired
};