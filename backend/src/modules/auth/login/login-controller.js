const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { getConnection } = require('@infra/database-connection');
const bcrypt = require('bcrypt');

const loginController = async (req, res, next) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ status: 400, message: 'Datos inválidos', errors: errors.array() });
    }

    const { dni, contrasena } = req.body;

  
    const connection = getConnection();
    const [rows] = await connection
      .promise()
      .query('SELECT * FROM users WHERE dni = ?', [dni]);

    if (rows.length === 0) {
      return next({ status: 401, message: 'DNI inválido' });
    }

    const user = rows[0];


    const esValido = await bcrypt.compare(contrasena, user.contrasena);
   
    if (!esValido) {
      return next({ status: 401, message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.dni, rol: user.rol, nombres: user.nombres },
      process.env.JWT_SECRET || 'secreto123',
      { expiresIn: '1h' }
    );

   
    res.json({ token, user: { dni: user.dni, nombres: user.nombres, rol: user.rol } });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginController };
