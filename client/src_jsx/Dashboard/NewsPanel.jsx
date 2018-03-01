import React from 'react';
import ReactDOM from 'react-dom';

export default class NewsPanel extends React.Component {
	render(){
		return (
			<div className="panel panel-danger">
				<div className="panel-heading">
				  Latest News
				</div>

				<div className="panel-body">
					<div className="row">
						<div className="col-xs-12">
						<ul className="news-demo-down-auto">
						<li className="news-item">Python new version is released..
							<a href="#">Read more</a>
						</li>

						<li className="news-item">Get ready for Bootstrap 4... <a href="#">Read more</a></li>
						 
						<li className="news-item">New forms in Bootstrap.. <a href="#">Read more</a></li>
						 
						<li className="news-item">PHP date ... <a href="#">Read more</a></li>
						 
						<li className="news-item">Read about Java update ... <a href="#">Read more</a></li>
						 
						<li className="news-item">HTML 5... <a href="#">Read more</a></li>
						 
						</ul>
						 
						</div>
					 
					</div>
				</div>
				<div className="panel-footer"></div>
			</div>
		);
	}
}