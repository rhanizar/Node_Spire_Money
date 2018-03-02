import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SideBarButton extends React.Component{
	render(){
		const label = this.props.label;
		const className = this.props.className;
		const iconName = this.props.icon;
		return (
			<li className={className}>
				<a href="#">
					<span className={'glyphicon ' + iconName}>&nbsp;</span>
					{label}
				</a>
			</li>
		);
	}
}

SideBarButton.propTypes = {
	label : PropTypes.string.isRequired,
	className : PropTypes.string,
	icon : PropTypes.string.isRequired,
};