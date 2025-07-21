const bcrypt = require('bcrypt');
const { getConnection } = require('@infra/database-connection');
const register = async (req, res, next) => {
  try {
    const {
      dni,
      nombres,
      apellidoP,
      apellidoM,
      edad,
      sexo,
      email,
      telefono,
      direccion,
      password,
      confirmPassword,
      rol,
      fechaN
    } = req.body;
    const connection = getConnection();
    const fechaJS = new Date(req.body.fechaN);
    const fechaMySQL = fechaJS.toISOString().split('T')[0];
    // Validaciones básicas
    if (!dni || !nombres || !apellidoP || !email || !password || !confirmPassword) {
      return next({ status: 400, message: 'Faltan campos obligatorios' });
    }

    if (password !== confirmPassword) {
      return next({ status: 400, message: 'Las contraseñas no coinciden' });
    }



    // Verificar si el usuario ya existe por DNI
    const [existing] = await connection.promise().query('SELECT * FROM users WHERE dni = ?', [dni]);
    if (existing.length > 0) {
      return next({ status: 400, message: 'El DNI ya está registrado' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   
    // Insertar usuario
    await connection.promise().query(
      `INSERT INTO users (dni, nombres, apellidoP, apellidoM, edad, sexo, correo, telefono, direccion, contrasena, rol, fechaN)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        dni,
        nombres,
        apellidoP,
        apellidoM,
        edad,
        sexo,
        email,
        telefono,
        direccion,
        hashedPassword,
        rol,
        fechaMySQL
      ]
    );

    res.status(201).json({ msg: 'Usuario registrado correctamente' });

  } catch (error) {
    next({ status: 500, message: 'Error en el servidor', error });
  }
};

module.exports = { register };
