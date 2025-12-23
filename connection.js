
let config = {
	user: 'DB_A6478C_autoventa_admin',
	password: 'razors1805',
	server: 'sql5094.site4now.net',
	database: 'DB_A6478C_autoventa',
	pool: {	max: 100,	min: 0,	idleTimeoutMillis: 30000},
	options: {
		encrypt: false, // for azure
		trustServerCertificate: true // change to true for local dev / self-signed certs
	}
};


const sql = require('mssql');

let execute = {
	Query : (res,sqlqry)=>{	
		
		try {
		  const pool1 = new sql.ConnectionPool(config, err => {
			new sql.Request(pool1)
			.query(sqlqry, (err, result) => {
				if(err){
					console.log(err.message);
					res.send('error')
				}else{
					res.send(result);
				}					
			})
			sql.close();  
		  })
		  pool1.on('error', err => {
			  console.log('error sql = ' + err);
			  sql.close();
			  res.send('error');
		  })
		} catch (error) {
			console.log(error);
		  res.send('error')   
		  sql.close();
		}
	}
}



module.exports = execute;

