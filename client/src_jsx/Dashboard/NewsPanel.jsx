import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import LoadScript  from 'load-script';

const NewsItem = (props) => {
			return (
				<div className={props.className}>
	               <li>
		               	<span>{props.news.substr(0, 44)} ...  <a href={props.url}>Read more</a>
		               	</span>
	               	</li>
	            </div>);
		}

export default class NewsPanel extends React.Component {
	constructor(props)
	{
		super(props);
		this.content = null;
	}
	
	render(){
		let className;
		let i = 0;
		this.content = this.props.news.map((newsElement) => {
			className = 'ticker-active';
			if (i > 0)
				className = 'not-active';
			i++;
			return (<NewsItem className={className} news={newsElement.title} url={newsElement.url} key={i}/>);
		});
		return (<div className="ticker-container">
					<div className="ticker-caption">
			            <p>{this.props.title} news</p>
			        </div>

			        <ul>
						{this.content}
					</ul>
				</div>

		);
	}
}

NewsPanel.propTypes = {
	news : PropTypes.array.isRequired,
	className : PropTypes.string.isRequired,
	title : PropTypes.string.isRequired
};