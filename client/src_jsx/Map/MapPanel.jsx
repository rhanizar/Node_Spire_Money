import React from 'react';
import ReactDOM from 'react-dom';
import TabContentHeader from '../TabContentHeader';
import { withScriptjs,withGoogleMap, GoogleMap, Marker } from "react-google-maps";

export default class MapPanel extends React.Component {
	render(){
		const nasdaqLocation = {lat: 40.7560099, lng: -73.9858954};
		const defaultZoom = 19;
		const MyMapComponent = withScriptjs(withGoogleMap((props) =>
			  <GoogleMap
			    defaultZoom={defaultZoom}
			    defaultCenter={nasdaqLocation}
			  >
			    {props.isMarkerShown && <Marker position={nasdaqLocation} />}
			  </GoogleMap>
		));

		return (
			<div>
				<TabContentHeader title="Map" />
				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-info">
							<div className="panel-heading">
							  NASDAQ on the map
							</div>

							<div className="panel-body">
								<div className="row">
									<div className="col-xs-12">
										<MyMapComponent
										  isMarkerShown={true}
										  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
										  loadingElement={<div style={{ height: `100%` }} />}
										  containerElement={<div style={{ height: `400px` }} />}
										  mapElement={<div style={{ height: `100%` }} />}/>
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