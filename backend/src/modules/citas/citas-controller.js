const { validationResult } = require('express-validator');
const { getConnection } = require('@infra/database-connection');



  const generarIdAleatorio = () => Math.floor(Math.random() * 900000) + 100000;
  
const agendarCita = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ status: 400, message: 'Datos inválidos', errors: errors.array() });
    }

    const { medico, paciente, fechaC, sede, especialidad,fechaA, } = req.body;

    if (!medico || !paciente || !fechaC || !sede || !especialidad) {
      return next({ status: 400, message: 'Todos los campos son obligatorios' });
    }
    const connection = getConnection();
    let existe = true;
    let idCita= null;
    while (existe) {
      idCita = generarIdAleatorio();
      const [rows] = await connection.promise().query('SELECT 1 FROM citas WHERE id = ?', [idCita]);
      existe = rows.length > 0;
    }
    const fechaCJS = new Date(req.body.fechaC);
    const fechaMySQLC = fechaCJS.toISOString().split('T')[0];
    const fechaAJS = new Date(req.body.fechaA);
    const fechaMySQLA = fechaAJS.toISOString().split('T')[0];
    
    const sql = `
      INSERT INTO citas (id,medico, paciente, fechaC, sede, especialidad,fechaA)
      VALUES (?,?, ?, ?, ?, ?,?)
    `;

    await connection.promise().query(sql, [idCita, medico, paciente, fechaMySQLC, sede, especialidad, fechaMySQLA]);

    res.status(201).json({ message: 'Cita agendada exitosamente' });

  } catch (error) {
    next({ status: 500, message: 'Error al agendar cita', error });
  }
};

const listarCitas = async (req, res, next) => {
  try {
    const connection = getConnection();
    const [rows] = await connection.promise().query('SELECT * FROM citas ORDER BY fechaC DESC');

    res.json({ citas: rows });
  } catch (error) {
    next({ status: 500, message: 'Error al listar citas', error });
  }
  
};

const obtenerCitasPorUsuario = async (req, res, next) => {
  try {
    const connection = getConnection();
    const { dni, rol } = req.query;

   

    if (!dni || !rol) {
      return next({ status: 400, message: 'DNI y rol son obligatorios' });
    }

    let query = '';
    let params = [];

    if (rol === 'medico') {
      query = 'SELECT * FROM citas WHERE medico = ? ORDER BY fechaC DESC';
      params = [dni];
    } else if (rol === 'paciente') {
      query = 'SELECT * FROM citas WHERE paciente = ? ORDER BY fechaC DESC';
      params = [dni];
    } else {
      return next({ status: 400, message: 'Rol inválido. Debe ser "medico" o "paciente".' });
    }

    const [rows] = await connection.promise().query(query, params);
    res.json({ citas: rows });

  } catch (error) {
    next({ status: 500, message: 'Error al obtener citas por usuario', error });
  }
};

const cancelarCitaPorId = async (req, res, next) => {
  try {
    const connection = getConnection();
    const { id } = req.params;

    // Verifica si la cita existe
    const [rows] = await connection.promise().query('SELECT * FROM citas WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Cita no encontrada.' });
    }

    // Elimina la cita
    await connection.promise().query('DELETE FROM citas WHERE id = ?', [id]);
    res.json({ mensaje: 'Cita eliminada correctamente.' });
  } catch (error) {
    next({ status: 500, message: 'Error al eliminar la cita', error });
  }
};

module.exports = {
  agendarCita,
  listarCitas,
  cancelarCitaPorId,
  obtenerCitasPorUsuario,
};