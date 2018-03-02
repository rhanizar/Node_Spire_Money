import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class NewsPanel extends React.Component {
	render(){
		const NewsItem = (props) => {
			return (<li className="news-item">
				{props.news.substr(0, 44)} ...<a href={props.url}>Read more</a>
			</li>);
		}
		let i = 0;
		const content = this.props.news.map((newsElement) => {
			i++;
			return (<NewsItem news={newsElement.title} url={newsElement.url} key={i}/>);
		});

		return (
			<div className={`panel ${this.props.className}`}>
				<div className="panel-heading">
				  {this.props.title} news
				</div>

				<div className="panel-body">
					<div className="row">
						<div className="col-xs-12">
						<ul className="news-demo-down-auto">
							{content}
						</ul>
						 
						</div>
					 
					</div>
				</div>
				<div className="panel-footer"></div>
			</div>
		);
	}
}

NewsPanel.propTypes = {
	news : PropTypes.array.isRequired,
	className : PropTypes.string.isRequired,
	title : PropTypes.string.isRequired
};