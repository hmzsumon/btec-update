const mysql = require('mysql');

const mysqlDB = mysql.createConnection({
	host: '8.222.250.119',
	user: 'app',
	password: '4jtbkfWLTYJyZZ7c',
	database: 'app',
	port: 3306,
});

mysqlDB.connect((err) => {
	if (err) {
		console.log(err);
		return;
	} else {
		console.log('MySql DB is connected');
	}
});

module.exports = mysqlDB;
