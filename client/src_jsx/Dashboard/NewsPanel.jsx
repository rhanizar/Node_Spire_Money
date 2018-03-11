import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import LoadScript  from 'load-script';

const NEW_NEWS_EVENT = 'NEW_NEWS_EVENT';
const MAX_NEWS_ITEMS = 30;

const NewsItem = (props) => {
			return (
				<div className={props.className}>
	               <li>
		               	<span>{props.news.substr(0, 90)} ...  <a href={props.link} target='_blank'>Read more</a>
		               	</span>
	               	</li>
	            </div>);
		}

export default class NewsPanel extends React.Component {
	constructor(props)
	{
		super(props);
		this.content = null;
		this.newsArray = this.props.news;
		this.newsEventHandler = this.newsEventHandler.bind(this);

		let me = this;

		this.props.socket.on(NEW_NEWS_EVENT, function(msg){
		    me.newsEventHandler(msg);
		});
	}

	newsEventHandler(msg)
	{
		/*console.log('1- this.newsArray : ');
		console.log(this.newsArray);
		console.log('Hello from the newsEventHandler handler !!');
		console.log(msg);
		console.log('End of message');*/

		/*console.log('newsEventHandler : ');
		console.log(msg);*/

		let toRemove = msg.length + this.newsArray.length - MAX_NEWS_ITEMS;
		if (toRemove > 0)
			this.newsArray = this.newsArray.slice(toRemove);

		this.newsArray = this.newsArray.concat(msg);
		this.forceUpdate();
	}
	
	render(){
		let className;
		let i = 0;
		this.content = this.newsArray.map((newsElement) => {
			className = 'ticker-active';
			if (i > 0)
				className = 'not-active';
			i++;
			return (<NewsItem className={className} news={newsElement.titre} link={newsElement.link} key={i}/>);
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
	title : PropTypes.string.isRequired,
	socket : PropTypes.object.isRequired,
};