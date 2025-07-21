const express = require('express');
const router = express.Router();
const usuariosController = require('./user-controller');

router.get('/', usuariosController.verificarToken, usuariosController.listarUsuarios);
router.get('/medicos', usuariosController.verificarToken, usuariosController.listarMedicos);
router.get('/pacientes', usuariosController.verificarToken, usuariosController.listarPacientes);
router.get('/:dni', usuariosController.verificarToken, usuariosController.buscarPorDNI);

module.exports = router;
