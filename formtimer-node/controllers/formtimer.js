var FormTimer = require('../models/formtimer');

exports.index = function(req, res) {
  res.redirect('/example');
}

exports.results = function(req, res) {
  if (typeof req.query.url === 'undefined' || typeof req.query.formId === 'undefined') {
    res.send({err:'must have url and form params e.g. url=http://mysite.com/somepage&formId=myformid'});
  } else {
    FormTimer.stats(req.query.formId, req.query.url, function(err, result){
      if (err) {
        res.send(err);
      } else if (result.length === 0) {
        res.send({formId: req.query.formId, count:0});
      } else {
        var stats = result[0];

        FormTimer.find({formId:req.query.formId, url: new RegExp(req.query.url, 'i')}).sort('duration').exec(function(err, entries){

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

  }
};

exports.resultsJson = function(req, res) {
  if (typeof req.query.url === 'undefined' || typeof req.query.formId === 'undefined') {
    res.send({err:'must have url and form params e.g. url=http://mysite.com/somepage&formId=myformid'});
  } else {
    var query = FormTimer.apiQuery(req.query);
    var response = {};

    query.exec(function (err, results) {
      if (err) res.send({err:err});
      else {
        response.results = results;
        response.searchParams = {
          url: req.query.url,
          formId: req.query.formId
        };
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

exports.statsJson = function(req, res) {
  if (typeof req.query.url  === 'undefined' || typeof req.query.formId === 'undefined') {
    res.send({err:'must have url and form params e.g. url=http://mysite.com/somepage&formId=myformid'});
  }

  FormTimer.stats(req.query.formId, req.query.url, function(err, result){
    console.log(err)
    if (err) {
      res.send(err);
    } else if (result.length === 0) {
      res.send({"formId": req.query.formId, "url": req.query.url, count:0});
    } else {
      res.send(result[0]);
    }
  });

}

exports.create = function(req, res) {
  var ft = new FormTimer({
    url: req.headers.referer,
    formId: req.query.formId,
    duration: req.query.duration,
    ip: req.ip
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
