var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path')
, login = require('./routes/login')
, connectionPool = require('./routes/connectionPool')
, session = require('client-sessions');
var ejs = require('ejs');

var app = express();


connectionPool.createConnectionPool(1000);

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', login.login);
app.get('/ranking',login.ranking);
app.get('/jobsgraph',login.monthwiseJobsData);
app.get('/eventsgraph',login.eventEngageData);
app.get('/signupGraph',login.userSignups);
//app.post('/getWorkerInfo', login.getWorkerInfo);
//app.get('/login', login.login);


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
