import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class AboutCompany extends React.Component {
	render(){
		const company = this.props.company;
		return (
			<div className="panel panel-info">
				<div className="panel-heading">About {company}
					<span className="pull-right clickable panel-toggle">
						<em className="fa fa-toggle-up"></em>
					</span>
				</div>
				<div className="panel-body">
					<img src={`img/${this.props.symbol}.jpg`} className="aboutLogo" height="80" />
					<label className="aboutCompanyName">{company}</label>
					<p className="aboutCompanyParagraph">{this.props.about}</p>
				</div>
			</div>
		);
	}
}

AboutCompany.propTypes = {
	company : PropTypes.string.isRequired,
	about : PropTypes.string.isRequired,
	symbol : PropTypes.string.isRequired,
};