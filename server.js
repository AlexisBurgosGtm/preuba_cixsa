
var express = require("express");
var axios = require('axios');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');


const execute = require('./connection');


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



app.get("/login",function(req,res){
  res.redirect('/');
}); 

app.post("/rpt_ventas_fechas",function(req,res){

  const {anio,mes} = req.body;

  let qry = `
    SELECT POS_ORDERS.FECHA, POS_EMPLEADOS.NOMBRE AS NOMEMP, SUM(POS_ORDERS.TOTALCOSTO) AS COSTO, SUM(POS_ORDERS.TOTALPRECIO) AS IMPORTE, POS_EMPLEADOS.RUTA
      FROM     POS_ORDERS LEFT OUTER JOIN
                        POS_EMPLEADOS ON POS_ORDERS.CODEMP = POS_EMPLEADOS.CODEMP
      WHERE  (YEAR(POS_ORDERS.FECHA) = ${anio}) AND (MONTH(POS_ORDERS.FECHA) = ${mes})
      GROUP BY POS_ORDERS.FECHA, POS_EMPLEADOS.NOMBRE, POS_EMPLEADOS.RUTA
      ORDER BY POS_ORDERS.FECHA DESC, POS_EMPLEADOS.NOMBRE;
    `


  execute.Query(res,qry)

}); 

app.post("/rpt_ventas_vendedores",function(req,res){

  const {anio,mes} = req.body;

  let qry = `
    SELECT isnull(POS_EMPLEADOS.NOMBRE,'SN') AS NOMEMP, 
        SUM(POS_ORDERS.TOTALCOSTO) AS COSTO, 
        SUM(POS_ORDERS.TOTALPRECIO) AS IMPORTE, 
        ISNULL(POS_EMPLEADOS.RUTA,'SN') AS RUTA
      FROM  POS_ORDERS LEFT OUTER JOIN
            POS_EMPLEADOS ON POS_ORDERS.CODEMP = POS_EMPLEADOS.CODEMP
      WHERE  (YEAR(POS_ORDERS.FECHA) = ${anio}) AND (MONTH(POS_ORDERS.FECHA) = ${mes})
      GROUP BY POS_EMPLEADOS.NOMBRE, POS_EMPLEADOS.RUTA
      ORDER BY POS_EMPLEADOS.NOMBRE;
    `


  execute.Query(res,qry)

}); 

app.post("/rpt_ventas_productos",function(req,res){

  const {anio,mes} = req.body;

  let qry = `
  SELECT POS_ORDERS.CODPROD, POS_PRODUCTOS.DESPROD, SUM(POS_ORDERS.CANTIDAD) AS TOTALUNIDADES, SUM(POS_ORDERS.TOTALCOSTO) AS COSTO, SUM(POS_ORDERS.TOTALPRECIO) AS IMPORTE
FROM     POS_ORDERS LEFT OUTER JOIN
                  POS_PRODUCTOS ON POS_ORDERS.CODPROD = POS_PRODUCTOS.CODPROD
WHERE  (YEAR(POS_ORDERS.FECHA) = ${anio}) AND (MONTH(POS_ORDERS.FECHA) = ${mes})
GROUP BY POS_ORDERS.CODPROD, POS_PRODUCTOS.DESPROD;`


  execute.Query(res,qry)

}); 

app.post("/rpt_ventas_clientes",function(req,res){

  const {anio,mes} = req.body;

  let qry = `
    SELECT 
        POS_ORDERS.CODCLIE, 
        POS_CLIENTES.TIPO, 
        POS_CLIENTES.NOMBRE AS NOMCLIE, POS_CLIENTES.DIRECCION, 
        POS_CLIENTES.TELEFONO, 
        ISNULL(POS_CLIENTES.LATITUD,0) AS LATITUD, 
        ISNULL(POS_CLIENTES.LONGITUD,0) LONGITUD, 
        POS_CLIENTES.RUTA, 
        SUM(POS_ORDERS.TOTALCOSTO) AS COSTO, SUM(POS_ORDERS.TOTALPRECIO) AS IMPORTE
    FROM     POS_ORDERS LEFT OUTER JOIN
                  POS_CLIENTES ON POS_ORDERS.CODCLIE = POS_CLIENTES.CODCLIE
    WHERE  (MONTH(POS_ORDERS.FECHA) = ${mes}) 
    AND (YEAR(POS_ORDERS.FECHA) = ${anio}) 
    GROUP BY POS_ORDERS.CODCLIE, POS_CLIENTES.TIPO, POS_CLIENTES.NOMBRE, POS_CLIENTES.DIRECCION, 
    POS_CLIENTES.TELEFONO, POS_CLIENTES.LATITUD, POS_CLIENTES.LONGITUD, POS_CLIENTES.RUTA
  `


  execute.Query(res,qry)

}); 

