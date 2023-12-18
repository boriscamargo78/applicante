const config = require('../../config.js');
const usersModel = require(
    __dirname + '/../models/usersModel.js'
).usersModel;

const nodemailer = require('nodemailer');
const usersController = {};

// Metodo Guardar - Create

usersController.guardar = async function (request, response) {
    var post = {
        name: request.body.name,
        lastname: request.body.lastname,
        email: request.body.email,
        password: request.body.password
    };

    try {
        if (!post.name || !post.lastname || !post.email || !post.password) {
            return response.json(
                {state: false, mensaje: "Todos los campos son obligatorios"}
            );
        }

        // Validación de que el email no esté repetido
        const valida = await usersModel.ValidarEmailExiste(post);

        if (!valida.state) {
            return response.json(
                {state: false, mensaje: "Se presentó un error validando el email"}
            );
        }

        if (valida.existe) {
            return response.json(
                {state: false, mensaje: "Este mail ya existe en la base de datos. Usa otro"}
            );
        }

        if (!valida.existe) {
            const respuesta = await usersModel.guardar(post);
            const codactivacion = respuesta.codactivacion;

            // Add this line before creating the transporter
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: 'portos1978@gmail.com', // Use el user y el password aquí porque no los está tomando del archivo config.js
                    pass: 'jxkxlyytxwgwygrd', // Use the generated app password here
                }
            });

            // Email Template configuration (Deactivate antivirus for blocking emails)
            let mailOptions = {
                from: config.correogmail,
                to: post.email,
                subject: 'Activacion de cuenta',
                html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #000000; margin: 0; padding: 42px;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h1 style="font-size: 24px; color: #333333; margin-bottom: 20px;">Activación de cuenta</h1>
                        <p>Hola,</p>
                        <p>Gracias por registrarte en nuestro sitio. Para activar tu cuenta, haz click en el siguiente enlace:</p>
                        <p><a style="display: inline-block; padding: 10px 20px; background-color: #C44800; color: #ffffff; text-decoration: none;" href="http://localhost:4200/activarcuenta/${post.email}/${codactivacion}">Enlace de activación</a></p>
                        <p>Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:</p>
                        <p>http://localhost:4200/activarcuenta/${post.email}/${codactivacion}</p>
                        <p>Si no has creado una cuenta en nuestro sitio, puedes ignorar este correo electrónico.</p>
                        <p>Saludos,</p>
                        <p>El equipo de Applicante</p>
                    </div>
                </div>`
            };

            // Se envía el email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    response.json({state: false, error: error});
                } else {
                    console.log(info);
                    response.json(
                        {state: true, mensaje: 'Usuario creado correctamente, hemos enviado un correo de activación de cuenta'}
                    );
                }
            });
        }
    } catch (error) {
        console.error(error);
        response.json(
            {state: false, mensaje: 'Error inesperado', error: error.message}
        );
    }
};

// Metodo listar

usersController.listar = function(request, response) {
    usersModel.listar(null, function(respuesta) {
        response.json(respuesta)
    })
};

// Metodo Listar por Id

usersController.listarporId = function(request, response) {
    var post = {
        _id: request.body._id // Assuming you send the _id in the request body
    };

    if (!post._id) {
        response.json({ state: false, mensaje: "El campo _id es obligatorio" });
        return;
    }

    usersModel.listarporId(post, function(respuesta) {
        response.json(respuesta);
    });
};

// Metodo Modificar

usersController.modificar = function(request, response) {
    var post = {
        _id: request.body._id,
        name: request.body.name,
        lastname: request.body.lastname,
        rol: request.body.rol
    }

    if (post.rol == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "El campo id_ es obligatorio"})
        return false
    }

    if (post.rol == undefined || post.rol == null || post.rol == "") {
        response.json({ state:false,mensaje:"El campo rol es obligatorio"})
    } 

    usersModel.modificar(post, function(respuesta){
        response.json(respuesta)
    })
}

// Metodo Eliminar

usersController.eliminar = function(request, response) {
    var post = {
        _id: request.body._id,
    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "El campo id_ es obligatorio"})
        return false
    }

    usersModel.eliminar(post,function(respuesta) {
        response.json(respuesta)
    })
        
    }

// Metodo Loguear - Login

usersController.login = function (request, response) {
    console.log("Login route alcanzado"); // Para ver si intenta conectar

    var post = {
        email: request.body.email,
        password: request.body.password
    };

    if (post.email == undefined || post.email == null || post.email == "") {
        response.json({state: false, mensaje: "El campo email es necesario" })
        return false;
    }

    if (post.password == undefined || post.password == null || post.password == "") {
        response.json({state: false, mensaje: "El campo password es necesario"})
        return false;
    }
     
    usersModel.ValidarUsuarioActivo(post, function (estado) {

        if (estado.state == false) {
            response.json({state: false, mensaje: 'No se pudo verificar el email'})
            return false
        } else {
            console.log(estado);
            if (estado.documentos[0].estado == 0) {
                response.json({state: false, mensaje: 'Cuenta inactiva'})
                return false
            } else {
                console.log("Intentando loguearme")
                // Si usuario es activo
                usersModel.login(post, function (respuesta) {
                    console.log(respuesta)
                    if (respuesta.state == true) {
                        // Creamos datos de sesion
                        request.session.usuario_id = respuesta
                            .documentos[0]
                            ._id;
                        request.session.email = respuesta
                            .documentos[0]
                            .email;
                        request.session.name = respuesta
                            .documentos[0]
                            .name;
                        request.session.lastname = respuesta
                            .documentos[0]
                            .lastname;
                        request.session.rol = respuesta
                            .documentos[0]
                            .rol;
                        request.session.fechaactivacion = respuesta
                            .documentos[0]
                            .fechaactivacion;

                        response.json({
                            state: true,
                            mensaje: "Bienvenido " + respuesta
                                .documentos[0]
                                .name
                        })
                    } else {
                        response.json(
                            {state: false, mensaje: "Error al iniciar sesion", error: respuesta.error}
                        );
                    }
                })
            }
        }
    });
};

// Metodo Activar Cuenta

usersController.ActivarCuenta = function (request, response) {
    const post = {
        email: request.body.email,
        codigo: request.body.codigo
    };

    if (!post.email || !post.codigo) {
        response.json({state: false, mensaje: "Campos email y código son necesarios"});
        return;
    }

    try {
        usersModel.ValidarUsuarioActivo(post, function(estado){
           
            if (!estado.state) {
                response.json({state: false, mensaje: "No se pudo verificar el email"});
                return;
            }
    console.log(estado)
            if (estado.documentos[0].estado === 1) {
                response.json({state: false, mensaje: "La cuenta ya está activa"});
                return;
            }
            
            usersModel.ActivarCuenta(post, function(respuesta){
                    if (respuesta.name != undefined) {
    response.json({state: true, mensaje:"Usuario activado"})
               
         } else {
            response.json({state: false, mensaje:"se presento un problema al activar"})
         }
        })

    

        });

       
    } catch (error) {
        console.error(error);
        response.json(
            {state: false, mensaje: "Error inesperado", error: error.message}
        );
    }
};

// Metodo Logout

usersController.Logout = function (request, response) {
    request
        .session
        .destroy() //Destruye la sesion
    response.json({state: true, mensaje: "Se ha cerrado la sesion correctamente"})
}

// Metodo Estado Sesión

usersController.EstadoSesion = function (request, response) {
    console.log(request.session);
    response.json({datos: request.session})
}

// Metodo Solicitar Codigo Contraseña

usersController.SolicitarCodigoContrasena = function (request, response) {
    var post = {
        email: request.body.email
    }
    if (post.email == undefined || post.email == null || post.email == "") {
        response.json({state: false, mensaje: "El Campo email es obligatorio"})
        return false //Para que no continue
    }

    // Se calcula el tiempo que ha pasado desde que se solicito un codigo anterior o
    // que se creo el registro

usersModel.TiempoTranscurridoCodigoRec(post, function (tiempo) {
        var fechasolicitud = tiempo
            .data[0]
            .fechacodrec;
        var fechaactual = new Date()
        fechaactual.setHours(fechaactual.getHours() - 5) //Se restan 5 horas para coincidir con el time zone
        var diferenciaenmilisegundos = fechaactual - fechasolicitud
        var minutostranscurridos = diferenciaenmilisegundos / 1000 / 60
        console.log('Minutos Transcurridos: ' + minutostranscurridos)

        if (minutostranscurridos < 5) { // Solo si han pasado menos de 5 minutos
            response.json(
                {state: false, mensaje: "Hemos enviado previamente un codigo o te acabas de registrar, espera 5 minutos"}
            )
        } else {
usersModel.SolicitarCodigoContrasena(post, function (respuesta) {
                // Crearemos un codigo en el modelo y enviaremos un email
                if (respuesta.state == true) {
                    //Desactivar antivirus para que se envien los emails
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: 'portos1978@gmail.com',
                            pass: 'jxkxlyytxwgwygrd'
                        }
                    })

                    let mailOptions = {
                        from: config.correogmail,
                        to: post.email,
                        subject: "Codigo de recuperación",
                        html: `<div style="background: #000000; padding: 24px; border-radius: 9px;">
                    <div class="container" style="max-width:400px; margin: 0 auto; background-color: #fff; padding:24px; border: 1px solid #ccc; border-radius: 4px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <h2 style="text-align: center; margin-bottom: 32px;">Codigo de Recuperacion</h2>
                        <div class="code" style="text-align: center; font-size: 24px; margin-bottom: 20px; padding: 10px; background-color: #f5f5f5; border: 1px solid #ccc; border-radius: 4px;">${respuesta.codigorec}</div>
                        <p style="margin-bottom: 20px;">Hola,</p>
                        <p style="margin-bottom: 20px;">Recibimos una solicitud de recuperación de contraseña para tu cuenta. Utiliza el siguiente codigo de activación para continuar con el proceso:</p>
                        <p class="code" style="text-align: center; font-size: 24px; margin-bottom: 24px; padding: 10px; background-color: #C44800; border: 1px solid #ccc; border-radius: 4px;">${respuesta.codigorec}</p>
                        <p style="margin-bottom: 20px;">Si no realizaste esta solicitud, puedes ignorar este mensaje.</p>
                        <p class="note" style="font-size: 14px; text-align: center;">Este mensaje es generado automáticamente. Por favor no respondas a él.</p>
                        <p>Saludos,</p>
                        <p>El equipo de Applicante</p>
                    </div>    
                </div>`
                    }

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error)
                            response.json({state: false, error: error})
                            return false
                        } else {
                            console.log(info)
                            response.json(
                                {state: true, mensaje: "Hemos enviado tu codigo de recuperacion"}
                            )
                        }
                    })
                } else {
                    response.json(
                        {state: false, mensaje: "Error al solicitar el codigo de recuperacion", error: respuesta.error}
                    )
                }

            });
        }

    })
}

module.exports = usersController;
