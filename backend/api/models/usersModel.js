const mongoose = require('mongoose');
const usersModel = {};

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    codactivacion: String,
    fechaactivacion: Date,
    codrecuperacion: String,
    estado: Number,
    fechacodrec: Date,
    rol: Number
});


const userModel = mongoose.model('userModel', userSchema, 'users');



// Validar si existe email

usersModel.ValidarEmailExiste = async function (post) {
    try {
        const user = await userModel.findOne({email: post.email});
        return {
            state: true,
            existe: !!user
        };
    } catch (error) {
        console.error(error);
        return {state: false, existe: false, error: error.message};
    }
};

// Guardar usuario

usersModel.guardar = function (post) {
    return new Promise((resolve, reject) => {
        const instancia = new userModel({
            name: post.name,
            lastname: post.lastname,
            email: post.email,
            password: post.password,
            rol: 2,
            estado: 0
        });

        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        instancia.fechacodrec = fechaActual;
        instancia.fechaactivacion = "";
        instancia.codrecuperacion = "";
        instancia.codactivacion = Math.round(
            Math.random() * (999999 - 100000) + 100000
        );

        instancia
            .save()
            .then(
                (Creado) => resolve({state: true, codactivacion: instancia.codactivacion})
            )
            .catch((error) => reject({state: false, error: error}));
    });
};

// ValidarUsuarioActivo

usersModel.ValidarUsuarioActivo = function (post,callback) {
    userModel.find({ email: post.email }, { estado: 1}).then((res) => {
        console.log(res.length)
        if (res.length == 0) {
            return callback({ state: false, documentos: res })
        } else {
            return callback({ state: true, documentos: res })
        }
    })
};

// Loguear - Login

usersModel.login = function (post, callback) {
    console.log("usersModel.login function reached"); 
    userModel.find({ email: post.email, password: post.password }, { codactivacion: 0, password: 0}).then((res) => {
        console.log(res.length)
        if (res.length == 0) {
            return callback({ state: false, documentos: res })
        } else {
            return callback({ state: true, documentos: res })
        }
    })
};

// Eliminar

usersModel.eliminar = function(post, callback) {
    
    userModel.findByIdAndDelete(post._id).then((res) => {
        callback({ state: true, mensaje: "Se eliminó correctamente" })
    }).catch((error) => {
        callback({ state: false, mensaje: "Este elemento no existe, no se puede eliminar", error: error })
    })
}

// Metodo Listar 

usersModel.listar = function(post, callback) {

    userModel.find({}, {password:0, codigoact: 0 }).then((res) => {
        return callback(res)
    })
}

// Metodo Listar por Id

usersModel.listarporId = function(post, callback) {

    userModel.find({_id: post._id}, {password:0}).then((res) => {
        return callback(res)
    })
}

//Metodo Modificar

usersModel.modificar = function (post, callback) {

    userModel.findByIdAndUpdate(post._id, {
        name: post.name,
        lastname: post.lastname,
        rol: post.rol
    }).then((res) => {
        console.log(res)
        callback({state: true, mensaje: "Se actualizó el registro"})
    }).catch((error) => {
        callback({state:false,mensaje:"Este elemento no se encuentra en la base de datos", error: error})
    })
}

//Metodo Cambiar Estado

usersModel.CambiarEstado = function (post, callback) {
    userModel.findByIdAndUpdate({email:post.email, codigoact:post.codigo}, {
        estado: 1
    }).then((res) => {
        console.log(res)
        callback({state: true, mensaje: "Se actualizó el registro"})
    }).catch((error) => {
        callback({state:false,mensaje:"Este elemento no se encuentra en la base de datos", error: error})
    })
}

//Metodo Activar Cuenta

usersModel.ActivarCuenta = function (post, callback) {
    try {
        let fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);

        userModel.findOneAndUpdate(
            { email: post.email, codactivacion: post.codigo },
            { estado: 1, fechaactivacion: fechaActual }).then((res)=> {
         console.log(res)
         callback(res)
            }) 
          
        


    } catch (error) {
        return { state: false, error: error.message };
    }
};

//Metodo Código Activación

usersModel.BuscarCodigoActivacion = function (post, callback) {
    userModel.find({
        email: post.email,
        codactivacion: post.codigo
    }, (error, documentos) => {
        if (error) {
            return callback({ state: false, error: error });
        } else {
            return callback({ state: true, data: documentos });
        }
    });
};

//Metodo Tiempo Transcurrido

usersModel.TiempoTranscurridoCodigoRec = function (post, callback) {
    userModel.find({
        email: post.email
    }, {
        fechacodrec: 1
    }, (error, documentos) => {
        if (error) {
            return callback({state: false, error: error});
        } else {
            return callback({state: true, data: documentos});
        }
    });
};

//Metodo Solicitar Codigo Contraseña

usersModel.SolicitarCodigoContrasena = function (post, callback) {
    // Creamos un codigo aleatorio de 6 digitos
    var codigorec = Math.round(Math.random() * (999999 - 1000000) + 1000000); // Del 10000 al 999999
    let fechaactual = new Date();
    fechaactual.setHours(fechaactual.getHours() - 5);

    userModel.findOneAndUpdate({
        email: post.email
    }, {
        codrecuperacion: codigorec,
        fechacodrec: fechaactual
    }, (error, modificado) => {
        if (error) {
            return callback({state: false, error: error});
        } else {
            return callback({state: true, codigorec: codigorec});
        }
    });
};

module.exports.usersModel = usersModel
