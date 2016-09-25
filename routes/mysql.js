var ejs= require('ejs');
var mysql = require('mysql');
var connectionPool = require('./connectionPool');

function fetchData(callback,sqlQuery){
	var connection=connectionPool.getConnectionFromConnectionPool();	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		callback(err, rows);		
	});
	connectionPool.releaseConnection(connection);
}	


function fetchData1(sqlQuery,callback){
	var connection=connectionPool.getConnectionFromConnectionPool();	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		callback(err, rows);		
	});
	connectionPool.releaseConnection(connection);
}	

exports.fetchData=fetchData;
exports.fetchData1=fetchData1;