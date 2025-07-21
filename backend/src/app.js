
require('dotenv').config();


const { verifyToken } = require('./middlewares/auth-middleware');

const { handleHttpError } = require('./responses/error-handler');



const cors = require('cors');

const express = require('express');




const config = require('./config');



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
//rutas publicas
app.use('/api/auth/login', require('./modules/auth/login/login-routes'));
app.use('/api/auth/register', require('./modules/auth/register/register-routers'));

//rutas protegidas
app.use('/api/citas', verifyToken, require('./modules/citas/citas-routes'));
app.use('/api/usuarios', verifyToken, require('./modules/users/user-routes'));
//app.use('/api/usuarios', verifyToken, require('./modules/usuarios/usuarios-routes'));
app.use(handleHttpError);

app.set('port', config.app.port);

console.log('Configurando rutas para clientes...');



module.exports = app;
