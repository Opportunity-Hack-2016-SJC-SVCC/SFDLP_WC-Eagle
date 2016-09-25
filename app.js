
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path')
, ruleDefinition = require('./routes/ruleDefinition')
, ruleAssociation = require('./routes/ruleAssociation')
, ranking = require('./routes/ranking')
, connectionPool = require('./routes/connectionPool')
, session = require('client-sessions');
var ejs = require('ejs');

var app = express();

app.use(session({   	  
	cookieName: 'session',    
	secret: 'twitter_010700430',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  
}));

connectionPool.createConnectionPool(1000);

//all environments
app.set('port', process.env.PORT || 5000);
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

app.get('/', ruleDefinition.ruleDefinition);
app.get('/ruleDefinition', ruleDefinition.ruleDefinition);
app.post('/getRules',ruleDefinition.getRules);
app.get('/menRanking',ranking.menRanking);
app.get('/womenRanking',ranking.womenRanking);


app.get('/ruleAssociation', ruleAssociation.ruleAssociation);
app.post('/getRuleAssociation', ruleAssociation.getRuleAssociation);
//app.post('/getRuleAssociation', ruleDefinition.getRules);
app.post('/updateRule',ruleDefinition.updateRule);
app.post('/updateRuleAssociation',ruleAssociation.updateRuleAssociation);
app.post('/insertRuleAssociation',ruleAssociation.insertRuleAssociation);
app.post('/getGroups',ruleAssociation.getGroups);
app.get('/getMenRankings',ranking.getMenRankings);
app.get('/getWomenRankings',ranking.getWomenRankings);



http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});


