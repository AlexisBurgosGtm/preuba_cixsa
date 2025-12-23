
function getView(){
    let view = {
        body:()=>{
            return `
                
                <div class="col-12 p-0 bg-white">
                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="uno" role="tabpanel" aria-labelledby="receta-tab">
                            <h1 class="text-naranja negrita">Hola Administrador !!</h1>
                
                            ${view.inicio() + view.modal_foto() + view.modal_movimiento()}
                        </div>
                        <div class="tab-pane fade" id="dos" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_nuevo()}
                        </div>
                        <div class="tab-pane fade" id="tres" role="tabpanel" aria-labelledby="home-tab">
                            
                        </div>    
                        <div class="tab-pane fade" id="cuatro" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_historial()}
                        </div>    
                    </div>

                    <ul class="nav nav-tabs hidden" id="myTabHome" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active negrita text-success" id="tab-uno" data-toggle="tab" href="#uno" role="tab" aria-controls="profile" aria-selected="false">
                                <i class="fal fa-list"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-dos" data-toggle="tab" href="#dos" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>  
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-tres" data-toggle="tab" href="#tres" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li> 
                         <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-cuatro" data-toggle="tab" href="#cuatro" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>         
                    </ul>
                    
                </div>
               
            `
        },
        inicio:()=>{
            return `
            <div class="card card-rounded shadow">
                <div class="card-body p-2">
                    <div class="table-responsive col-12">
                        
                        <div class="row">
                            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                <div class="form-group">
                                    <label>Seleccione la especie a consultar:</label>
                                    <select class="form-control negrita text-naranja" id="cmbFiltroEspecies">
                                            <option value="%">TODAS</option>
                                            <option value="RES">RES</option>
                                            <option value="AVES">AVES</option>
                                            <option value="CERDOS">CERDOS</option>
                                            <option value="CABALLOS">CABALLOS</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                 <div class="form-group">
                                    <label>Granja</label>
                                    <select class="form-control negrita text-naranja" id="cmbFiltroGranjas">
                                           <option value="TODAS">TODAS</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-right">
                                <h3 class="negrita text-danger" id="lbConteo"></h3>
                            </div>
                        </div>

                        <br>

                        <table class="table h-full table-hover col-12">
                            <thead class="bg-naranja text-white">
                                <tr>
                                    <td>CODIGO</td>
                                    <td>ESPECIE/TIPO</td>
                                    <td>NOMBRE</td>
                                    <td>SEXO</td>
                                    <td>NACIMIENTO</td>
                                    <td>RAZA</td>
                                    <td>GRANJA</td>
                                    <td>GALERA</td>
                                    <td>ST</td>
                                    <td>MOVER</td>
                                    <td>HISTORIAL</td>
                                    <td>FOTO</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tbl_data_animales">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <button class="btn btn-primary btn-circle btn-xl btn-bottom-l hand shadow" id="btnSync">
                <i class="fal fa-sync"></i>
            </button>

            <button class="btn btn-success btn-circle btn-xl btn-bottom-r hand shadow" id="btnNuevo">
                <i class="fal fa-plus"></i>
            </button>

            `
        },
        vista_nuevo:()=>{
            return `

            <div class="card card-rounded shadow col-sm-12 col-md-6 col-xl-6 col-lg-6">
                <div class="card-body p-4">
                 
                    <h3 class="negrita text-danger">Datos del Nuevo Animal</h3>

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Especie / Tipo</label>
                                <select  class="form-control" id="cmbEspecie">
                                    <option value="RES">RES</option>
                                    <option value="AVES">AVES</option>
                                    <option value="CERDOS">CERDOS</option>
                                    <option value="CABALLOS">CABALLOS</option>
                                </select>

                            </div>
                        </div>
                        <div class="col-6">
                            <img src="./img/logo.png" width="100px" height="100px" id="imgFoto">
                            <input type="file" id="txtFoto" >
                        </div>
                    </div>
                    
                    

                    <div class="form-group">
                        <label>Nombre o Descripcion del Animal</label>
                        <input type="text" class="form-control" id="txtNombre">

                    </div>

                  
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Sexo</label>
                                <select class="form-control" id="cmbSexo">
                                    <option value="M">MACHO / MASCULINO</option>
                                    <option value="F">HEMBRA / FEMENINO</option>
                                </select>

                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Fecha Nacimiento</label>
                                <input type="date" class="form-control" id="txtNacimiento">
                            </div>
                        </div>
                    </div>
                    <br>
                  
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Raza</label>
                                <input type="text" class="form-control" id="txtRaza">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Peso Inicial</label>
                                <input type="number" class="form-control" id="txtPesoInicial">
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Granja</label>
                                <select class="form-control" id="cmbGranja">
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Galera</label>
                                <select class="form-control" id="cmbGalera">
                                </select>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="form-group">
                        <label>Observaciones</label>
                        <textarea rows="2" class="form-control" id="txtObs"></textarea>
                    </div>
                  

                </div>
            </div>

            
            
            <button class="btn btn-secondary btn-xl btn-circle btn-bottom-l hand shadow" id="btnAtras">
                <i class="fal fa-arrow-left"></i>
            </button>

            <button class="btn btn-info btn-xl btn-circle btn-bottom-r hand shadow" id="btnGuardar">
                <i class="fal fa-save"></i>
            </button>
            `
        },
        vista_sincronizar:()=>{
            return `
            
            <h1>Sincronizacion de Granjas</h1>




            <button class="btn btn-secondary btn-xl btn-circle btn-bottom-l hand shadow" onclick="document.getElementById('tab-uno').click()">
                <i class="fal fa-arrow-left"></i>
            </button>
            `
        },
        modal_foto:()=>{
            return `
            <div class="modal fade" id="modal_foto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">

                        <div class="modal-header">
                            <label class="modal-title h3">Foto del animal</label>
                        </div>
        
                        <div class="modal-body p-4">

                            <div class="text-center">
                                <img src='' id="imgAnimal" width="400px" height="400px"> 
                            </div>
                        
                        </div>
                                
                    </div>
                </div>
            </div>
            `
        },
        vista_historial:()=>{
            return `
            <div class="card card-rounded col-12">
                <div class="card-body p-4">

                    <h1>Historial de Movimientos del Animal</h1>
                    <h3 class="negrita text-naranja" id="lbHistorialNombre"></h3>


                    <div class="table-responsive">
                        <table class="table table-bordered h-full col-12">
                            <thead class="bg-secondary text-white">
                                <tr>
                                    <td>FECHA</td>
                                    <td>TIPO MOVIMIENTO</td>
                                    <td>PESO</td>
                                    <td>GRANJA</td>
                                    <td>GALERA</td>
                                </tr>
                            </thead>
                            <tbody id="tbl_data_historial">
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            

            <button class="btn btn-secondary btn-xl btn-circle btn-bottom-l hand shadow" onclick="document.getElementById('tab-uno').click()">
                <i class="fal fa-arrow-left"></i>
            </button>
            `
        },
        modal_movimiento:()=>{
            return `
            <div class="modal fade" id="modal_reubicar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-right modal-lg" role="document">
                    <div class="modal-content">

                        <div class="modal-header">
                            <label class="modal-title h3">Reubicar Animal</label>
                           
                            <label class="modal-title h3 text-danger" id="lbRENombre"></label>
                            
                        </div>
        
                        <div class="modal-body p-4">

                            <div class="form-group">
                                <label>Tipo de Movimiento</label>
                                <select class="form-control negrita text-danger" id="cmbRETipo">
                                    <option value="REUBICAR">REUBICAR GRANJA / GALERA</option>
                                    <option value="VENTA">SALIDA POR VENTA</option>
                                    <option value="DESECHO">SALIDA POR DESECHO</option>
                                </select>
                            </div>


                             <div class="row">
                                <div class="col-6">
                                     
                                    <div class="form-group">
                                        <label>Fecha</label>
                                        <input type="date" class="form-control negrita text-danger" id="txtREFecha">
                                    </div>

                                </div>
                                <div class="col-6">
                                     
                                    <div class="form-group">
                                        <label>Peso del animal</label>
                                        <input type="number" class="form-control negrita text-danger" id="txtREPeso">
                                    </div>
                                </div>
                            </div>
                            <br>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Granja / Galera Origen</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="txtREGranjaOrigen" disabled="true">
                                            <input type="text" class="form-control" id="txtREGaleraOrigen" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Granja / Galera Destino</label>
                                        <div class="input-group">
                                            <select class="form-control" id="cmbREGranjaDestino"></select>
                                            <select class="form-control" id="cmbREGaleraDestino"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br>

                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-xl btn-circle btn-secondary hand shadow" data-dismiss="modal">
                                        X
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-xl btn-circle btn-info hand shadow" id="btnREGuardar">
                                        <i class="fal fa-save"></i>
                                    </button>
                                </div>
                            </div>
                            
                        
                        </div>
                                
                    </div>
                </div>
            </div>
            `
        },
    }

    root.innerHTML = view.body();

};

