// src/modules/auth/login/login-routes.js

const express = require('express');
const { check } = require('express-validator');
const { loginController } = require('./login-controller');

const router = express.Router();

router.post(
  '/',
  [
    check('dni', 'DNI es requerido').notEmpty(),
    check('contrasena', 'Contraseña es requerida').notEmpty(),
  ],
  loginController
);

module.exports = router;
