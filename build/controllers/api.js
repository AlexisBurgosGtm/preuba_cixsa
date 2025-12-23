let apicalls = {
    get_sync_granjas:()=>{

            return new Promise((resolve,reject)=>{

                axios.post('/sync_granjas')
                .then((response) => {
                    if(response.status.toString()=='200'){
                        let data = response.data;
                        resolve(data);
                    }else{
                        reject();
                    }                   
                }, (error) => {
                    reject();
                });
            }) 
    

    },
    get_sync_galeras:()=>{

            return new Promise((resolve,reject)=>{

                axios.post('/sync_galeras')
                .then((response) => {
                    if(response.status.toString()=='200'){
                        let data = response.data;
                        resolve(data);
                    }else{
                        reject();
                    }                   
                }, (error) => {
                    reject();
                });
            }) 
    

    },
    get_granjas:()=>{

            return new Promise((resolve,reject)=>{

                axios.post('/api/granjas_listado')
                .then((response) => {
                    if(response.status.toString()=='200'){
                        let data = response.data;
                        if(data.toString()=="error"){
                            reject();
                        }else{
                            if(Number(data.rowsAffected[0])>0){
                                resolve(data);             
                            }else{
                                reject();
                            } 
                        }       
                    }else{
                        reject();
                    }                   
                }, (error) => {
                    reject();
                });
            }) 
    

    },
    get_galeras:(idgranja)=>{

            return new Promise((resolve,reject)=>{

                axios.post('/api/galeras_listado',{granja_id:idgranja})
                .then((response) => {
                    if(response.status.toString()=='200'){
                        let data = response.data;
                        if(data.toString()=="error"){
                            reject();
                        }else{
                            if(Number(data.rowsAffected[0])>0){
                                resolve(data);             
                            }else{
                                reject();
                            } 
                        }       
                    }else{
                        reject();
                    }                   
                }, (error) => {
                    reject();
                });
            }) 
    

    },
    get_animales:(filtro,idgranja)=>{

            return new Promise((resolve,reject)=>{

                axios.post('/api/animales_listado',{filtro:filtro,idgranja:idgranja})
                .then((response) => {
                    if(response.status.toString()=='200'){
                        let data = response.data;
                        if(data.toString()=="error"){
                            reject();
                        }else{
                            if(Number(data.rowsAffected[0])>0){
                                resolve(data);             
                            }else{
                                reject();
                            } 
                        }       
                    }else{
                        reject();
                    }                   
                }, (error) => {
                    reject();
                });
            }) 
    

    },
    delete_animal:(codigo_animal)=>{

            return new Promise((resolve,reject)=>{

                axios.post('/api/animales_eliminar',{id:codigo_animal})
                .then((response) => {
                    if(response.status.toString()=='200'){
                        let data = response.data;
                        if(data.toString()=="error"){
                            reject();
                        }else{
                            if(Number(data.rowsAffected[0])>0){
                                resolve(data);             
                            }else{
                                reject();
                            } 
                        }       
                    }else{
                        reject();
                    }                   
                }, (error) => {
                    reject();
                });
            }) 
    

    },
    get_foto_animal:(codigo_animal)=>{

            return new Promise((resolve,reject)=>{

                axios.post('/api/animales_foto',{id:codigo_animal})
                .then((response) => {
                    if(response.status.toString()=='200'){
                        let data = response.data;
                        if(data.toString()=="error"){
                            reject();
                        }else{
                            if(Number(data.rowsAffected[0])>0){
                                resolve(data);             
                            }else{
                                reject();
                            } 
                        }       
                    }else{
                        reject();
                    }                   
                }, (error) => {
                    reject();
                });
            }) 
    

    },
    insert_animal:(especie,nombre,sexo,nacimiento,raza,peso_inicial,observaciones,foto,granja_id,galera_id,)=>{

            return new Promise((resolve,reject)=>{

                let data = {
                    especie:especie,
                    nombre:nombre,
                    sexo:sexo,
                    nacimiento:nacimiento,
                    raza:raza,
                    peso_inicial:peso_inicial,
                    observaciones:observaciones,
                    foto:foto,
                    granja_id:granja_id,
                    galera_id:galera_id    
                }

                axios.post('/api/animales_insertar',data)
                .then((response) => {
                    if(response.status.toString()=='200'){
                        let data = response.data;
                        if(data.toString()=="error"){
                            reject();
                        }else{
                            if(Number(data.rowsAffected[0])>0){
                                resolve(data);             
                            }else{
                                reject();
                            } 
                        }       
                    }else{
                        reject();
                    }                   
                }, (error) => {
                    reject();
                });
            }) 
    

    },
    insert_movimiento:(tipo,fecha,peso,id_granja,id_galera, id_animal)=>{

            return new Promise((resolve,reject)=>{


                let data = {
                    tipo:tipo,
                    fecha:fecha,
                    peso:peso,
                    id_granja:id_granja,
                    id_galera:id_galera, 
                    id_animal:id_animal
                }
                axios.post('/api/movimientos_insert',data)
                .then((response) => {
                    if(response.status.toString()=='200'){
                        let data = response.data;
                        if(data.toString()=="error"){
                            reject();
                        }else{
                            if(Number(data.rowsAffected[0])>0){
                                resolve(data);             
                            }else{
                                reject();
                            } 
                        }       
                    }else{
                        reject();
                    }                   
                }, (error) => {
                    reject();
                });
            }) 
    

    },
    movimientos_animal:(codigo_animal)=>{

            return new Promise((resolve,reject)=>{

                axios.post('/api/movimientos_listado',{id:codigo_animal})
                .then((response) => {
                    if(response.status.toString()=='200'){
                        let data = response.data;
                        if(data.toString()=="error"){
                            reject();
                        }else{
                            if(Number(data.rowsAffected[0])>0){
                                resolve(data);             
                            }else{
                                reject();
                            } 
                        }       
                    }else{
                        reject();
                    }                   
                }, (error) => {
                    reject();
                });
            }) 
    

    },


}