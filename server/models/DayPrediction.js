const mongoose = require('mongoose');

const DayPredictionSchema = mongoose.Schema({
	close : Number,
	symbol : String,
    day : Date,
    insertion_date :  { type : Date, default : Date.now }
}, {
    versionKey: false 
});

// save to db
DayPredictionSchema.statics.saveDayPrediction = function(data, callback){
    data.day.setHours(0, 0, 0, 0);
    var prediction = new this(data);
    prediction.save(callback);
};

//Find latest predictions of a symbol between two dates
DayPredictionSchema.statics.findLastByDate = function (sym, day, callback){
    day.setHours(0, 0, 0, 0);
    this.find({"symbol" : sym, "day": day}, 'close day -_id').sort({ "insertion_date": -1 }).limit(1).exec(callback);
}

/* 
//Find latest predictions of a symbol between two dates
DayPredictionSchema.statics.findIntraDates = function (sym, start, end, callback){
   // console.log(start);
    //console.log(end);
    //console.log(sym);
    this.find({"symbol" : sym, "day": {"$gte": start, "$lt": end}}, '-_id').sort({ "day": -1 }).limit(1).exec(callback);
}
*/
//Find all
DayPredictionSchema.statics.findByDate = function (sym, day, callback){
    day.setHours(0, 0, 0, 0);
    console.log('Day : '+day+' Symbol : '+sym);
    this.find({"symbol" : sym, "day": day}, 'close day -_id').exec(callback);
}

module.exports = mongoose.model('DayPrediction', DayPredictionSchema);