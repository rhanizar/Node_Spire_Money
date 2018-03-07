import React from 'react';
import ReactDOM from 'react-dom';
import CompaniesPanel from './CompaniesPanel';
import NewsPanel from './NewsPanel';
import RealTimePanel from './RealTimePanel';
import AboutCompany from './AboutCompany';
import TabContentHeader from '../TabContentHeader';
import PropTypes from 'prop-types';
import LoadScript  from 'load-script';

const MAX_DATA_AMOUNT = 30;
const OPEN_COLOR = "rgb(75, 175, 254)";
const HIGH_COLOR = "rgb(61, 148, 0)";
const LOW_COLOR = "rgb(255, 0, 0)";
const CLOSE_COLOR = "rgb(255, 194, 15)";

/**** To retreive from Mongo DB ***/
const states = [
	{ symbol : 'MSFT', volume : 2023210, price : 171.6520, difference : -1.59 },
	{ symbol : 'AAPL', volume : 2023210, price : 171.6520, difference : 0.59 },
	{ symbol : 'MSFT', volume : 20232665656, price : 171.6520, difference : -1.59 },
	{ symbol : 'MSFT', volume : 2023210, price : 171.6520, difference : 2.59 },
];

const latestNews = [
	{ title : 'News 1', url : '#'},
	{ title : 'News 2', url : '#'},
	{ title : 'News 3', url : '#'},
	{ title : 'News 4', url : '#'},
	{ title : 'News 5', url : '#'},
];

const symbolNews = [
	{ title : 'Company News 1', url : '#'},
	{ title : 'Company News 2', url : '#'},
	{ title : 'Company News 3', url : '#'},
	{ title : 'Company News 4', url : '#'},
	{ title : 'Company News 5', url : '#'},
];

const news={
		url : 'https://www.forbes.com/sites/joannmuller/2018/02/16/tesla-thinks-it-will-school-toyota-on-lean-manufacturing-fixing-model-3-launch-would-be-a-start',
		title : 'Musk Thinks Tesla Will School Toyota On Lean Manufacturing; Fixing Model 3 Launch Would Be A Start'
	};

const now = new Date();
const now2 = new Date();
const now3 = new Date();

now2.setMinutes(now.getMinutes() + 1);
now3.setMinutes(now2.getMinutes() + 1);

const data = [
	{
		quote : {
			open : 100,
			high : 123,
			low : 90,
			close : 110,
		},
		news : news,
		time : now
	},
	{
		quote : {
			open : 111,
			high : 134,
			low : 101,
			close : 120,
		},
		news : news,
		time : now2
	},
	{
		quote : {
			open : 40,
			high : 60,
			low : 33,
			close : 50,
		},
		news : news,
		time : now3
	}
];
/**** To retreive from Mongo DB ***/

export default class Dashboard extends React.Component{
	constructor(props){
		super(props);
		this.company = this.companyFromSymbol(this.props.symbol);
		this.chart = null;
		this.open  = [];
		this.high  = [];
		this.low   = [];
		this.close = [];

		this.format = this.format.bind(this);
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
		this.onclick = this.onclick.bind(this);
		this.containerId = "chartContainer";

		LoadScript('js/canvasjs.min.js',(err, script) => {
			this.chart = new CanvasJS.Chart(this.containerId, {
				zoomEnabled: true,
				axisY:{
					suffix: " USD",
					includeZero: false
				},
				axisX:{
					valueFormatString: "HH:mm"
				},
				toolTip: {
					shared: true,
					content : this.format
				},
				legend: {
					cursor:"pointer",
					verticalAlign: "top",
					fontSize: 22,
					fontColor: "dimGrey",
					itemclick : this.toggleDataSeries
				},
				data: [
					{ 
						type: "line",
						xValueType: "dateTime",
						yValueFormatString: "$####.00",
						xValueFormatString: "HH:mm",
						showInLegend: true,
						name: "Open",
						lineColor : OPEN_COLOR,
						dataPoints: this.open,
						click : this.onclick
					},
					{				
						type: "line",
						xValueType: "dateTime",
						yValueFormatString: "$####.00",
						xValueFormatString: "HH:mm",
						showInLegend: true,
						name: "High" ,
						lineColor : HIGH_COLOR,
						dataPoints: this.high,
						click : this.onclick
					},
					{				
						type: "line",
						xValueType: "dateTime",
						yValueFormatString: "$####.00",
						xValueFormatString: "HH:mm",
						showInLegend: true,
						name: "Low" ,
						lineColor : LOW_COLOR,
						dataPoints: this.low,
						click : this.onclick
					},
					{				
						type: "line",
						xValueType: "dateTime",
						yValueFormatString: "$####.00",
						xValueFormatString: "HH:mm",
						showInLegend: true,
						name: "Close" ,
						lineColor : CLOSE_COLOR,
						dataPoints: this.close,
						click : this.onclick

					}
				]
			});

			data.forEach((info) => {
				this.pushData(info);
			});

			this.forceUpdate();
		});
	}