app.post("/rpt_clientes_ruta",function(req,res){

  const {dia,ruta} = req.body;

  let qry = `
    SELECT TIPO, NOMBRE, POS_CLIENTES.DIRECCION,
        POS_CLIENTES.TELEFONO,POS_CLIENTES.REFERENCIA,POS_CLIENTES.LATITUD,POS_CLIENTES.LONGITUD,
        POS_CLIENTES.GARRAFONES
        FROM POS_CLIENTES
    WHERE VISITA='${dia}' AND RUTA='${ruta}';
  `

  console.log(qry)

  execute.Query(res,qry)

}); 

app.post("/rpt_ventas_visitados",function(req,res){

  const {fi,ff,visita} = req.body;

  let qry = `
SELECT CODCLIE,TIPO,NOMBRE as NOMCLIE,
    DIRECCION,TELEFONO,REFERENCIA  ,VISITA
      ,ISNULL(LATITUD,0) AS LATITUD
      ,ISNULL(LONGITUD,0) AS LONGITUD
      ,RUTA
      ,GARRAFONES
	    ,ISNULL((SELECT SUM(TOTALPRECIO)
			FROM RPT_CLIENTES_VISITADOS_VENTAS
        WHERE  (FECHA BETWEEN '${fi}' AND '${ff}') AND 
        (CODCLIE = POS_CLIENTES.CODCLIE)),0) AS IMPORTE
  FROM POS_CLIENTES
  WHERE VISITA LIKE '%${visita}%'
  ORDER BY IMPORTE
          `;

          console.log(qry);

  execute.Query(res,qry)

}); 
app.post("/BACKUP_rpt_ventas_visitados",function(req,res){

  const {fi,ff} = req.body;

  let qry = `
SELECT CODCLIE,TIPO,NOMBRE as NOMCLIE,
    DIRECCION,TELEFONO,REFERENCIA  ,VISITA
      ,LATITUD
      ,LONGITUD
      ,RUTA
      ,GARRAFONES
	    ,ISNULL((SELECT SUM(TOTALPRECIO)
			FROM RPT_CLIENTES_VISITADOS_VENTAS
        WHERE  (FECHA BETWEEN '${fi}' AND '${ff}') AND 
        (CODCLIE = POS_CLIENTES.CODCLIE)),0) AS IMPORTE
  FROM POS_CLIENTES
  ORDER BY IMPORTE
          `;


  execute.Query(res,qry)

}); 


app.post("/insert_pedido", function(req, res) {

  const {codclie,nomclie,fecha,tblProductos,concre,codemp} = req.body;


  let qry = '';
  let Productos = JSON.parse(tblProductos);
  let str = ''
  Productos.map((r)=>{

    if(Number(r.CANTIDAD)==0){

    }else{
          str += `INSERT INTO POS_ORDERS 
                    (CODCLIE,FECHA,ANIO,MES,CODPROD,DESPROD,CANTIDAD,COSTO,PRECIO,TOTALCOSTO,TOTALPRECIO,CODEMP,CONCRE)
                  SELECT ${codclie} AS CODCLIE, '${fecha}' AS FECHA, 0 AS ANIO, 0 AS MES, 
                      '${r.CODPROD}' AS CODPROD,'${r.DESPROD}' AS DESPROD,
                      ${r.CANTIDAD} AS CANTIDAD, ${r.COSTO} AS COSTO, ${r.PRECIO} AS PRECIO,
                      ${Number(r.COSTO)*Number(r.CANTIDAD)} AS TOTALCOSTO,
                      ${Number(r.PRECIO)*Number(r.CANTIDAD)} AS TOTALPRECIO, ${codemp} AS CODEMP, '${concre}' AS CONCRE;
                    ` 
    }
  })

  qry = str;
  


  execute.Query(res,qry)

});


