var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var mysql = require('./mysql');
var requestGen = require('./commons/responseGenerator');

exports.menRanking = function(req,res) {
	ejs.renderFile('./views/menRanking.ejs',function(err, result) {
		if (!err) 
		{
			res.end(result);
		}
		else {
			res.end('An error occurred');
		}
	});
};

exports.womenRanking = function(req,res) {
	ejs.renderFile('./views/womenRanking.ejs',function(err, result) {
		if (!err) 
		{
			res.end(result);
		}
		else {
			res.end('An error occurred');
		}
	});
};

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}

exports.getMenRankings = function (req,res) {
	var skill_id = 4, duration_time = 8, gender="male",checkin_duration = 2;
	
	var data1_sortedby_key, data3_sortedby_key;
	var query1 = "SELECT DISTINCT jh.worker_Id, x.workerId, x.workerName, SUM(x.pts) AS total_pts FROM (SELECT wo.workerId, wo.workerName, e.pts, e.high_priority from worker as wo LEFT JOIN eventhistory AS eh ON eh.workerId = wo.workerId LEFT JOIN event AS e ON eh.eventId = e.eventId LEFT JOIN workerskill AS ws ON ws.workerId = wo.workerId LEFT JOIN (SELECT workerId, COUNT(workerId) as absent_count FROM worker_absent group by workerId) as ab ON ab.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId from checkin where workerDate > DATE_SUB(NOW(), INTERVAL "+checkin_duration+1+" day)) AS ch ON ch.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId FROM monthly_due where Month(NOW()) <= Month(for_month)) AS mo ON mo.workerId = wo.workerId WHERE ws.skillId = "+skill_id+"  AND eh.eventDate > date_sub(NOW(), INTERVAL "+duration_time+" DAY) AND wo.workerGender = '"+gender+"' AND ch.workerId IS NOT NULL AND (ab.absent_count < 4 OR ab.absent_count IS null)) AS x LEFT JOIN job_history AS jh ON x.workerId = jh.worker_Id WHERE job_start_dateTime > DATE_SUB(NOW(), INTERVAL "+duration_time+" DAY) group by x.workerId ORDER BY total_pts";
	var query2="SELECT DISTINCT jh.worker_Id, x.workerId, x.workerName, x.high_priority FROM (SELECT wo.workerId, wo.workerName, e.pts, e.high_priority from worker as wo LEFT JOIN eventhistory AS eh ON eh.workerId = wo.workerId LEFT JOIN event AS e ON eh.eventId = e.eventId LEFT JOIN workerskill AS ws ON ws.workerId = wo.workerId LEFT JOIN (SELECT workerId, COUNT(workerId) as absent_count FROM worker_absent group by workerId) as ab ON ab.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId from checkin where workerDate > DATE_SUB(NOW(), INTERVAL "+checkin_duration+1+" day)) AS ch ON ch.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId FROM monthly_due where Month(NOW()) <= Month(for_month)) AS mo ON mo.workerId = wo.workerId WHERE ws.skillId = "+skill_id+"  AND eh.eventDate > date_sub(NOW(), INTERVAL "+duration_time+" DAY) AND wo.workerGender = '"+gender+"' AND ch.workerId IS NOT NULL AND (ab.absent_count < 4 OR ab.absent_count IS null)) AS x LEFT JOIN job_history AS jh ON x.workerId = jh.worker_Id WHERE job_start_dateTime > DATE_SUB(NOW(), INTERVAL "+duration_time+" DAY) and x.high_priority = 1";
	var query3="SELECT DISTINCT jh.worker_Id, x.workerId, x.workerName, SUM(x.pts) AS total_pts FROM (SELECT wo.workerId, wo.workerName, e.pts, e.high_priority from worker as wo LEFT JOIN eventhistory AS eh ON eh.workerId = wo.workerId LEFT JOIN event AS e ON eh.eventId = e.eventId LEFT JOIN workerskill AS ws ON ws.workerId = wo.workerId LEFT JOIN (SELECT workerId, COUNT(workerId) as absent_count FROM worker_absent group by workerId) as ab ON ab.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId from checkin where workerDate > DATE_SUB(NOW(), INTERVAL "+checkin_duration+1+" day)) AS ch ON ch.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId FROM monthly_due where Month(NOW()) <= Month(for_month)) AS mo ON mo.workerId = wo.workerId WHERE ws.skillId = "+skill_id+"  AND eh.eventDate > date_sub(NOW(), INTERVAL "+duration_time+" DAY) AND wo.workerGender = '"+gender+"' AND ch.workerId IS NOT NULL AND (ab.absent_count < 4 OR ab.absent_count IS null)) AS x LEFT JOIN job_history AS jh ON x.workerId = jh.worker_Id WHERE job_start_dateTime < DATE_SUB(NOW(), INTERVAL "+duration_time+" DAY) group by x.workerId ORDER BY total_pts";
	var query4="SELECT DISTINCT distinct jh.worker_Id, x.workerId, x.workerName, x.high_priority FROM (SELECT wo.workerId, wo.workerName, e.pts, e.high_priority from worker as wo LEFT JOIN eventhistory AS eh ON eh.workerId = wo.workerId LEFT JOIN event AS e ON eh.eventId = e.eventId LEFT JOIN workerskill AS ws ON ws.workerId = wo.workerId LEFT JOIN (SELECT workerId, COUNT(workerId) as absent_count FROM worker_absent group by workerId) as ab ON ab.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId from checkin where workerDate > DATE_SUB(NOW(), INTERVAL "+checkin_duration+1+" day)) AS ch ON ch.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId FROM monthly_due where Month(NOW()) <= Month(for_month)) AS mo ON mo.workerId = wo.workerId WHERE ws.skillId = "+skill_id+"  AND eh.eventDate > date_sub(NOW(), INTERVAL "+duration_time+" DAY) AND wo.workerGender = '"+gender+"' AND ch.workerId IS NOT NULL AND (ab.absent_count < 4 OR ab.absent_count IS null)) AS x LEFT JOIN job_history AS jh ON x.workerId = jh.worker_Id WHERE job_start_dateTime < DATE_SUB(NOW(), INTERVAL "+duration_time+" DAY) and x.high_priority = 1";

	mysql.fetchData1(query1,function(err,data1){
		if(err){
			res.send(requestGen.responseGenerator(401,null));
		}
		else {
			mysql.fetchData1(query2,function(err,data2){
				if(err){
					res.send(requestGen.responseGenerator(401,null));
				}
				else {
					mysql.fetchData1(query3,function(err,data3){
						if(err){
							res.send(requestGen.responseGenerator(401,null));
						}
						else {
							mysql.fetchData1(query4,function(err,data4){
								if(err){
									res.send(requestGen.responseGenerator(401,null));
								}
								else {
									console.log(data1);
									console.log(data2);
									console.log(data3);
									console.log(data4);
									//console.log(data1_sortedby_key);
									//console.log(data3_sortedby_key);
									for(var i=0; i<data4.length;i++){
										for(var j=0;j<data3.length;j++){
											if(data4[i].workerId == data3[j].workerId){
													data4[i].total_pts = data3[j].total_pts;
													delete data3[j];
													break;
											}
										}
									}
									for(var i=0; i<data2.length;i++){
										for(var j=0;j<data1.length;j++){
											if(data2[i].workerId == data1[j].workerId){
													data2[i].total_pts = data1[j].total_pts;
													delete data1[j];
													break;
											}
										}
									}
									var final = sortByKey(data4,"total_pts").concat(sortByKey(data2,"total_pts"),sortByKey(data3,"total_pts"),sortByKey(data1,"total_pts"));
									//console.log(final);
									console.log(final);
									var result = filterRecords(final);
									res.send(requestGen.responseGenerator(200,result));
								}
							});
						}
					});
				}
			});
		}
	});
};

