const kafka = require('kafka-node');
const Consumer = kafka.Consumer;


const staticData = 
[{
    symbol : "AAPL",
    data : {
        quote : { open : 1, high : 2, low : 3, close : 4 },
        news : [{ url : 'url 1', title : 'title 1', "description": "desc 1"}],
        time : '2018-02-27 16:00:00'
    },
},
{
    symbol : "AAPL",
    data : {
        quote : { open : 5, high : 6, low : 7, close : 8 },
        news : [{ url : 'url 2', title : 'title 2', "description": "desc 2"}],
        time : '2018-02-27 16:01:00'
    },
},
{
    symbol : "AAPL",
    data : {
        quote : { open : 9, high : 10, low : 11, close : 12 },
        news : [{ url : 'url 3', title : 'title 3', "description": "desc 3"}],
        time : '2018-02-27 16:02:00'
    },
},
{
    symbol : "AAPL",
    data : {
        quote : { open :   13, high : 14, low : 15, close : 16 },
        news : [{ url : 'url 4', title : 'title 4', "description": "desc 4"}],
        time : '2018-02-27 16:03:00'
    },
}
]



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
        let i = 0;
        setInterval(function(){
            if (i == staticData.length)
                i = 0;
            onMsgCallback(staticData[i]);
            i++;
        }, 3000);
    }
}

module.exports = KafkaConsumer;