app.post("/detalle_pedido",function(req,res){

  const {codclie,codemp,fecha} = req.body;

  let qry = `
  SELECT CODPROD,DESPROD, CANTIDAD, PRECIO, TOTALPRECIO, CONCRE 
  FROM POS_ORDERS 
  WHERE CODCLIE=${codclie} AND CODEMP=${codemp} AND FECHA='${fecha}'
   ;`


  execute.Query(res,qry)

}); 

app.post("/eliminar_detalle_pedido", function(req, res) {
  
  const {codclie, codemp, fecha} = req.body;

  let qry = `
            DELETE FROM POS_ORDERS WHERE CODCLIE=${codclie} AND CODEMP=${codemp} AND FECHA='${fecha}';
          `;

  execute.Query(res,qry)

});

app.post("/lista_clientes",function(req,res){

    const {filtro,ruta} = req.body;

    let qry = `SELECT top 70 CODCLIE, TIPO,NOMBRE,DIRECCION,TELEFONO,
      REFERENCIA,VISITA,LATITUD,LONGITUD,GARRAFONES,
      ISNULL(FECHA,'2000-01-01') AS FECHA
      FROM POS_CLIENTES WHERE NOMBRE LIKE '%${filtro}%' AND RUTA='${ruta}';`


    execute.Query(res,qry)

}); 

app.post("/lista_clientes_general",function(req,res){

  const {tipo} = req.body;

  let qry = '';

  switch (tipo) {
    case 'TODOS':
        qry = `SELECT CODCLIE, TIPO,NOMBRE,DIRECCION,TELEFONO,REFERENCIA,
                VISITA,LATITUD,LONGITUD,GARRAFONES,RUTA,
                ISNULL(FECHA,'2000-01-01') AS FECHA
              FROM POS_CLIENTES;`
      break;
    case 'GARRAFON':
      qry = `SELECT CODCLIE, TIPO,NOMBRE,DIRECCION,TELEFONO,REFERENCIA,
              VISITA,LATITUD,LONGITUD,GARRAFONES,RUTA,
              ISNULL(FECHA,'2000-01-01') AS FECHA
              FROM POS_CLIENTES WHERE GARRAFONES > 0;`
      break;
    case 'SIN':
      qry = `SELECT CODCLIE, TIPO,NOMBRE,DIRECCION,TELEFONO,REFERENCIA,
            VISITA,LATITUD,LONGITUD,GARRAFONES,RUTA,
            ISNULL(FECHA,'2000-01-01') AS FECHA
              FROM POS_CLIENTES WHERE GARRAFONES = 0;`
      break;
  }




  execute.Query(res,qry)

});

app.post("/lista_clientes_historial",function(req,res){

  const {codclie} = req.body;

  let qry = `SELECT FECHA, DESPROD, CANTIDAD, PRECIO, TOTALPRECIO, CONCRE 
        FROM POS_ORDERS 
        WHERE CODCLIE=${codclie}
        ORDER BY FECHA DESC, DESPROD`


  execute.Query(res,qry)

}); 


app.post("/insert_cliente",function(req,res){

  const {tipo,nombre,direccion,telefono,referencia,visita,latitud,longitud,ruta,garrafones,fecha} = req.body;

  let qry = `INSERT INTO POS_CLIENTES 
              (TIPO,NOMBRE,DIRECCION,TELEFONO,REFERENCIA,VISITA,
              LATITUD,LONGITUD,RUTA,GARRAFONES,FECHA)
                VALUES
              ('${tipo}','${nombre}','${direccion}','${telefono}',
              '${referencia}','${visita}','${latitud}','${longitud}',
              '${ruta}',${garrafones},'${fecha}');
            `

            console.log(qry)

  execute.Query(res,qry)

}); 