function addListeners(){

    F.slideAnimationTabs();


   cargar_granjas();
    

   document.getElementById('cmbGranja').addEventListener('change',()=>{

        let idgranja = document.getElementById('cmbGranja').value;
        cargar_galeras(idgranja);
   })
   

   document.getElementById('cmbFiltroEspecies').addEventListener('change',()=>{
        tbl_animales();
   })
     document.getElementById('cmbFiltroGranjas').addEventListener('change',()=>{
        tbl_animales();
   })
   


   tbl_animales();



    listeners_nuevo();

    listeners_sync();

    listeners_movimiento();


};



function initView(){

    getView();
    addListeners();

};

function cargar_granjas(){
    apicalls.get_granjas()
    .then((data)=>{
     

        let str = '';
        data.recordset.map((r)=>{
            str += `
            <option value='${r.GRANJA_ID}'>${r.NAME} (CODIGO: ${r.CODIGO})</option>
            `
        })
        document.getElementById('cmbGranja').innerHTML = str;
        document.getElementById('cmbREGranjaDestino').innerHTML = str;

        let idgranja = document.getElementById('cmbGranja').value;
        cargar_galeras(idgranja);

        document.getElementById('cmbFiltroGranjas').innerHTML = `<option value="TODAS">TODAS</option>` + str;
    })
    .catch(()=>{
        document.getElementById('cmbGranja').innerHTML='No se cargaron...';
        document.getElementById('cmbFiltroGranjas').innerHTML = 'No se cargaron...';
        document.getElementById('cmbREGranjaDestino').innerHTML ='No se cargaron...';
    })
};
function cargar_galeras(idgranja){

    apicalls.get_galeras(idgranja)
    .then((data)=>{
     

        let str = '';
        data.recordset.map((r)=>{
            str += `
            <option value='${r.galera_id}'>${r.nombre_galera} (CODIGO: ${r.codigo_galera})</option>
            `
        })
        document.getElementById('cmbGalera').innerHTML = str;
        document.getElementById('cmbREGaleraDestino').innerHTML = str;
    })
    .catch(()=>{
        document.getElementById('cmbGalera').innerHTML='No se cargaron...';
         document.getElementById('cmbREGaleraDestino').innerHTML = 'No se cargaron...';
    })
}
function cargar_galeras_movimiento(idgranja){

    apicalls.get_galeras(idgranja)
    .then((data)=>{
     

        let str = '';
        data.recordset.map((r)=>{
            str += `
            <option value='${r.galera_id}'>${r.nombre_galera} (CODIGO: ${r.codigo_galera})</option>
            `
        })
 
        document.getElementById('cmbREGaleraDestino').innerHTML = str;
    })
    .catch(()=>{
      
         document.getElementById('cmbREGaleraDestino').innerHTML = 'No se cargaron...';
    })
}

