import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class TabContentHeader extends React.Component{
	render(){
		return (
			<div>
				<div className="row">
					<ol className="breadcrumb">
						<li><a href="#">
							<em className="fa fa-home"></em>
						</a></li>
						<li className="active">{this.props.title}</li>
					</ol>
				</div>

				<div className="row">
					<div className="col-lg-12">
						<h1 className="page-header">{this.props.title}</h1>
					</div>
				</div>
			</div>
		);
	}
}

TabContentHeader.propTypes = {
	title : PropTypes.string.isRequired
};