app.post("/lista_usuarios_login", function(req, res) {
  const { usuario, clave } = req.body;

  let qry = `SELECT CODEMP AS CODIGO, NOMBRE AS usuario, TIPO AS tipo, RUTA AS ruta FROM POS_EMPLEADOS
             WHERE NOMBRE='${usuario}' AND CLAVE='${clave}'`;


  execute.Query(res, qry, (err, result) => {

  });
});


app.post("/lista_empleado",function(req,res){

  //const {filtro} = req.body;

  let qry = `SELECT CODEMP,TIPO,NOMBRE,TELEFONO,CLAVE,LATITUD,LONGITUD,HABILITADO, RUTA
            FROM POS_EMPLEADOS ORDER BY TIPO, NOMBRE`


  execute.Query(res,qry)

}); 

app.post("/insert_empleado",function(req,res){

  const {tipo,nombre,telefono,clave,ruta,latitud,longitud} = req.body;

  let qry = `INSERT INTO POS_EMPLEADOS 
              (TIPO,NOMBRE,TELEFONO,CLAVE,LATITUD,LONGITUD,HABILITADO,RUTA)
                VALUES
              ('${tipo}','${nombre}','${telefono}','${clave}','${latitud}','${longitud}','SI','${ruta}')
            `

      

  execute.Query(res,qry)

});

app.post("/delete_empleado",function(req,res){

  const {codemp} = req.body;

  let qry = `DELETE FROM POS_EMPLEADOS
              WHERE CODEMP=${codemp};
            `

      

  execute.Query(res,qry)

});


app.post("/lista_producto", function(req, res) {

  // const {filtro} = req.body;

  let qry = `SELECT CODPROD,DESPROD,CODMEDIDA,0 AS CANTIDAD, COSTO,PRECIO,ACTIVO
            FROM POS_PRODUCTOS`
          
  execute.Query(res,qry)

});




app.post("/insert_producto", function(req,res) {

  const {codprod,desprod,codmedida,uxc,costo,precio} = req.body;

  let qry = ` INSERT INTO POS_PRODUCTOS
              (CODPROD,DESPROD,CODMEDIDA,UXC,COSTO,PRECIO,ACTIVO)
                VALUES
              ('${codprod}','${desprod}','${codmedida}','${uxc}','${costo}','${precio}','SI')
            `

       
  execute.Query(res,qry)

});

app.post("/update_producto", function(req, res) {

  const {codprod,desprod,costo,precio} = req.body;

  let qry = `
          UPDATE POS_PRODUCTOS
          SET DESPROD='${desprod}',
            COSTO=${costo},
            PRECIO=${precio}
          WHERE CODPROD='${codprod}'
          
        `;

    

      execute.Query(res,qry)
});

app.post("/update_empleado", function(req, res) {

  const {codemp,tipo,nombre,telefono,clave,ruta} = req.body;

  let qry = `
          UPDATE POS_EMPLEADOS
          SET TIPO='${tipo}',
              NOMBRE='${nombre}',
              TELEFONO='${telefono}',
              CLAVE='${clave}',
              RUTA='${ruta}'
            WHERE CODEMP=${codemp}
    `;


    execute.Query(res,qry);

});

app.post("/update_empleado_habilitado", function(req, res) {
  const {codemp,habilitado} = req.body;

  let qry = `
          UPDATE POS_EMPLEADOS
          SET HABILITADO='${habilitado}'
          WHERE CODEMP=${codemp}
  `;



  execute.Query(res,qry);

});

// Consulta para traer la lista de los productos
app.post("/catalogo_productos", function(req, res) {
  const {codprod,desprod,codmedida,uxc,costo,precio,mayorista,activo} = req.body;

  let qry = `
                SELECT CODPROD,DESPROD,CODMEDIDA,UXC,COSTO,PRECIO,MAYORISTA,ACTIVO
                FROM POS_PRODUCTOS
            `;



  execute.Query(res,qry);

})

