var FormTimer = require('../models/formtimer');

exports.index = function(req, res) {
  if (typeof req.query.url === 'undefined' || typeof req.query.form === 'undefined') {
    res.send({err:'must have url and form params e.g. url=http://mysite.com/somepage&form=myformid'});
  } else if (req.query.stats){
    FormTimer.stats(req.query.url + "#" + req.query.form, function(err, result){
      if (err) {
        res.send(err);
      } else if (result.length === 0) {
        res.send({"_id": req.query.url + "#" + req.query.form, count:0});
      } else {
        res.send(result[0]);
      }
    });
  } else {
    req.query.form = req.query.url + "#" + req.query.form;
    delete req.query.url;
    var query = FormTimer.apiQuery(req.query);
    var response = {};

    query.exec(function (err, results) {
      if (err) res.send({err:err});
      else {
        response.results = results;
        response.meta = {
          perPage: query.options.limit,
          page: (query.options.skip / query.options.limit) + 1
        };

        query.count(function(err, count){
          response.meta.count = count;
          response.meta.totalPages = Math.ceil(count / response.meta.perPage);
          res.send(response);
        });
      }
    });
  }
};

exports.create = function(req, res) {
  var ft = new FormTimer({
    form: req.headers.referer + "#" + req.query.formId,
    duration: req.query.duration,
    ip: req.client.remoteAddress
  });
  ft.save(function(err){
    if (err) {
      console.log("ERROR: " , err);
    }
    res.send({result:'OK'});
  });
};

exports.example = function(req, res) {
  res.render('example');
};

exports.results = function(req, res) {
  var formid = "http://" + req.headers.host + "/example#myformid";
  FormTimer.stats(formid, function(err, result){
    if (err) {
      res.send(err);
    } else if (result.length === 0) {
      res.send({"_id": formid, count:0});
    } else {
      var stats = result[0];
      // stats =
      // { _id: 'http://localhost:3000/example#myformid',
      // avgDuration: 4611.666666666667,
      // minDuration: 4365,
      // maxDuration: 4953,
      // count: 3 }
      FormTimer.find({form:formid}).sort('duration').exec(function(err, entries){

        var maxDurRounded = Math.round(stats.maxDuration/1000);
        var formtimerdata = [];
        var tempHolder = {};

        for (var i=0; i<maxDurRounded + 1; i++) {
          formtimerdata.push([i.toString(), 0]);
        }

        entries.forEach(function(ent){
          formtimerdata[ent.durationRounded.toString()][1]++;
        });

        formtimerdata.unshift(['', 'Seconds to Complete']);
        var renderData = {
          formtimerdata : formtimerdata,
          stats : stats,
          entries : entries
        };
        res.render('example_results', renderData);
      });
    }
  });

};
