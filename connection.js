
let config = {
	user: 'db_a6478c_cixsa_admin',
	password: 'razors1805',
	server: 'sql8004.site4now.net',
	database: 'db_a6478c_cixsa',
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
	},
	query_local : (sqlqry)=>{	
		
		return new Promise((resolve,reject)=>{

			try {
				const pool1 = new sql.ConnectionPool(config, err => {
					new sql.Request(pool1)
					.query(sqlqry, (err, result) => {
						if(err){
							reject();
						}else{
							resolve(result);
						}					
					})
					sql.close();  
				})
				pool1.on('error', err => {
					console.log('error sql = ' + err);
					sql.close();
					reject();
				})
				} catch (error) {
					console.log(error);
					reject();   
				sql.close();
				}
				
		})

		
	}
}



module.exports = execute;