function filterRecords(data)
{
	var lookup = {};
	var items = data;
	var result = [];

	for (var item, i = 0; item = items[i++];) {
	  var workerId = item.workerId;

	  if (!(workerId in lookup)) {
	    lookup[workerId] = 1;
	    result.push(item);
	  }
	}
	return result;
}

exports.getWomenRankings = function (req,res) {
	var skill_id = 4, duration_time = 8, gender="female",checkin_duration = 15;
	
	var data1_sortedby_key, data3_sortedby_key;
	var query1 = "SELECT DISTINCT jh.worker_Id, x.workerId, x.workerName, SUM(x.pts) AS total_pts FROM (SELECT wo.workerId, wo.workerName, e.pts, e.high_priority from worker as wo LEFT JOIN eventhistory AS eh ON eh.workerId = wo.workerId LEFT JOIN event AS e ON eh.eventId = e.eventId LEFT JOIN workerskill AS ws ON ws.workerId = wo.workerId LEFT JOIN (SELECT workerId, COUNT(workerId) as absent_count FROM worker_absent group by workerId) as ab ON ab.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId from checkin where workerDate > DATE_SUB(NOW(), INTERVAL "+checkin_duration+1+" day)) AS ch ON ch.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId FROM monthly_due where Month(NOW()) <= Month(for_month)) AS mo ON mo.workerId = wo.workerId WHERE ws.skillId = "+skill_id+"  AND eh.eventDate > date_sub(NOW(), INTERVAL "+duration_time+" DAY) AND wo.workerGender = '"+gender+"' AND ch.workerId IS NOT NULL AND (ab.absent_count < 4 OR ab.absent_count IS null)) AS x LEFT JOIN job_history AS jh ON x.workerId = jh.worker_Id WHERE job_start_dateTime > DATE_SUB(NOW(), INTERVAL "+duration_time+" DAY) group by x.workerId ORDER BY total_pts";
	var query2="SELECT DISTINCT jh.worker_Id, x.workerId, x.workerName, x.high_priority FROM (SELECT wo.workerId, wo.workerName, e.pts, e.high_priority from worker as wo LEFT JOIN eventhistory AS eh ON eh.workerId = wo.workerId LEFT JOIN event AS e ON eh.eventId = e.eventId LEFT JOIN workerskill AS ws ON ws.workerId = wo.workerId LEFT JOIN (SELECT workerId, COUNT(workerId) as absent_count FROM worker_absent group by workerId) as ab ON ab.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId from checkin where workerDate > DATE_SUB(NOW(), INTERVAL "+checkin_duration+1+" day)) AS ch ON ch.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId FROM monthly_due where Month(NOW()) <= Month(for_month)) AS mo ON mo.workerId = wo.workerId WHERE ws.skillId = "+skill_id+"  AND eh.eventDate > date_sub(NOW(), INTERVAL "+duration_time+" DAY) AND wo.workerGender = '"+gender+"' AND ch.workerId IS NOT NULL AND (ab.absent_count < 4 OR ab.absent_count IS null)) AS x LEFT JOIN job_history AS jh ON x.workerId = jh.worker_Id WHERE job_start_dateTime > DATE_SUB(NOW(), INTERVAL "+duration_time+" DAY) and x.high_priority = 1";
	var query3="SELECT DISTINCT jh.worker_Id, x.workerId, x.workerName, SUM(x.pts) AS total_pts FROM (SELECT wo.workerId, wo.workerName, e.pts, e.high_priority from worker as wo LEFT JOIN eventhistory AS eh ON eh.workerId = wo.workerId LEFT JOIN event AS e ON eh.eventId = e.eventId LEFT JOIN workerskill AS ws ON ws.workerId = wo.workerId LEFT JOIN (SELECT workerId, COUNT(workerId) as absent_count FROM worker_absent group by workerId) as ab ON ab.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId from checkin where workerDate > DATE_SUB(NOW(), INTERVAL "+checkin_duration+1+" day)) AS ch ON ch.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId FROM monthly_due where Month(NOW()) <= Month(for_month)) AS mo ON mo.workerId = wo.workerId WHERE ws.skillId = "+skill_id+"  AND eh.eventDate > date_sub(NOW(), INTERVAL "+duration_time+" DAY) AND wo.workerGender = '"+gender+"' AND ch.workerId IS NOT NULL AND (ab.absent_count < 4 OR ab.absent_count IS null)) AS x LEFT JOIN job_history AS jh ON x.workerId = jh.worker_Id WHERE job_start_dateTime < DATE_SUB(NOW(), INTERVAL "+duration_time+" DAY) group by x.workerId ORDER BY total_pts";
	var query4="SELECT DISTINCT distinct jh.worker_Id, x.workerId, x.workerName, x.high_priority FROM (SELECT wo.workerId, wo.workerName, e.pts, e.high_priority from worker as wo LEFT JOIN eventhistory AS eh ON eh.workerId = wo.workerId LEFT JOIN event AS e ON eh.eventId = e.eventId LEFT JOIN workerskill AS ws ON ws.workerId = wo.workerId LEFT JOIN (SELECT workerId, COUNT(workerId) as absent_count FROM worker_absent group by workerId) as ab ON ab.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId from checkin where workerDate > DATE_SUB(NOW(), INTERVAL "+checkin_duration+1+" day)) AS ch ON ch.workerId = wo.workerId LEFT JOIN (SELECT DISTINCT workerId FROM monthly_due where Month(NOW()) <= Month(for_month)) AS mo ON mo.workerId = wo.workerId WHERE ws.skillId = "+skill_id+"  AND eh.eventDate > date_sub(NOW(), INTERVAL "+duration_time+" DAY) AND wo.workerGender = '"+gender+"' AND ch.workerId IS NOT NULL AND (ab.absent_count < 4 OR ab.absent_count IS null)) AS x LEFT JOIN job_history AS jh ON x.workerId = jh.worker_Id WHERE job_start_dateTime < DATE_SUB(NOW(), INTERVAL "+duration_time+" DAY) and x.high_priority = 1";

	mysql.fetchData1(query1,function(err,data1){
		if(err){
			res.send(requestGen.responseGenerator(401,null));
		}
		else {
			mysql.fetchData1(query2,function(err,data2){
				if(err){
					res.send(requestGen.responseGenerator(401,null));
				}
				else {
					mysql.fetchData1(query3,function(err,data3){
						if(err){
							res.send(requestGen.responseGenerator(401,null));
						}
						else {
							mysql.fetchData1(query4,function(err,data4){
								if(err){
									res.send(requestGen.responseGenerator(401,null));
								}
								else {
									console.log("1"+JSON.stringify(data1));
									console.log("2"+JSON.stringify(data2));
									console.log("3"+JSON.stringify(data3));
									console.log("4"+JSON.stringify(data4));
									//console.log(data1_sortedby_key);
									//console.log(data3_sortedby_key);
									for(var i=0; i<data4.length;i++){
										for(var j=0;j<data3.length;j++){
											if(data4[i].workerId == data3[j].workerId){
													data4[i].total_pts = data3[j].total_pts;
													delete data3[j];
													break;
											}
										}
									}
									for(var i=0; i<data2.length;i++){
										for(var j=0;j<data1.length;j++){
											if(data2[i].workerId == data1[j].workerId){
													data2[i].total_pts = data1[j].total_pts;
													delete data1[j];
													break;
											}
										}
									}
									
									var final = sortByKey(data4,"total_pts").concat(sortByKey(data2,"total_pts"),sortByKey(data3,"total_pts"),sortByKey(data1,"total_pts"));
									//console.log(final);
									console.log(final);
									var result = filterRecords(final);
									
									res.send(requestGen.responseGenerator(200,result));
								}
							});
						}
					});
				}
			});
		}
	});
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
