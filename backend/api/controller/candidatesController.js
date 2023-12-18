//El controlador es el encargado de validar
var { candidatesModel, Candidate } = require("../models/candidatesModel.js");

var candidatesController = {}

//Metodo Guardar - Create

candidatesController.guardar = function(request, response){

        try {     
            var post = {
                name:request.body.name,
                lastname:request.body.lastname,
                email:request.body.email,
                rol:request.body.rol,
                estado:request.body.estado
                
            }

            if (post.name == undefined || post.name == null || post.name == "") {
                response.json({ state: false, mensaje:"Nombre es obligatorio" })
                return false
            }

            if (post.lastname == undefined || post.lastname == null || post.lastname == "") {
                response.json({ state: false, mensaje:"Apellido es obligatorio" })
                return false
            }

            if (post.email == undefined || post.email == null || post.email == "") {
                response.json({ state: false, mensaje:"Email es obligatorio" })
                return false
            }

            if (post.rol == undefined || post.rol == null || post.rol == "") {
                response.json({ state: false, mensaje:"Vacante es obligatorio" })
                return false
            }
          
            if (post.estado == undefined || post.estado == null || post.estado == "") {
                response.json({ state: false, mensaje:"Estado es obligatorio" })
                return false
            }
          
candidatesModel.guardar(post,function(respuesta){
                response.json(respuesta)
               })
            
                } catch (error) {
                    console.error(error);
                    response.json({sate:false, mensaje:"error inesperado", error: error})
                }
            }

//Metodo Leer/Listar - Read

candidatesController.listar = function(request, response) {
    candidatesModel.listar(null,function(respuesta){
        response.json(respuesta)
    })
}

//Metodo Leer/Listar - Read

candidatesController.listarActivos = function(request, response) {
    candidatesModel.listarActivos(null,function(respuesta){
        response.json(respuesta)
    })
}

//Metodo Modificar - Update

candidatesController.modificar = function(request, response) {
    
    var post = {
        _id: request.body._id,
        name:request.body.name,
        lastname:request.body.lastname,
        email:request.body.email,
        rol:request.body.rol,       
        estado:request.body.estado,     
    };

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje:"El campo ID es obligatorio" })
        return false
    }
    
    if (post.name == undefined || post.name == null || post.name == "") {
    response.json({ state: false, mensaje:"El campo es Nombre es obligatorio" })
    return false
    }

    if (post.lastname == undefined || post.lastname == null || post.lastname == "") {
        response.json({ state: false, mensaje:"El campo es Apellido es obligatorio" })
        return false
    }

/*     if (post.email == undefined || post.email == null || post.email == "") {
        response.json({ state: false, mensaje:"El campo es Email es obligatorio" })
        return false
    } */

    if (post.rol == undefined || post.rol == null || post.rol == "") {
        response.json({ state: false, mensaje:"El campo es Rol es obligatorio" })
        return false
    }
    
    candidatesModel.modificar(post,function(respuesta) {
        response.json(respuesta)
    })    
}
 
//Metodo Eliminar - Delete

candidatesController.eliminar = function(request, response) {

    var post = {
        _id:request.body._id
    };

    
    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje:"Este campo es obligatorio" });
        return;
    }

    candidatesModel.eliminar(post,function(respuesta) {
        response.json(respuesta);        
    })    

}

// Metodo Listar por Id

candidatesController.listarporId = function(request, response) {
    var post = {
        _id: request.body._id // Assuming you send the _id in the request body
    };

    if (!post._id) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" });
        return;
    }

    candidatesModel.listarporId(post, function(respuesta) {
        response.json(respuesta);
    });
};

module.exports = candidatesController