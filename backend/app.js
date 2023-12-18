const express = require("express");
global.app = express();
//instalamos el bodyparser para recibir peticiones post
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
global.config = require(__dirname + '/config.js').config;
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {name: String, lastname: String, email: String, password: String}
);

// Creamos los permisos de acceso para conectarse desde el front autorizando
// credenciales. Permite peticiones Crud de lado y lado
app.all('*', function (req, res, next) {

    var whitelist = req.headers.origin;
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header(
        'Access-Control-Allow-Headers',
        " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With," +
                " Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.header("Access-Control-Allow-Credentials", "true");

    // res.header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');

    next();

});

// Habilitamos los cors para ofrecer acceso desde la URL usando localhost:4200
// como origen permitido
var cors = require('cors');
app.use(cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"] // Métodos permitidos en BE
}));

const MongoStore = require("connect-mongo")
// Configuracion de sesiones para almacenar al hacer login usando
// express-session
var session = require('express-session')({
    secret: config.secretsesion, resave: true, //Actualiza la llave
    saveUninitialized: true,
    cookie: {
        path: "/",
        httpOnly: true,
        maxAge: config.tiemposesion
    },
    name: config.namecookie,
    /* store: MongoStore.create(
        {mongoUrl: "mongodb://127.0.0.1:27017/ApplicanteCookie"}
    ) */
});
app.use(session);

// Nos conectamos a la base de datos mongoose.set('strQuery', false);
mongoose
    .connect('mongodb://127.0.0.1:27017/applicance', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('conexion correcta al servidor');
    })
    .catch((error) => {
        console.error(error);
    });

// Creamos archivo de rutas
require(__dirname + '/routes.js');

// Se levanta el servidor
const puerto = 3000;
app.listen(puerto, function () {
    console.log("Servidor funcionando por el puerto " + puerto);
});
