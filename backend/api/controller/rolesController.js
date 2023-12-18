//El controlador es el encargado de validar
var { rolesModel, Role } = require("../models/rolesModel.js");

var rolesController = {}

//Metodo Guardar - Create

rolesController.guardar = function(request, response){

        try {     
            var post = {
                role:request.body.role,
                descripcion:request.body.descripcion,
                skills:request.body.skills,
                rol:request.body.rol,
                estado:request.body.estado
                
            }

            if (post.role == undefined || post.role == null || post.role == "") {
                response.json({ state: false, mensaje:"Vacante es obligatorio" })
                return false
            }

            if (post.descripcion == undefined || post.descripcion == null || post.descripcion == "") {
                response.json({ state: false, mensaje:"Una descripcion es obligatoria" })
                return false
            }

            if (post.skills == undefined || post.skills == null || post.skills == "") {
                response.json({ state: false, mensaje:"Skills son obligatorias" })
                return false
            }

            if (post.rol == undefined || post.rol == null || post.rol == "") {
                response.json({ state: false, mensaje:"Rol es obligatorio" })
                return false
            }
          
            if (post.estado == undefined || post.estado == null || post.estado == "") {
                response.json({ state: false, mensaje:"Estado es obligatorio" })
                return false
            }
          
rolesModel.guardar(post,function(respuesta){
                response.json(respuesta)
               })
            
                } catch (error) {
                    console.error(error);
                    response.json({sate:false, mensaje:"error inesperado", error: error})
                }
            }

//Metodo Leer/Listar - Read

rolesController.listar = function(request, response) {
    rolesModel.listar(null,function(respuesta){
        response.json(respuesta)
    })
}

//Metodo Leer/Listar - Read

rolesController.listarActivos = function(request, response) {
    rolesModel.listarActivos(null,function(respuesta){
        response.json(respuesta)
    })
}

//Metodo Modificar - Update

rolesController.modificar = function(request, response) {
    
    var post = {
        _id: request.body._id,
        role:request.body.role,
        descripcion:request.body.descripcion,
        skills:request.body.skills,
        rol:request.body.rol,       
        estado:request.body.estado,     
    };

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje:"El campo ID es obligatorio" })
        return false
    }
    
    if (post.role == undefined || post.role == null || post.role == "") {
    response.json({ state: false, mensaje:"El campo es Vacante es obligatorio" })
    return false
    }

    if (post.descripcion == undefined || post.descripcion == null || post.descripcion == "") {
        response.json({ state: false, mensaje:"El campo es Descripcion es obligatorio" })
        return false
    }

    if (post.skills == undefined || post.skills == null || post.skills == "") {
        response.json({ state: false, mensaje:"El campo es skills es obligatorio" })
        return false
    } 

    if (post.rol == undefined || post.rol == null || post.rol == "") {
        response.json({ state: false, mensaje:"El campo es Rol es obligatorio" })
        return false
    }
    
    rolesModel.modificar(post,function(respuesta) {
        response.json(respuesta)
    })    
}
 
//Metodo Eliminar - Delete

rolesController.eliminar = function(request, response) {

    var post = {
        _id:request.body._id
    };

    
    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje:"Este campo es obligatorio" });
        return;
    }

    rolesModel.eliminar(post,function(respuesta) {
        response.json(respuesta);        
    })    

}

// Metodo Listar por Id

rolesController.listarporId = function(request, response) {
    var post = {
        _id: request.body._id 
    };

    if (!post._id) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" });
        return;
    }

    rolesModel.listarporId(post, function(respuesta) {
        response.json(respuesta);
    });
};

module.exports = rolesController