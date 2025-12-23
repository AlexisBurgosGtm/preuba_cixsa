
function getView(){
    let view = {
        body:()=>{
            return `
                <div class="col-12 p-0 bg-white">
                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="uno" role="tabpanel" aria-labelledby="receta-tab">
                            ${view.login()}
                        </div>
                        <div class="tab-pane fade" id="dos" role="tabpanel" aria-labelledby="home-tab">
                           
                        </div>
                        <div class="tab-pane fade" id="tres" role="tabpanel" aria-labelledby="home-tab">
                            
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
                    </ul>
                    
                </div>
               
            `
        },
        login:()=>{
            return `
            <div class="card card-rounded shadow col-sm-12 col-md-5 col-lg-4 col-xl-4">
                <div class="card-body p-4">
                    <div class="text-center">
                        <img src="./img/logo.png" widht="100px" height="100px" />
                    </div>

                    <div class="form-group">
                        <label>Usuario</label>
                        <select class="form-control negrita text-danger" id="cmbUsuario">
                            <option value="ADMIN">ADMINISTRADOR</option>
                            <option value="USUARIO">USUARIO</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Clave</label>
                        <input type="password" class="form-control negrita text-danger" id="txtPass">
                    </div>

                    <button class="btn btn-xl btn-circle btn-info shadow hand" id="btnLogin">
                        <i class="fal fa-lock"></i>
                    </button>
                </div>


            </div>
            `
        },
    }

    root.innerHTML = view.body();

};

function addListeners(){

    //login
    document.getElementById('btnLogin').addEventListener('click',()=>{

        let usuario = document.getElementById('cmbUsuario').ariaValueMax;
        
        switch (usuario) {
            case 'ADMIN':
                
                Navegar.inicio_admin();
                break;
            case 'USUARIO':
                Navegar.inicio_usuario();
                break;
            default:
                break;
        }

    })



};

function initView(){

    getView();
    addListeners();

};
