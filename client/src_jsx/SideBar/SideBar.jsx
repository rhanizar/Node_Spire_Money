import React from 'react';
import ReactDOM from 'react-dom';
import SideBarButton from './SideBarButton';
import SearchCompanyPanel from './SearchCompanyPanel';

export default class SideBar extends React.Component{
	render(){
		const buttons = [];
		const items = {
			dashboard : { label : 'Dashboard',   icon : 'glyphicon-dashboard'},
			companies : { label : 'Companies',   icon : 'glyphicon-sort-by-alphabet'},
			live      : { label : 'NASDAQ Live', icon : 'glyphicon-eye-open'},
			map       : { label : 'Map',         icon : 'glyphicon-map-marker'},
			account   : { label : 'My account',  icon : 'glyphicon-user'},
			logout    : { label : 'Logout',      icon : 'glyphicon-log-out'} 
		};

		items[this.props.activeItem].className = 'active';
		
		let key;
		for (key in items){
			let item = items[key];
			buttons.push(<SideBarButton icon={item.icon} className={item.className} label={item.label} key={item.label} />);
		}

		return (
			<div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
				<div className="profile-sidebar">
					<div className="profile-userpic">
						<img src="http://placehold.it/50/30a5ff/fff" className="img-responsive" alt="" />
					</div>
					<div className="profile-usertitle">
						<div className="profile-usertitle-name">{this.props.name}</div>
					</div>

					<div className="clear"></div>
				</div>
				<div className="divider"></div>
				<SearchCompanyPanel symbols={this.props.symbols} />
				<ul className="nav menu">
					{buttons}
				</ul>
			</div>
		);
	}
}