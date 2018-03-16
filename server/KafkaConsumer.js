const kafka = require('kafka-node');
const Consumer = kafka.Consumer;


const staticData = [
    [{
        symbol : "AAPL",
        data : {
            quote : { open : 100, high : 200, low : 90, close : 110, volume : 1000000 },
            news : [
                { link : 'link1', titre : 'AAPL 1.1', "description": "desc AAPL 1.1"},
                { link : 'link1', titre : 'AAPL 1.2', "description": "desc AAPL 1.2"}
            ],
            time : '2018-02-27 16:00:00'
        },
    },
    {
        symbol : "FB",
        data : {
            quote : { open : 110, high : 210, low : 100, close : 120, volume : 1000000 },
            news : [
                { link : 'link1', titre : 'FB 1.1', "description": "desc FB 1.1"},
                { link : 'link1', titre : 'FB 1.2', "description": "desc FB 1.2"}
            ],
            time : '2018-02-27 16:00:00'
        },
    },
    {
        symbol : "INTC",
        data : {
            quote : { open : 110, high : 210, low : 100, close : 120, volume : 1000000 },
            news : [
                { link : 'link1', titre : 'INTC 1.1', "description": "desc INTC 1.1"},
                { link : 'link1', titre : 'INTC 1.2', "description": "desc INTC 1.2"}
            ],
            time : '2018-02-27 16:00:00'
        },
    },
    {
        symbol : "IXIC",
        data : {
            quote : { open : 110, high : 210, low : 100, close : 120, volume : 1000000 },
            news : [
                { link : 'link1', titre : 'IXIC 1.1', "description": "desc IXIC 1.1"},
                { link : 'link1', titre : 'IXIC 1.2', "description": "desc IXIC 1.2"}
            ],
            time : '2018-02-27 16:00:00'
        },
    },
    ],

    [{
        symbol : "AAPL",
        data : {
            quote : { open : 100, high : 200, low : 90, close : 112.2, volume : 1000000 },
            news : [
                { link : 'link1', titre : 'AAPL 2.1', "description": "desc AAPL 2.1"},
                { link : 'link1', titre : 'AAPL 2.2', "description": "desc AAPL 2.2"}
            ],
            time : '2018-02-27 16:10:00'
        },
    },
    {
        symbol : "FB",
        data : {
            quote : { open : 110, high : 210, low : 100, close : 121.56, volume : 1000000 },
            news : [
                { link : 'link1', titre : 'FB 2.1', "description": "desc FB 2.1"},
                { link : 'link1', titre : 'FB 2.2', "description": "desc FB 2.2"}
            ],
            time : '2018-02-27 16:10:00'
        },
    },
    {
        symbol : "INTC",
        data : {
            quote : { open : 110, high : 210, low : 100, close : 119.64, volume : 1000000 },
            news : [
                { link : 'link1', titre : 'INTC 2.1', "description": "desc INTC 2.1"},
                { link : 'link1', titre : 'INTC 2.2', "description": "desc INTC 2.2"}
            ],
            time : '2018-02-27 16:10:00'
        },
    },
    {
        symbol : "IXIC",
        data : {
            quote : { open : 110, high : 210, low : 100, close : 123.6, volume : 1000000 },
            news : [
                { link : 'link1', titre : 'IXIC 2.1', "description": "desc IXIC 2.1"},
                { link : 'link1', titre : 'IXIC 2.2', "description": "desc IXIC 2.2"}
            ],
            time : '2018-02-27 16:10:00'
        },
    },
    ],
];

class KafkaConsumer
{
    constructor(topicName, zookeeperHost, partition, onMsgCallback, onErrorCallback)
    {
        this.client = new kafka.Client(zookeeperHost);
        this.consumer = new Consumer( this.client,
            [ { topic : topicName, partition : partition } ],
            { autoCommit : false }
        );
        this.consumer.on('error', onErrorCallback);
        this.consumer.on('message', onMsgCallback);

        const tmpFunction = (i) => {
            staticData[i].forEach((element) => {
                let obj = { value : JSON.stringify(element) };
                onMsgCallback(obj);
            });
        };
    
        setTimeout(function (){ tmpFunction(0); }, 5000);
        setTimeout(function (){ tmpFunction(1); }, 20000);

        /*let i = 0;
        setInterval(function(){
            if (i == staticData.length)
                i = 0;
            staticData[i].forEach((element) => {
                onMsgCallback(element);
            });

            i++;
        }, 3000);*/
    }
}

module.exports = KafkaConsumer;