function listeners_nuevo(){

     //eventos del nuevo registro
    document.getElementById('btnNuevo').addEventListener('click',()=>{        
        //se mueve al tab para crear nuevo
        document.getElementById('tab-dos').click();
        limpiar_datos();

    })

    document.getElementById('btnAtras').addEventListener('click',()=>{document.getElementById('tab-uno').click()});


    document.getElementById('txtFoto').addEventListener('change',()=>{

         const image = document.getElementById('txtFoto').files[0];
  
        if (image !== undefined) {
            const fileReader = new FileReader();
            
            fileReader.addEventListener('load', function () {
                const imgEl = document.getElementById('imgFoto');
                imgEl.src = this.result;
                imgEl.alt = 'La imagen no cargado correctamente.';
                
            });    
            
            fileReader.readAsDataURL(image);
        }
    })



    let btnGuardar = document.getElementById('btnGuardar');
    btnGuardar.addEventListener('click',()=>{

        let especie = document.getElementById('cmbEspecie').value;
        let foto = document.getElementById('imgFoto').src || '';
        let nombre =document.getElementById('txtNombre').value || '';
            if(nombre==''){F.AvisoError('Indique un nombre..');return;}

        let sexo = document.getElementById('cmbSexo').value;
        let nacimiento = F.devuelveFecha('txtNacimiento');

        let raza = document.getElementById('txtRaza').value || '';
        let peso = document.getElementById('txtPesoInicial').value || '0';
        let granja = document.getElementById('cmbGranja').value;
        let galera = document.getElementById('cmbGalera').value;
        let obs = F.limpiarTexto(document.getElementById('txtObs').value || '');


        F.Confirmacion('Esta seguro que desea CREAR este nuevo Animal?')
        .then((value)=>{
            if(value==true){

                btnGuardar.disabled= true;
                btnGuardar.innerHTML = `<i class="fal fa-save fa-spin"></i>`;

                apicalls.insert_animal(especie,nombre,sexo,nacimiento,raza,peso,obs,foto,granja,galera)
                .then(()=>{
                    F.Aviso('Animal creado exitosamente!!');

                    btnGuardar.disabled= false;
                    btnGuardar.innerHTML = `<i class="fal fa-save"></i>`;

                    tbl_animales();
                    document.getElementById('tab-uno').click();
                    limpiar_datos();
                })
                .catch(()=>{
                    F.AvisoError('No se pudo crear este animal, intentelo de nuevo');
                    
                    btnGuardar.disabled= false;
                    btnGuardar.innerHTML = `<i class="fal fa-save"></i>`;

                })

            }
        })

    });




};
function limpiar_datos(){

    document.getElementById('txtNacimiento').value = F.getFecha();
    document.getElementById('txtRaza').value = '';
    document.getElementById('txtFoto').src = './img/logo.png';
    document.getElementById('txtNombre').value = '';
    document.getElementById('txtPesoInicial').value = '';

};


