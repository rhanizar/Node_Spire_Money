import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SideBarButton extends React.Component{
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		e.preventDefault();
		this.props.onClick(this.props.id);
	}
	render(){
		const label = this.props.label;
		const className = this.props.className;
		const iconName = this.props.icon;
		return (
			<li className={className}>
				<a href="#" onClick={this.handleClick}>
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
	onClick : PropTypes.func.isRequired,
	id : PropTypes.string.isRequired,
};