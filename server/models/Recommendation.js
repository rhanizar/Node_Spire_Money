const mongoose = require('mongoose');

const RecommendationSchema = mongoose.Schema({
	symbol : String,
	week : Boolean,
    month : Boolean,
    trimestre : Boolean,
    year : Boolean,
    max : Boolean,

}, {
    versionKey: false 
});

// save to db
RecommendationSchema.statics.saveOrUpdateRecommendation = function(data, callback){
  //  options = {upsert: true, new: true, runValidators: true};
  //delete prediction._id;
    this.find({symbol : data.symbol}, (error, result) => {
        if(!error){
            if(result.length > 0){
                data._id = result[0]._id;
                this.update({symbol : data.symbol}, data, callback);
            }
            else{
                data.save(callback);
            }
        }else
            callback(error);
    });
};

//Find all
RecommendationSchema.statics.findBySymbol = function (sym, callback){
     this.find({symbol : sym}, '-_id', callback);
 }

module.exports = mongoose.model('Recommendation', RecommendationSchema);