function listeners_movimiento(){

    document.getElementById('cmbREGranjaDestino').addEventListener('change',()=>{

        let idgranja = document.getElementById('cmbREGranjaDestino').value;
        cargar_galeras_movimiento(idgranja);
    });


    let btnREGuardar = document.getElementById('btnREGuardar');
    btnREGuardar.addEventListener('click',()=>{

        let tipo = document.getElementById('cmbRETipo').value;
        let fecha = F.devuelveFecha('txtREFecha');
        let peso = document.getElementById('txtREPeso').value || '0';
        let id_granja = document.getElementById('cmbREGranjaDestino').value;
        let id_galera = document.getElementById('cmbREGaleraDestino').value;

        F.Confirmacion('Desea registrar este movimiento?')
        .then((value)=>{
            if(value==true){

                btnREGuardar.disabled = true;
                btnREGuardar.innerHTML = `<i class="fal fa-save fa-spin"></i>`;

                 apicalls.insert_movimiento(tipo,fecha,peso,id_granja,id_galera,selected_id_animal)
                .then(()=>{

                        F.Aviso('Movimiento registrado exitosamente!!');
                        btnREGuardar.disabled = false;
                        btnREGuardar.innerHTML = `<i class="fal fa-save"></i>`;
                        
                        $("#modal_reubicar").modal('hide');
                        tbl_animales();
                })
                .catch(()=>{
                    F.AvisoError('No se pudo registrar el movimiento');
                    btnREGuardar.disabled = false;
                    btnREGuardar.innerHTML = `<i class="fal fa-save"></i>`;
                })

            }
        })

       


    });




}


function listeners_sync(){
    
    //sincronizacion
    let btnSync = document.getElementById('btnSync');

    btnSync.addEventListener('click',()=>{
    
        F.Confirmacion('Esta a punto de sincronizar el catalogo de granjas y galeras, desea continuar?')
        .then((value)=>{
            if(value==true){

                btnSync.disabled = true;
                btnSync.innerHTML = `<i class="fal fa-sync fa-spin">`;
                
                F.showToast('Sincronizando granjas...');

                apicalls.get_sync_granjas()
                .then((data)=>{

                    F.showToast('Granjas actualizadas...');
                   
                    btnSync.disabled = false;
                    btnSync.innerHTML = `<i class="fal fa-sync">`;

                    
              
                })
                .catch(()=>{
                    F.showToast('No se pudieron sincronizar las Granjas');
                    btnSync.disabled = false;
                    btnSync.innerHTML = `<i class="fal fa-sync">`;
                });

                btnSync.disabled = true;
                btnSync.innerHTML = `<i class="fal fa-sync fa-spin">`;
              
                F.showToast('Sincronizando galeras...');

                apicalls.get_sync_galeras()
                .then((data)=>{
                    F.showToast('Galeras actualizadas...');
                    btnSync.disabled = false;
                    btnSync.innerHTML = `<i class="fal fa-sync">`;

                    cargar_granjas();
                })
                .catch(()=>{
                    F.showToast('No se pudieron sincronizar las Galeras');
                    btnSync.disabled = false;
                    btnSync.innerHTML = `<i class="fal fa-sync">`;
                });


            }
        })

        

    });


};








