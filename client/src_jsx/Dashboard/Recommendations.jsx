import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

const BUY_STR = "Buy";
const SELL_STR ="Sell";
/*
	Data Structure :
		{
			AAPL : { week : true, month : false, trimestre : true, year : false, max :true }
		}

		true : buy
		false : sell
*/

/*
	RecommendationsLine PropsTypes :
		{ symbol : 'AAPL', data : { week : true, month : false, trimestre : true, year : false, max :true }}
*/

const RecommendationsLine = (props) => {
	const obj = {};
	for (let period in props.data)
		obj[period] = (props.data[period]) ? BUY_STR : SELL_STR;
	return (
		<tr>
			<td className="symbolRecommand">
				{props.symbol}
			</td>
			<td className={obj.week}>{obj.week}</td>
			<td className={obj.month}>{obj.month}</td>
			<td className={obj.trimestre}>{obj.trimestre}</td>
			<td className={obj.year}>{obj.year}</td>
			<td className={obj.max}>{obj.max}</td>
        </tr> );
};

export default class Recommendations extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {};
		this.fetchData = this.fetchData.bind(this);
		this.routes = {
			recommendations : '/api/recommendations/'
		}
	}

	componentDidMount()
	{
		this.fetchData();
	}

	fetchData()
	{
		fetch(this.routes.recommendations, { method: 'GET' }).then(response => {
          if (response.ok) {
            response.json().then(data => {
             	this.setState({ recommendations : data.recommendations });
            });
          }
        }).catch(err => {
            console.log("Error in sending data to server : " + err.message);
        });
	}

	render()
	{
		let content = [];
		for (let key in this.state.recommendations)
		{
			content.push(<RecommendationsLine symbol={key} data={this.state.recommendations[key]} key={key}/>);
		}

		return (
			<div className="panel panel-info">
				<div className="panel-heading">Recommendations for today
					<span className="pull-right clickable panel-toggle">
						<em className="fa fa-toggle-up"></em>
					</span>
				</div>
				<div className="panel-body">
					<table className="table table-hover">
						<thead>
							<tr>
								<th>Symbol</th>
								<th>1 week</th>
								<th>1 month</th>
								<th>3 months</th>
								<th>1 year</th>
								<th>max</th>
							</tr>
						</thead>
						<tbody>
							{content}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}