// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/admin', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/main.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);

app.get('/api/foods', controllers.foods.index);
app.get('/api/activities', controllers.activities.index);

app.get('/api/foods/:foodId', controllers.foods.show);
app.get('/api/activities/:activityId', controllers.activities.show);

app.post('/api/foods', controllers.foods.create);
app.post('/api/activities', controllers.activities.create);

app.delete('/api/foods/:foodId', controllers.foods.destroy);
app.delete('/api/activities/:activityId', controllers.activities.destroy);

app.put('/api/foods/:foodId', controllers.foods.update);
app.put('/api/activities/:activityId', controllers.activities.update);

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
