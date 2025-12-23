let Navegar = {
    login:()=>{
        F.loadScript('./views/login.js','root')
        .then(()=>{
            document.getElementById("rootFooter").innerHTML = '';
            initView();
        })
    },
    inicio_admin:()=>{
        F.loadScript('./views/inicio_admin.js','root')
        .then(()=>{
            document.getElementById("rootFooter").innerHTML = '';
            initView();
        })
    },
     inicio_usuario:()=>{
        F.loadScript('./views/inicio_usuario.js','root')
        .then(()=>{
            document.getElementById("rootFooter").innerHTML = '';
            initView();
        })
    }
}