const mongoose = require('mongoose');
var rolesModel = {};

const Schema = mongoose.Schema;

var roleSchema = new Schema({
    role: String,
    descripcion: String,
    skills: String,
    rol: String,
    estado: String,

});

const Role = mongoose.model('Role', roleSchema);

// Guardar Vacante

rolesModel.guardar = function (post, callback) {    
    const instancia = new Role({
    role : post.role,
    descripcion : post.descripcion,
    skills : post.skills,
    rol : post.rol,
    estado : 1,   
});
    instancia
        .save().then((res) => {
            console.log(res)
            return callback({ state: true, mensaje: "Se almaceno la posicion"})
        }).catch((error) => {
            return callback({state: false, mensaje: "Se presentó un error al guardar"})
})
}

// Metodo Listar Vacantes

rolesModel.listar = function(post, callback) {

    Role.find({}, {}).then((res) => {
        return callback(res)
    })
}

// Metodo Listar Vacantes activas

rolesModel.listarActivos = function(post, callback) {

    Role.find({estado:1}, {}).then((res) => {
        return callback(res)
    })
}

//Metodo Modificar Vacantes

rolesModel.modificar = function (post, callback) {

    Role.findByIdAndUpdate(post._id, {
        role: post.role,
        descripcion: post.descripcion,
        skills: post.skills,
        rol: post.rol,
        estado: post.estado
    }).then((res) => {
        console.log(res)
        callback({state: true, mensaje: "Se actualizó el registro"})
    }).catch((error) => {
        callback({state:false,mensaje:"Este elemento no se encuentra en la base de datos", error: error})
    })
}

// Eliminar Vacantes

rolesModel.eliminar = function(post, callback) {
    
    Role.findByIdAndDelete(post._id).then((res) => {
        callback({ state: true, mensaje: "Se eliminó correctamente" })
    }).catch((error) => {
        callback({ state: false, mensaje: "Este elemento no existe, no se puede eliminar", error: error })
    })
}

// Metodo Listar por Id

rolesModel.listarporId = function(post, callback) {

    Role.find({_id: post._id}).then((res) => {
        return callback(res)
    })
}

//Metodo Cambiar Estado

rolesModel.CambiarEstado = function (post, callback) {
    rolesModel.findByIdAndUpdate({email:post.email, codigoact:post.codigo}, {
        estado: 1
    }).then((res) => {
        console.log(res)
        callback({state: true, mensaje: "Se actualizó el registro"})
    }).catch((error) => {
        callback({state:false,mensaje:"Este elemento no se encuentra en la base de datos", error: error})
    })
}

module.exports = { rolesModel, Role };

