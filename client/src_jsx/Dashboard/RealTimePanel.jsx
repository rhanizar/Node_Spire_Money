import React from 'react';
import ReactDOM from 'react-dom';
import LoadScript  from 'load-script';
import PropTypes from 'prop-types';

export default class RealTimePanel extends React.Component {
	render(){
		if (this.props.chart)
	    	this.props.chart.render();
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Stock time series data : 
					<label>{this.props.symbol}</label>
					
					<span className="pull-right clickable panel-toggle panel-button-tab-left"><em className="fa fa-toggle-up"></em></span>
				</div>
				<div className="panel-body">
					<div className="canvas-wrapper">
						<div className="main-chart dataSeriesChart" id={this.props.containerId}></div>
					</div>
				</div>
			</div>
		);
	}

	
}

RealTimePanel.propTypes = {
	symbol : PropTypes.string.isRequired,
	containerId : PropTypes.string.isRequired,
	chart : PropTypes.object,
};