// Obtener el catalogo de clientes
app.post("/lista_cliente",function(req,res){

  //const {filtro} = req.body;

  let qry = `SELECT CODCLIE,DPI,NIT,TIPO,NOMBRE,
          DIRECCION,CODMUN,CODDEPTO,TELEFONO,
            REFERENCIA,VISITA,LATITUD,LONGITUD,
            RUTA,
            ISNULL(GARRAFONES,0) AS GARRAFONES,
            ISNULL(FECHA,'2000-01-01') AS FECHA
            FROM POS_CLIENTES `


  execute.Query(res,qry)

}); 

app.post("/update_cliente", function(req, res) {

  const {codclie,tipo,nombre,direccion,telefono,referencia,visita,ruta,garrafones} = req.body;

  let qry = `
          UPDATE POS_CLIENTES
          SET TIPO='${tipo}',
              NOMBRE='${nombre}',
              DIRECCION='${direccion}',
              TELEFONO='${telefono}',
              REFERENCIA='${referencia}',
              VISITA='${visita}',
              RUTA='${ruta}',
              GARRAFONES=${garrafones}
            WHERE CODCLIE=${codclie}
    `;


    execute.Query(res,qry);

});

app.post("/delete_cliente",function(req,res){

  const {codclie} = req.body;

  let qry = `DELETE FROM POS_CLIENTES
              WHERE CODCLIE=${codclie};
            `

      

  execute.Query(res,qry)

});

app.post('/update_cliente_venta', function(req, res) {

  const {codclie,nombreClie,referenciaClie,direccionClie,telefonoClie,garrafonesClie} = req.body;

  let qry = `
            UPDATE POS_CLIENTES
            SET NOMBRE='${nombreClie}',
                REFERENCIA='${referenciaClie}',
                DIRECCION='${direccionClie}',
                TELEFONO='${telefonoClie}',
                GARRAFONES=${garrafonesClie}
            WHERE CODCLIE=${codclie}
          `;
    execute.Query(res,qry);

})

app.post("/listado_pedidos_vendedor",function(req,res){

  const {codemp,fecha} = req.body;

  let qry = `SELECT POS_ORDERS.CODCLIE, POS_ORDERS.FECHA, SUM(POS_ORDERS.TOTALPRECIO) AS IMPORTE, POS_ORDERS.CONCRE, POS_CLIENTES.NOMBRE AS CLIENTE, POS_ORDERS.CODEMP
              FROM POS_ORDERS LEFT OUTER JOIN POS_CLIENTES ON POS_ORDERS.CODCLIE = POS_CLIENTES.CODCLIE
              GROUP BY POS_ORDERS.CODCLIE, POS_ORDERS.FECHA, POS_ORDERS.CONCRE, POS_CLIENTES.NOMBRE, POS_ORDERS.CODEMP
              HAVING (POS_ORDERS.CODEMP = ${codemp}) AND (POS_ORDERS.FECHA = '${fecha}')`


  execute.Query(res,qry)

}); 

app.post("/listado_pedidos_vendedor_productos",function(req,res){

  const {codemp,fecha} = req.body;

  let qry = `
              SELECT POS_ORDERS.CODPROD, POS_PRODUCTOS.DESPROD, SUM(POS_ORDERS.CANTIDAD) AS CANTIDAD, SUM(POS_ORDERS.COSTO) AS COSTO, SUM(POS_ORDERS.PRECIO) AS PRECIO, SUM(POS_ORDERS.TOTALCOSTO) AS TOTALCOSTO, SUM(POS_ORDERS.TOTALPRECIO) 
                AS TOTALPRECIO
              FROM  POS_ORDERS LEFT OUTER JOIN
                  POS_PRODUCTOS ON POS_ORDERS.CODPROD = POS_PRODUCTOS.CODPROD
              WHERE  (POS_ORDERS.FECHA = '${fecha}') AND  (POS_ORDERS.CODEMP = ${codemp})
              GROUP BY POS_ORDERS.CODPROD, POS_PRODUCTOS.DESPROD
  `


  execute.Query(res,qry)

}); 





app.use("/",router);


app.use("*",function(req,res){
  res.redirect('/');
  //res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
});



http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

