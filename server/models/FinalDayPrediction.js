const mongoose = require('mongoose');

const FinalDayPredictionSchema = mongoose.Schema({
	close : Number,
	symbol : String, 
	day : Date
}, {
    versionKey: false 
});

// save to db
FinalDayPredictionSchema.statics.saveFinalDayPrediction = function(data, callback){
    data.day.setHours(0, 0, 0, 0);
    var prediction = new this(data);
    prediction.save(callback);
};

//Find prediction of a specific date & symbolPredictionPerDayHystories
FinalDayPredictionSchema.statics.findByDate = function (sym, day, callback){
    day.setHours(0, 0, 0, 0);
    this.findOne({"symbol" : sym, "day": day}, 'close day -_id').exec( (err, prediction) => {
        if(!err){
            //console.log(prediction);
            const Quotes = require("../models/QuotePerDay");
            Quotes.findOne({"minute" : day, "symbol" : sym}, 'close -_id').exec((er, quote) => {
                if(!er){
                    if (!quote || !prediction) callback ({"error": "Not Found!"})
                    else
                        callback([{
                            "reality" : quote.close,
                            "prediction" : prediction.close,
                            "time" : day,
                        }]);
                }else callback(er);
            });
        }else callback(err);
    });
}

/*
//Find prediction of a specific date & symbolPredictionPerDayHystories
FinalDayPredictionSchema.statics.findByDate = function (sym, start, end, callback){
    this.find({"symbol" : sym, "day": {"$gte": start, "$lt": end}}, '-_id', callback);
}
*/


module.exports = mongoose.model('FinalDayPrediction', FinalDayPredictionSchema);