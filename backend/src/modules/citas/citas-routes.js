const express = require('express');
const { body } = require('express-validator');
const citasController = require('./citas-controller');

const router = express.Router();

router.post(
  '/',
  [
    body('medico').notEmpty().withMessage('El campo medico es obligatorio'),
    body('paciente').notEmpty().withMessage('El campo paciente es obligatorio'),
    body('fechaC').isISO8601().withMessage('La fechaC debe tener formato YYYY-MM-DD'),
    body('sede').notEmpty().withMessage('El campo sede es obligatorio'),
    body('especialidad').notEmpty().withMessage('El campo especialidad es obligatorio')
  ],
  citasController.agendarCita
);


router.get('/', citasController.listarCitas);


router.delete('/cancelar/:id', citasController.cancelarCitaPorId);


router.get('/usuario',  citasController.obtenerCitasPorUsuario);

module.exports = router;