function tbl_animales(){


    let container = document.getElementById('tbl_data_animales');
    container.innerHTML = GlobalLoader;
    document.getElementById('lbConteo').innerText = '---'

    let filtro = document.getElementById('cmbFiltroEspecies').value;
    let granja = document.getElementById('cmbFiltroGranjas').value;

    let contador = 0;

    apicalls.get_animales(filtro,granja)
    .then((data)=>{

        let str = '';

        data.recordset.map((r)=>{
            let idbtnEliminar = `btnEliminar${r.CODIGO}`;
         
            contador+=1;
            let classSt = ''
            if(r.ST=='activo'){classSt='text-success';}else{classSt='text-danger'};
            
            str+= `
            <tr>
                <td>${r.CODIGO}</td>
                <td>${r.ESPECIE}</td>
                <td>${r.NOMBRE}</td>
                <td>${r.SEXO}</td>
                <td>${F.convertDateNormal(r.NACIMIENTO)}</td>
                <td>${r.RAZA}</td>
                <td>${r.GRANJA}</td>
                <td>${r.GALERA}</td>
                <td class="negrita ${classSt}">${r.ST}</td>
                <td>
                    <button class="btn btn-md btn-outline-danger hand shadow col-12"
                    onclick="movimiento_animal('${r.CODIGO}','${r.NOMBRE}','${r.GRANJA}','${r.GALERA}')">
                        <i class="fal fa-arrows-alt"></i> &nbsp Reubicar Animal
                    </button>
                </td>
             
                <td>
                    <button class="btn btn-circle btn-md hand shadow btn-warning"
                    onclick="historial('${r.CODIGO}','${r.NOMBRE}')">
                        <i class="fal fa-list"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-circle btn-md hand shadow btn-info"
                    onclick="preview_foto('${r.CODIGO}')">
                        <i class="fal fa-share"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-circle btn-md hand shadow btn-danger" id="${idbtnEliminar}"
                    onclick="eliminar_animal('${r.CODIGO}','${idbtnEliminar}')">
                        <i class="fal fa-trash"></i>
                    </button>
                </td>
            </tr>
            `
        })
        container.innerHTML = str;
        document.getElementById('lbConteo').innerText = `Conteo: ${contador}`;
    })
    .catch(()=>{
        container.innerHTML = 'No se cargaron datos...' 
        document.getElementById('lbConteo').innerText = '---'
    })

};
function eliminar_animal(codigo_animal, idbtn){

    let btn = document.getElementById(idbtn);

    F.Confirmacion('Esta seguro que desea ELIMINAR este animal?')
    .then((value)=>{
        if(value==true){

            btn.innerHTML = `<i class="fal fa-trash fa-spin"></i>`;
            btn.disabled = true;

            apicalls.delete_animal(codigo_animal)
            .then(()=>{
                F.Aviso('Animal eliminado exitosamente!!');
                tbl_animales();
            })
            .catch(()=>{
                F.AvisoError('No se pudo Eliminar');
                btn.innerHTML = `<i class="fal fa-trash"></i>`;
                btn.disabled = false;
            })


        }
    })


};
function preview_foto(idanimal){
    
    apicalls.get_foto_animal(idanimal)
    .then((data)=>{
        let foto = ''
        data.recordset.map((r)=>{
            foto = r.FOTO;
        })
        if(foto==''){
             F.AvisoError('Este animal no tiene foto');
        }else{
            $("#modal_foto").modal('show');
            document.getElementById('imgAnimal').src = foto;
        }
    })
    .catch((error)=>{
        console.log(error);
        F.AvisoError('No se cargo la foto');
        document.getElementById('imgAnimal').src = '';
    })
    


   


};
function historial(idanimal,nombre){
    
    
    document.getElementById('lbHistorialNombre').innerText = nombre;

    document.getElementById('tab-cuatro').click();


    tbl_historial_movimientos(idanimal);

};

function movimiento_animal(idanimal,nombre,granja,galera){

    $("#modal_reubicar").modal('show');


    selected_id_animal = idanimal;

    document.getElementById('lbRENombre').innerText = nombre;

    document.getElementById('txtREFecha').value = F.getFecha();
    document.getElementById('txtREPeso').value = '';


    document.getElementById('txtREGranjaOrigen').value = granja;
    document.getElementById('txtREGaleraOrigen').value = galera;
    
    


}



function tbl_historial_movimientos(id){

    let container = document.getElementById('tbl_data_historial');
    container.innerHTML = GlobalLoader;


    apicalls.movimientos_animal(id)
    .then((data)=>{

        let str = '';
        data.recordset.map((r)=>{
            str += `
                <tr>
                    <td>${F.convertDateNormal(r.FECHA)}</td>
                    <td>${r.TIPO}</td>
                    <td>${r.PESO}</td>
                    <td>${r.GRANJA}</td>
                    <td>${r.GALERA}</td>
                </tr>
            `
        })
        container.innerHTML = str;
    })
    .catch(()=>{
        container.innerHTML = 'No se cargaron datos';
    })


};