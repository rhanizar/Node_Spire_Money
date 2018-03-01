import React from 'react';
import ReactDOM from 'react-dom';

export default class RealTimePanel extends React.Component {
	render(){
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Stock time series data :
					<label>MSFT</label>
					<ul className="pull-right panel-settings panel-button-tab-right">
						<li className="dropdown">
							<a className="pull-right dropdown-toggle" data-toggle="dropdown" href="#">
								<span className="glyphicon glyphicon-question-sign"></span>
							</a>
							<ul className="dropdown-menu dropdown-menu-right">
								<li>
									<ul className="dropdown-settings">
										<li>
											<span className="glyphicon glyphicon-stop openHelp"></span> Open
										</li>
										<li className="divider"></li>
										<li>
											<span className="glyphicon glyphicon-stop highHelp"></span> High
										</li>
										<li className="divider"></li>
										<li>
											<span className="glyphicon glyphicon-stop closeHelp"></span> Close
										</li>
										<li className="divider"></li>
										<li>
											<span className="glyphicon glyphicon-stop lowHelp"></span> Low
										</li>

									</ul>
								</li>
							</ul>
						</li>
					</ul>
					<span className="pull-right clickable panel-toggle panel-button-tab-left"><em className="fa fa-toggle-up"></em></span></div>
				<div className="panel-body">
					<div className="canvas-wrapper">
						<div className="main-chart dataSeriesChart" id="chartContainer"></div>
					</div>
				</div>
			</div>
		);
	}
}