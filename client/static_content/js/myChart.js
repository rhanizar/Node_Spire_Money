const MAX_DATA_AMOUNT = 30;
const OPEN_COLOR = "rgb(75, 175, 254)";
const HIGH_COLOR = "rgb(61, 148, 0)";
const LOW_COLOR = "rgb(255, 0, 0)";
const CLOSE_COLOR = "rgb(255, 194, 15)";

let news={
		link : 'https://www.forbes.com/sites/joannmuller/2018/02/16/tesla-thinks-it-will-school-toyota-on-lean-manufacturing-fixing-model-3-launch-would-be-a-start',
		title : 'Musk Thinks Tesla Will School Toyota On Lean Manufacturing; Fixing Model 3 Launch Would Be A Start'
	};

const data = [
	{
		quote : {
			open : 100,
			high : 123,
			low : 90,
			close : 110
		},
		news : news
	},
	{
		quote : {
			open : 111,
			high : 134,
			low : 101,
			close : 120
		},
		news : news
	},
	{
		quote : {
			open : 40,
			high : 60,
			low : 33,
			close : 50
		},
		news : news
	}
];

let i = 0;
let j = 0;
let chart = null;


window.onload = function () {
	let open = [];
	let high = [];
	let low = [];
	let close = [];

	function toggleDataSeries(e) {
		console.log(e);
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}

function format(e){
	let newsItem = e.entries[0].dataPoint.news;

	let date = new Date(e.entries[0].dataPoint.x);
	let hh = date.getUTCHours();
	let mm = date.getUTCMinutes();
	let content = `${hh}:${mm} <br/>`;

	let tmp;

	for (var i = 0; i < e.entries.length; i++) {
		tmp = e.entries[i];
		content += `<span style='color : ${tmp.dataPoint.color}'>${tmp.dataSeries.name}</span> : ${tmp.dataPoint.y}`;
		content += "<br/>";
	}
	
	content += `<a href="#">${newsItem.title.substr(0, 70)}...</a>`;
	return content;
}

function onclick(e){
	window.open(e.dataPoint.news.link,'_blank');
}


	chart = new CanvasJS.Chart("chartContainer", {
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
			content : format
		},
		legend: {
			cursor:"pointer",
			verticalAlign: "top",
			fontSize: 22,
			fontColor: "dimGrey",
			itemclick : toggleDataSeries
		},
		data: [{ 
				type: "line",
				xValueType: "dateTime",
				yValueFormatString: "$####.00",
				xValueFormatString: "HH:mm",
				showInLegend: true,
				name: "Open",
				lineColor : OPEN_COLOR,
				dataPoints: open,
				click : onclick
			},
			{				
				type: "line",
				xValueType: "dateTime",
				yValueFormatString: "$####.00",
				xValueFormatString: "HH:mm",
				showInLegend: true,
				name: "High" ,
				lineColor : HIGH_COLOR,
				dataPoints: high,
				click : onclick
			},
			{				
				type: "line",
				xValueType: "dateTime",
				yValueFormatString: "$####.00",
				xValueFormatString: "HH:mm",
				showInLegend: true,
				name: "Low" ,
				lineColor : LOW_COLOR,
				dataPoints: low,
				click : onclick
			},
			{				
				type: "line",
				xValueType: "dateTime",
				yValueFormatString: "$####.00",
				xValueFormatString: "HH:mm",
				showInLegend: true,
				name: "Close" ,
				lineColor : CLOSE_COLOR,
				dataPoints: close,
				click : onclick

			}
		]
	});

	let time = new Date;
	function updateChart() {
		j++;

		if (i === data.length - 1) 
			i = 0;
		else i++;

		if (open.length === MAX_DATA_AMOUNT){
			open = open.slice(1);
			high = high.slice(1);
			low = low.slice(1);
			close = close.slice(1);
		}

		open.push({
			x: time.getTime(),
			y: data[i].quote.open,
			news : data[i].news,
			color: OPEN_COLOR
		});

		high.push({
			x: time.getTime(),
			y: data[i].quote.high,
			news : data[i].news,
			color: HIGH_COLOR
		});

		low.push({
			x: time.getTime(),
			y: data[i].quote.low,
			news : data[i].news,
			color: LOW_COLOR
		});

		close.push({
			x: time.getTime(),
			y: data[i].quote.close,
			news : data[i].news,
			color: CLOSE_COLOR
		});

		// updating legend text with  updated with y Value 
		chart.options.data[0].legendText = " Open " + data[i].quote.open + " USD";
		chart.options.data[1].legendText = " High " + data[i].quote.high + " USD"; 
		chart.options.data[2].legendText = " Low " + data[i].quote.low + " USD"; 
		chart.options.data[3].legendText = " Close " + data[i].quote.close + " USD";

		chart.options.data[0].dataPoints = open;
		chart.options.data[1].dataPoints = high;
		chart.options.data[2].dataPoints = low;
		chart.options.data[3].dataPoints = close;

		chart.render();

		time = new Date;
	}

	let updateInterval = 2000;
	updateChart();	
	setInterval(function(){updateChart()}, updateInterval);

	/*$(window).resize(function() {
		console.log("Resizing");
        chart.options.width = $('#chartContainer').width();
        chart.options.height = $('#chartContainer').height();
        chart.render();
	});*/
}

window.onresize = function(){
	if (chart != null)
		chart.render();
}