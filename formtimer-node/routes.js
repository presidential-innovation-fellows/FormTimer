exports.init = function(app){
  app.get('/results', require('./controllers/formtimer').results);
  app.get('/results.json', require('./controllers/formtimer').resultsJson);
  app.get('/stats.json', require('./controllers/formtimer').statsJson);
  app.get('/create', require('./controllers/formtimer').create);
  app.get('/example', require('./controllers/formtimer').example);
};