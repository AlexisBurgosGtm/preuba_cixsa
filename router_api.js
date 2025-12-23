const execute = require('./connection');
const express = require('express');
const router = express.Router();



router.post("/granjas_listado", async(req,res)=>{
   
    //const { token } = req.body;   

    let qry = `
        SELECT GRANJA_ID, CODIGO, NAME,STATE FROM GRANJAS
    `
    execute.Query(res,qry);
     
});

router.post("/galeras_listado", async(req,res)=>{
   
    const { granja_id } = req.body;   

    let qry = `
        SELECT 
            galeras.galera_id, 
            galeras.granja_id, 
            granjas.codigo, 
            granjas.name, 
            galeras.granja_desc, 
            galeras.codigo AS codigo_galera, 
            galeras.name AS nombre_galera, 
            galeras.state
            FROM  galeras LEFT OUTER JOIN
                granjas ON galeras.granja_id = granjas.granja_id
            WHERE    (galeras.granja_id = ${granja_id});
    `
    execute.Query(res,qry);
     
});



router.post("/animales_listado", async(req,res)=>{
   
    const { filtro, idgranja } = req.body;   

    let qry = '';

    if(idgranja=='TODAS'){
        qry = `
                SELECT  
                    animales.codigo_interno AS CODIGO, 
                    animales.especie AS ESPECIE, 
                    animales.nombre AS NOMBRE, 
                    animales.sexo AS SEXO, 
                    animales.nacimiento AS NACIMIENTO, 
                    animales.raza AS RAZA, 
                    animales.peso_inicial AS PESOINICIAL, 
                    animales.observaciones AS OBS, 
                    '' AS FOTO, 
                    animales.granja_id AS GRANJA_ID, 
                    animales.galera_id AS GALERA_ID, 
                    granjas.name AS GRANJA, 
                    galeras.name AS GALERA, 
                    animales.estado AS ST
                FROM  animales LEFT OUTER JOIN
                    galeras ON animales.galera_id = galeras.galera_id LEFT OUTER JOIN
                    granjas ON animales.granja_id = granjas.granja_id
                WHERE 
                    animales.especie like '%${filtro}%';
            `
    }else{
        qry = `
                SELECT  
                    animales.codigo_interno AS CODIGO, 
                    animales.especie AS ESPECIE, 
                    animales.nombre AS NOMBRE, 
                    animales.sexo AS SEXO, 
                    animales.nacimiento AS NACIMIENTO, 
                    animales.raza AS RAZA, 
                    animales.peso_inicial AS PESOINICIAL, 
                    animales.observaciones AS OBS, 
                    animales.foto AS FOTO, 
                    animales.granja_id AS GRANJA_ID, 
                    animales.galera_id AS GALERA_ID, 
                    granjas.name AS GRANJA, 
                    galeras.name AS GALERA, 
                    animales.estado AS ST
                FROM  animales LEFT OUTER JOIN
                    galeras ON animales.galera_id = galeras.galera_id LEFT OUTER JOIN
                    granjas ON animales.granja_id = granjas.granja_id
                WHERE 
                    animales.especie like '%${filtro}%'
                    AND animales.granja_id=${idgranja};
            `
    }

     
    execute.Query(res,qry);
     
});
router.post("/animales_eliminar", async(req,res)=>{
   
    const { id } = req.body;   

    let qry = `
        DELETE FROM ANIMALES WHERE CODIGO_INTERNO=${id};
    `
    execute.Query(res,qry);
     
});
router.post("/animales_insertar", async(req,res)=>{
   
    const { especie,nombre,sexo,nacimiento,raza,peso_inicial,observaciones,foto,granja_id,galera_id } = req.body;   

    let qry = `
        INSERT INTO ANIMALES 
            (especie,nombre,sexo,nacimiento,raza,peso_inicial,observaciones,foto,granja_id,galera_id,estado)
        SELECT '${especie}' as especie,
                '${nombre}' as nombre,
                '${sexo}' as sexo,
                '${nacimiento}' as nacimiento,
                '${raza}' as raza,
                ${peso_inicial} as peso_inicial,
                '${observaciones}' as observaciones,
                '${foto}' as foto,
                ${granja_id} as granja_id,
                ${galera_id} as galera_id,
                'activo' as estado
    `
    execute.Query(res,qry);
     
});
router.post("/animales_foto", async(req,res)=>{
   
    const { id } = req.body;   

    let qry = `
        SELECT 
            FOTO 
        FROM 
            ANIMALES 
        WHERE CODIGO_INTERNO=${id};
    `
    execute.Query(res,qry);
     
});


router.post("/movimientos_insert", async(req,res)=>{
   
    const { tipo,fecha,peso,id_granja,id_galera, id_animal } = req.body;   

    let qry = `
       INSERT INTO animales_movimientos
        (TIPO,FECHA,PESO,CODIGO_INTERNO,GRANJA_ID,GALERA_ID)
        VALUES
        ('${tipo}','${fecha}',${peso},${id_animal},${id_granja},${id_galera});
    `

    let qry_animal = `UPDATE ANIMALES SET GRANJA_ID=${id_granja}, GALERA_ID=${id_galera} WHERE CODIGO_INTERNO=${id_animal};`
    
    execute.Query(res,qry + qry_animal);
     
});
router.post("/movimientos_listado", async(req,res)=>{
   
    const { id } = req.body;   

    let qry = `
      SELECT        animales_movimientos.tipo AS TIPO, animales_movimientos.fecha AS FECHA, animales_movimientos.peso AS PESO, animales_movimientos.codigo_interno AS CODIGO, galeras.name AS GALERA, 
                         granjas.name AS GRANJA
FROM            animales_movimientos LEFT OUTER JOIN
                         galeras ON animales_movimientos.galera_id = galeras.galera_id LEFT OUTER JOIN
                         granjas ON animales_movimientos.granja_id = granjas.granja_id
WHERE        (animales_movimientos.codigo_interno = ${id})
        
    `
    execute.Query(res,qry);
     
});



module.exports = router;


