var mongoose = require('mongoose');

var formtimerschema = new mongoose.Schema({
  url: String,
  formId: String,
  duration: Number,
  ip: String,
  created: { type: Date, default: Date.now }
});

formtimerschema.index({url: 1, formId: 1});

formtimerschema.plugin(require('mongoose-api-query'));

formtimerschema.statics.stats = function(formId, url, cb){
  this.collection.aggregate(
    { $match : {
        formId : formId,
        url  : url
      }
    },
    { $project : {
        formId : 1,
        duration : 1
      }
    },
    { $group : {
        _id : "$formId",
        avgDuration : { $avg : "$duration" },
        minDuration : { $min : "$duration" },
        maxDuration : { $max : "$duration" },
        count : { $sum: 1}
      }
    }, cb);
};

formtimerschema.virtual('durationRounded').get(function () {
  return Math.round(this.duration/1000);
});

module.exports = DB.model('FormTimer', formtimerschema);