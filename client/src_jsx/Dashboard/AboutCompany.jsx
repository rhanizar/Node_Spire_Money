import React from 'react';
import ReactDOM from 'react-dom';

export default class AboutCompany extends React.Component {
	render(){
		return (
			<div className="panel panel-info">
				<div className="panel-heading">About Microsoft
					<span className="pull-right clickable panel-toggle">
						<em className="fa fa-toggle-up"></em>
					</span>
				</div>
				<div className="panel-body">
					<img src="img/microsoft_logo.jpg" className="aboutLogo" height="80" />
					<label className="aboutCompanyName">Microsoft</label>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien 
					blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.</p>
				</div>
			</div>
		);
	}
}