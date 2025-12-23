
var express = require("express");
var axios = require('axios');
var app = express();

var execute = require('./connection.js');

var router = express.Router();
var bodyParser = require('body-parser');


var router_api = require('./router_api.js');

var http = require('http').Server(app);
//var io = require('socket.io')(http);
var io = require('socket.io')(http, { cors: { origin: '*' } });


const cors = require('cors');
const { exec } = require("child_process");
app.use(cors({
    origin: '*'
}));


const PORT = process.env.PORT || 2026;

//app.use(bodyParser.json());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));




app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
  
  next();
});




app.get("/",function(req,res){
  
	res.sendFile(path + 'index.html');
  
}); 


app.post('/sync_granjas', function(req,res){

        
                let data = {
                    company_id:"1"
                }
                axios.post('http://45.79.221.207:8069/sicap/granjas', data, 
                    {headers:{ 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55X2lkIjoxMCwiZXhwIjoxNzM5MDMxNzU0fQ.0PXa6ri5qO2my3nEya6uTm48gex-nINqCt2aHsgxVog',
                        'Content-Type': 'application/json',
                        'Accept':'application/json'
                    }})
                .then((response) => {
                   //console.log(response);
                   

                    if(response.status.toString()=='200'){
                        
                        let data = response.data;     
                        
                        let qry = '';
                        data.map((r)=>{
                            qry += `
                            INSERT INTO GRANJAS 
                                (GRANJA_ID,CODIGO,NAME,STATE)
                                VALUES
                                (${r.id},'${r.codigo}','${r.name}','${r.state}');
                            `
                        })

                        
                        execute.query_local('TRUNCATE TABLE GRANJAS')
                        .then(()=>{

                                execute.query_local(qry)
                                .then(()=>{
                                    res.send(data)
                                })
                                .catch(()=>{
                                    res.send('error');
                                })
                            
                        })
                        .catch(()=>{
                            res.send('error');
                        })

                       

                        //resolve();
                    }else{
                        //reject();
                        res.send('error')
                    }                   
                }, (error) => {
                    //reject();
                    res.send('error')
                });
           
});
app.post('/sync_galeras', function(req,res){

   
                let data = {
                    company_id:"1"
                }
                axios.post('http://45.79.221.207:8069/sicap/galeras', data, 
                    {headers:{ 
                      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55X2lkIjoxMCwiZXhwIjoxNzM5MDMxNzU0fQ.0PXa6ri5qO2my3nEya6uTm48gex-nINqCt2aHsgxVog',
                      'Content-Type': 'application/json',
                      'Accept':'application/json'
                    }})
                 .then((response) => {
                   
               

                    if(response.status.toString()=='200'){
                        
                        let data = response.data;     
                      

                        let qry = '';
                        data.map((r)=>{
                            qry += `
                            INSERT INTO GALERAS 
                                (GALERA_ID,GRANJA,GRANJA_ID,granja_desc,codigo,name,state)
                                VALUES
                                (${r.id},'${r.granja}',${r.granja_id}, '${r.granja_desc}','${r.codigo}','${r.name}','${r.state}');
                            `
                        })

                   
                        
                        execute.query_local('TRUNCATE TABLE GALERAS')
                        .then(()=>{

                                execute.query_local(qry)
                                .then(()=>{
                                    res.send(data)
                                })
                                .catch(()=>{
                                    res.send('error');
                                })
                            
                        })
                        .catch(()=>{
                            res.send('error');
                        })

                       

                        //resolve();
                    }else{
                        //reject();
                        res.send('error')
                    }                   
                }, (error) => {
                    //reject();
                    res.send('error')
                });
})



app.get("/login",function(req,res){
  res.redirect('/');
}); 








app.use('/api', router_api);

app.use("/",router);



app.use("*",function(req,res){
  res.redirect('/');
  //res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
});



http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

