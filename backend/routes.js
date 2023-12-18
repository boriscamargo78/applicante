var obligasesion = function(request,response,next){
    var idusuario = request.session.usuario_id

    if(idusuario == undefined || idusuario == null || idusuario == ""){
        response.json({state:false,mensaje:"Debes iniciar sesión"})
    }
    else{
        next()
    }
} // Protege las rutas hasta que el usuario inicie sesión

var soloAdmin = function(request,response,next){
    var rol = request.session.rol

    if (rol != 1) {
        response.json({state:false,mensaje:"Solo Admins pueden usar esta Api"})
    } else {
        next()
    }
};

const usersController = require(__dirname + "/api/controller/usersController.js");
const candidatesController = require(__dirname + "/api/controller/candidatesController.js");
const rolesController = require(__dirname + "/api/controller/rolesController.js");




// 01 CRUD para Users/Reclutadores ////////////////////////////////////////////

app.post("/users/guardar", obligasesion,soloAdmin, function(request, response) {
    usersController.guardar(request, response)
})

app.post("/users/listar", obligasesion, function(request, response) {
    usersController.listar(request, response)
})

app.post("/users/listarporId", obligasesion, function(request, response) {
    usersController.listarporId(request, response)
})

app.post("/users/modificar", obligasesion, function(request, response) {
    usersController.modificar(request, response)
})

app.post("/users/eliminar", obligasesion, function(request, response) {
    usersController.eliminar(request, response)
})

app.post("/users/login", function(request, response) {
    usersController.login(request, response)
})

app.post("/users/ActivarCuenta", function(request, response) {
    usersController.ActivarCuenta(request, response)
})

app.post("/users/EstadoSesion", function(request, response) {
    usersController.EstadoSesion(request, response)
})

app.post("/users/SolicitarCodigoContrasena", function(request, response) {
    usersController.SolicitarCodigoContrasena(request, response)
})

app.post("/users/ValidarUsuarioActivo", function(request, response) {
    usersController.ValidarUsuarioActivo(request, response)
})

app.post("/users/State", obligasesion, function(request, response) {
    response.json(request.session)
})

app.post("/users/Logout", function(request, response) {
    request.session.destroy()
    response.json({state:true,mensaje:"Se cerró la sesión"})
})


// CRUD para Users/Candidatos ////////////////////////////////////////////

app.post("/candidates/guardar", obligasesion, function(request, response) {
    candidatesController.guardar(request, response)
})

app.post("/candidates/listar", obligasesion, function(request, response) {
    candidatesController.listar(request, response)
})

app.post("/candidates/listarActivos", obligasesion, function(request, response) {
    candidatesController.listarActivos(request, response)
})

app.post("/candidates/modificar", obligasesion, function(request, response) {
    candidatesController.modificar(request, response)
})

app.post("/candidates/eliminar", obligasesion, function(request, response) {
    candidatesController.eliminar(request, response)
})

app.post("/candidates/listarporId", obligasesion, function(request, response) {
    candidatesController.listarporId(request, response)
})


// CRUD para Vacantes/roles ////////////////////////////////////////////

app.post("/roles/guardar", obligasesion, function(request, response) {
    rolesController.guardar(request, response)
})

app.post("/roles/listar", obligasesion, function(request, response) {
    rolesController.listar(request, response)
})

app.post("/roles/listarActivos", obligasesion, function(request, response) {
    rolesController.listarActivos(request, response)
})

app.post("/roles/modificar", obligasesion, function(request, response) {
    rolesController.modificar(request, response)
})

app.post("/roles/eliminar", obligasesion, function(request, response) {
    rolesController.eliminar(request, response)
})

app.post("/roles/listarporId", obligasesion, function(request, response) {
    rolesController.listarporId(request, response)
})