	format(e){
		let newsItem = e.entries[0].dataPoint.news;

		let date = new Date(e.entries[0].dataPoint.x);
		let hh = date.getUTCHours();
		let mm = date.getUTCMinutes();
		let content = `${hh}:${mm} <br/>`;

		let tmp;

		for (let i = 0; i < e.entries.length; i++) {
			tmp = e.entries[i];
			content += `<span style='color : ${tmp.dataPoint.color}'>${tmp.dataSeries.name}</span> : ${tmp.dataPoint.y} $`;
			content += "<br/>";
		}
		
		content += `<a href="#">${newsItem.title.substr(0, 70)}...</a>`;
		return content;
	}

	toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}

		if (this.chart != null)
			this.chart.render();
	}

	onclick(e){
		window.open(e.dataPoint.news.url,'_blank');
	}

	pushData(info) {
		if ((info.quote == undefined) || (info.quote == null) || (this.chart == null))
			return;

		if (this.open.length === MAX_DATA_AMOUNT){
			this.open = this.open.slice(1);
			this.high = this.high.slice(1);
			this.low = this.low.slice(1);
			this.close = this.close.slice(1);
		}

		this.open.push({
			x: info.time,
			y: info.quote.open,
			news : info.news,
			color: OPEN_COLOR
		});

		this.high.push({
			x: info.time,
			y: info.quote.high,
			news : info.news,
			color: HIGH_COLOR
		});

		this.low.push({
			x: info.time,
			y: info.quote.low,
			news : info.news,
			color: LOW_COLOR
		});

		this.close.push({
			x: info.time,
			y: info.quote.close,
			news : info.news,
			color: CLOSE_COLOR
		});

		// updating legend text with  updated with y Value 
		this.chart.options.data[0].legendText = " Open " + info.quote.open + " USD";
		this.chart.options.data[1].legendText = " High " + info.quote.high + " USD"; 
		this.chart.options.data[2].legendText = " Low " + info.quote.low + " USD"; 
		this.chart.options.data[3].legendText = " Close " + info.quote.close + " USD";

		this.chart.options.data[0].dataPoints = this.open;
		this.chart.options.data[1].dataPoints = this.high;
		this.chart.options.data[2].dataPoints = this.low;
		this.chart.options.data[3].dataPoints = this.close;
	}

	companyFromSymbol(symbol){
		const aboutCompany = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut ante in sapien blandit luctus sed ut lacus. Phasellus urna est, faucibus nec ultrices placerat, feugiat et ligula. Donec vestibulum magna a dui pharetra molestie. Fusce et dui urna.';
		const company = { name : 'Microsoft', about : aboutCompany }; // Attaquer la base de données
		return company;
	}

	componentDidMount()
	{
		LoadScript('js/news.js', (err, script) =>{
			console.log(script);
		});
	}

	render(){
		return (
			<div>
				<TabContentHeader title="Dashboard" />

				<CompaniesPanel companies={states}/>

				<div className="row">
					<div className="col-md-12">
						<NewsPanel news={latestNews} className='panel-danger' title='Latest'/>		 
						{/*<NewsPanel news={symbolNews} className='panel-info' title={this.company.name}/>	*/}
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<RealTimePanel symbol={this.props.symbol} containerId={this.containerId} chart={this.chart} />
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<AboutCompany company={this.company.name} about={this.company.about} />
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	symbol : PropTypes.string.isRequired
};