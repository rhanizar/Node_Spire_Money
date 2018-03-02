import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class CompanyState extends React.Component{
	render(){
		let volume = this.props.volume.toFixed(0).toString();
		volume = volume.replace(/\B(?=(\d{3})+\b)/g, " ");

		let price = Number(this.props.price).toFixed(2);
		let styleClass = (this.props.difference >= 0) ? 'up' : 'down';
		return (<div className="col-xs-6 col-md-3 col-lg-3 no-padding">
			<div className="panel panel-teal panel-widget border-right">
				<div className="row no-padding">
					<div className="panelSymbolMain">
						<div className="panelBrandLogo">
							<img src="img/microsoft_logo.jpg" className="img-rounded" height="80" />
							<label className="panelSymbol">{this.props.symbol}</label> 
						</div>
						<br/>
						<label className="panelVolume">{volume}</label> <br/>
						<label className={`panelClosePrice ${styleClass}`}>
							{price}
						</label>
						<span className={`panelCloseState glyphicon glyphicon-arrow-${styleClass}`}></span>
						<label className={`panelCloseChange ${styleClass}`}>{(this.props.difference >= 0) && `+`}{`${this.props.difference} %`}</label>
					</div>
				</div>
			</div>
		</div>);
	}
}

CompanyState.propTypes = {
	symbol : PropTypes.string.isRequired,
	volume : PropTypes.number.isRequired,
	price : PropTypes.number.isRequired,
	difference : PropTypes.number.isRequired
};