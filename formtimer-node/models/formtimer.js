var mongoose = require('mongoose');

var formtimerschema = new mongoose.Schema({
  form: { type: String, index: true },
  duration: Number,
  ip: String,
  created: { type: Date, default: Date.now }
});

formtimerschema.plugin(require('mongoose-api-query'));

formtimerschema.statics.stats = function(form, cb){
  this.collection.aggregate(
    { $match : {
        form : form
      }
    },
    { $project : {
        form : 1,
        duration : 1
      }
    },
    { $group : {
        _id : "$form",
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