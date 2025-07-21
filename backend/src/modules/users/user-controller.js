const { getConnection } = require('@infra/database-connection');
const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next({ status: 401, message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto123');
    req.user = decoded;
    next();
  } catch (err) {
    return next({ status: 403, message: 'Token inválido o expirado' });
  }
};

// Obtener todos los usuarios
const listarUsuarios = async (req, res, next) => {
  try {
    const connection = getConnection();
    const [rows] = await connection.promise().query('SELECT dni, nombres, apellidoP, apellidoM, edad, Sexo, correo, telefono, direccion, rol, fechaN FROM users');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// Listar solo médicos
const listarMedicos = async (req, res, next) => {
  try {
    const connection = getConnection();
    const [rows] = await connection.promise().query("SELECT dni, nombres, apellidoP, apellidoM, edad, Sexo, correo, telefono, direccion, rol, fechaN FROM users WHERE rol = 'medico'");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// Listar solo pacientes
const listarPacientes = async (req, res, next) => {
  try {
    const connection = getConnection();
    const [rows] = await connection.promise().query("SELECT dni, nombres, apellidoP, apellidoM, edad, Sexo, correo, telefono, direccion, rol, fechaN FROM users WHERE rol = 'paciente'");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// Buscar por DNI
const buscarPorDNI = async (req, res, next) => {
  try {
    const { dni } = req.params;
    const connection = getConnection();
    const [rows] = await connection.promise().query('SELECT dni, nombres, apellidoP, apellidoM, edad, Sexo, correo, telefono, direccion, rol, fechaN FROM users WHERE dni = ?', [dni]);

    if (rows.length === 0) {
      return next({ status: 404, message: 'Usuario no encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verificarToken,
  listarUsuarios,
  listarMedicos,
  listarPacientes,
  buscarPorDNI
};
