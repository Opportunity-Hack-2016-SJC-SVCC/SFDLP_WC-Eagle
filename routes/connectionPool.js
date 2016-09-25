var mysql = require('mysql');
var listOfConnections = require("collections/list")
var connectionPool;

function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'neel',
	    database : 'sjlabor',
	    port	 : 3306
	});
	return connection;
}

exports.createConnectionPool = function(noOfConnections){
	connectionPool = new listOfConnections();
	for(var i=0;i<noOfConnections;i++){
		connectionPool.push(getConnection());
	}
};

exports.getConnectionFromConnectionPool = function (){

	if(connectionPool.length == 0){
		return getConnection();
	}else{
		return connectionPool.pop();
	}
};

exports.releaseConnection = function(connection){
	connectionPool.push(connection);
}
