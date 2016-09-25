var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var mysql = require('./mysql');

exports.ruleDefinition = function(req,res) {
	ejs.renderFile('./views/ruleDefinition.ejs',function(err, result) {
		if (!err) 
		{
			res.end(result);
		}
		else {
			res.end('An error occurred');
		}
	});
};

exports.getRules = function(req,res)
{
	var json_response;

	var getRules ="select * from ost_rule";

	mysql.fetchData(function(error, results) {

		if(error)
		{
		}
		else
		{	
			console.log(results);
			res.send(results);
		}
	}, getRules);
};

exports.updateRule = function(req,res)
{
	console.log(req.param('activityPoint'));
	var json_response;
	var ruleId = req.param('ruleId');
	var rule = req.param('rule');
	var priority = req.param('priority');
	var activityPoint = req.param('activityPoint');
	var expirationDate = req.param('expirationDate');

	var updateRuleQuery ="UPDATE ost_rule SET rule='"+rule+"',priority='"+priority+"',activity_point="+activityPoint+",expiration_day='"+expirationDate+"' where rule_id='"+ruleId+"'";
	console.log(updateRuleQuery);
	mysql.fetchData(function(error, results) {

		if(error)
		{
			res.send({"statusCode":401});
		}
		else
		{	
			console.log(results);
			res.send({"statusCode":200});
		}
	}, updateRuleQuery);
};

exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/login');
};
