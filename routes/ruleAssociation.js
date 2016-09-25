var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var mysql = require('./mysql');

exports.ruleAssociation = function(req,res) {
	ejs.renderFile('./views/ruleAssociation.ejs',function(err, result) {
		if (!err) 
		{
			res.end(result);
		}
		else {
			res.end('An error occurred');
		}
	});
};

exports.getRuleAssociation = function(req,res)
{
	var json_response;
    var groupId = req.param('groupId');
	var getRuleAssociation ="select ost_rule.rule_id,ost_rule.rule,ost_rule.priority,ost_rule.activity_point,ost_rule.expiration_day,ost_rule_association.rule_association_id,ost_rule_association.group_id,ost_rule_association.is_applicable from ost_rule left join ost_rule_association on ost_rule.rule_id = ost_rule_association.rule_id and ost_rule_association.group_id ="+groupId +"";

	mysql.fetchData(function(error, results) {

		if(error)
		{
		}
		else
		{	
			console.log(results);
			res.send(results);
		}
	}, getRuleAssociation);
};

exports.getGroups = function(req,res)
{
	var json_response;

	var getRuleAssociation ="select * from ost_groups";

	mysql.fetchData(function(error, results) {

		if(error)
		{
		}
		else
		{	
			console.log(results);
			res.send(results);
		}
	}, getRuleAssociation);
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

exports.updateRuleAssociation = function(req,res)
{
	var json_response;
	var ruleAssociationId = req.param('ruleAssociationId');
	var isApplicable = req.param('isApplicable');

	var updateRuleQuery ="UPDATE ost_rule_association SET is_applicable="+isApplicable+" where rule_association_id='"+ruleAssociationId+"'";
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

exports.insertRuleAssociation = function(req,res)
{
	var json_response;
	var ruleId = req.param('ruleId');
	var groupId = req.param('groupId');
	var isApplicable = req.param('isApplicable');

	var insertRuleQuery ="insert into ost_rule_association values(null,"+ruleId+","+groupId+","+isApplicable+")";
	console.log(insertRuleQuery);
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
	}, insertRuleQuery);
};

exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/login');
};
