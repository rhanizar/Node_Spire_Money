import React from 'react';
import ReactDOM from 'react-dom';
import TabContentHeader from '../TabContentHeader';


export default class LivePanel extends React.Component {
	render(){
		return (
			<div>
				<TabContentHeader title="NASDAQ Live" />
				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-info">
							<div className="panel-heading">
							  Live streaming
							</div>

							<div className="panel-body">
								<div className="row">
									<div className="col-xs-12">
										<iframe id="ls_embed_1519387114" src="https://livestream.com/accounts/888332/events/931293/player?width=640&height=360&enableInfoAndActivity=true&defaultDrawer=&autoPlay=true&mute=false"
										className="livePanel" frameBorder="0" scrolling="no" allowFullScreen> </iframe>
									</div>
								</div>
							</div>
							 
							<div className="panel-footer"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}