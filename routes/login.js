var ejs = require('ejs');
var mysql = require('./mysql');
var requestGen = require('./commons/responseGenerator');
var _ = require('underscore');

exports.analytics = function(req,res) {
	ejs.renderFile('./views/Dashboard.ejs',function(err, result) {
		if (!err)
		{
			res.end(result);
		}
		else {
			res.end('An error occurred');
		}
	});
};

exports.eventEngageData = function (req,res) {
	//var month_no, month_jobs;
	var query1,query2,query3;
	query1 = "select count(*) as events, month(Now()) as month from eventhistory where month(Now()) = month(eventDate);";
	query2 = "select count(*) as events, month(now())-1 as month from eventhistory where month(eventDate) = month(Now())-1";
  query3 = "select count(*) as events, month(Now())-2 as month from eventhistory where month(eventDate) = month(Now())-2 ";
	var monthwise_data;
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
							console.log(data1);
							console.log(data2);
							console.log(data3);
							monthwise_data = data1.concat(data2,data3);
							reverseSortByKey(monthwise_data,"month");
							console.log(monthwise_data);
							res.send(requestGen.responseGenerator(200,monthwise_data));
            }
        	});
    		}
  		});
		}
	});
}



exports.userSignups = function (req,res) {
	//var month_no, month_jobs;
	var query1,query2,query3;
	query1 = "select count(*) as registrations, month(Now()) as month from worker where month(Now()) = month(workerStartDate);";
	query2 = "select count(*) as registrations,month(now())-1 as month from worker where month(workerStartDate) = month(Now())-1;";
  query3 = "select count(*) as registrations,month(now())-2 as month from worker where month(workerStartDate) = month(Now())-2;";
	var monthwise_data;
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
							console.log(data1);
							console.log(data2);
							console.log(data3);
							monthwise_data = data1.concat(data2,data3);
							reverseSortByKey(monthwise_data,"month");
							console.log(monthwise_data);
							res.send(requestGen.responseGenerator(200,monthwise_data));
            }
        	});
    		}
  		});
		}
	});
}
exports.monthwiseJobsData = function (req,res) {
	//var month_no, month_jobs;
	var query1,query2,query3;
	console.log("hello");
	query1 = "select count(*) as jobs, month(Now()) as month from job_history where month(Now()) = month(job_start_dateTime)";
	query2 = "select count(*) as jobs, month(now())-1 as month from job_history where month(job_start_dateTime) = month(Now())-1 ";
  query3 = "select count(*) as jobs, month(now())-2 as month from job_history where month(job_start_dateTime) = month(Now())-2 ";
	var monthwise_data;
	mysql.fetchData1(query1,function(err,data1){
    if(err){
			console.log(err);
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
							console.log(data1);
							console.log(data2);
							console.log(data3);
							monthwise_data = data1.concat(data2,data3);
							reverseSortByKey(monthwise_data,"month");
							console.log(monthwise_data);
							res.send(requestGen.responseGenerator(200,monthwise_data));
            }
        	});
    		}
  		});
		}
	});
}

function reverseSortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? 1 : ((x < y) ? -1 : 0));
    });
}
