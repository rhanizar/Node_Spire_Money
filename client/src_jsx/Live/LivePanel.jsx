import React from 'react';
import ReactDOM from 'react-dom';
import TabContentHeader from '../TabContentHeader';


export default class LivePanel extends React.Component {
	render(){
		return (
			<div>
				<TabContentHeader title="NASDAQ Live" />
				<div class="row">
					<div class="col-md-12">
						<div class="panel panel-info">
							<div class="panel-heading">
							  Live streaming
							</div>

							<div class="panel-body">
								<div class="row">
									<div class="col-xs-12">
										<iframe id="ls_embed_1519387114" src="https://livestream.com/accounts/888332/events/931293/player?width=640&height=360&enableInfoAndActivity=true&defaultDrawer=&autoPlay=true&mute=false" class="livePanel" frameborder="0" scrolling="no" allowfullscreen> </iframe>
									</div>
								</div>
							</div>
							 
							<div class="panel-footer"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}