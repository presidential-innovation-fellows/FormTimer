exports.init = function(app){
  app.get('/', require('./controllers/formtimer').index);
  app.get('/create', require('./controllers/formtimer').create);
  app.get('/example', require('./controllers/formtimer').example);
  app.get('/example/results', require('./controllers/formtimer').results);
};