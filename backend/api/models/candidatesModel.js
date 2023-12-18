const mongoose = require('mongoose');
// const Candidate = require('../models/candidatesModel').Candidate;
var candidatesModel = {};

const Schema = mongoose.Schema;

var candidateSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    rol: String,
    estado: String,

});

const Candidate = mongoose.model('Candidate', candidateSchema);

// Guardar usuario

candidatesModel.guardar = function (post, callback) {    
    const instancia = new Candidate({
    name : post.name,
    lastname : post.lastname,
    email : post.email,
    rol : post.rol,
    estado : 1,   
});
    instancia
        .save().then((res) => {
            console.log(res)
            return callback({ state: true, mensaje: "Se almaceno el candidato"})
        }).catch((error) => {
            return callback({state: false, mensaje: "Se presentó un error al guardar"})
})
}

// Metodo Listar 

candidatesModel.listar = function(post, callback) {

    Candidate.find({}, {}).then((res) => {
        return callback(res)
    })
}

// Metodo Listar 

candidatesModel.listarActivos = function(post, callback) {

    Candidate.find({estado:1}, {}).then((res) => {
        return callback(res)
    })
}

//Metodo Modificar

candidatesModel.modificar = function (post, callback) {

    Candidate.findByIdAndUpdate(post._id, {
        name: post.name,
        lastname: post.lastname,
        email: post.email,
        rol: post.rol,
        estado: post.estado
    }).then((res) => {
        console.log(res)
        callback({state: true, mensaje: "Se actualizó el registro"})
    }).catch((error) => {
        callback({state:false,mensaje:"Este elemento no se encuentra en la base de datos", error: error})
    })
}

// Eliminar

candidatesModel.eliminar = function(post, callback) {
    
    Candidate.findByIdAndDelete(post._id).then((res) => {
        callback({ state: true, mensaje: "Se eliminó correctamente" })
    }).catch((error) => {
        callback({ state: false, mensaje: "Este elemento no existe, no se puede eliminar", error: error })
    })
}

// Metodo Listar por Id

candidatesModel.listarporId = function(post, callback) {

    Candidate.find({_id: post._id}).then((res) => {
        return callback(res)
    })
}

//Metodo Cambiar Estado

candidatesModel.CambiarEstado = function (post, callback) {
    candidatesModel.findByIdAndUpdate({email:post.email, codigoact:post.codigo}, {
        estado: 1
    }).then((res) => {
        console.log(res)
        callback({state: true, mensaje: "Se actualizó el registro"})
    }).catch((error) => {
        callback({state:false,mensaje:"Este elemento no se encuentra en la base de datos", error: error})
    })
}



module.exports = { candidatesModel, Candidate };

