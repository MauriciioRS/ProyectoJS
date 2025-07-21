const express = require('express');
const router = express.Router();
const db = require('../../infraestructure/database-connection');


router.get('/', (req, res) => {
  const conn = db.getConnection();
  conn.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
});


router.post('/', (req, res) => {
  const u = req.body;
  const conn = db.getConnection();

  const sql = `INSERT INTO users 
    (DNI, Usuario, Correo, Contrasena, Telefono, Edad, Direccion, Sexo, Nombres, ApellidoPaterno, ApellidoMaterno)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const valores = [
    u.DNI,
    u.Usuario,
    u.Correo,
    u.Contrasena,
    u.Telefono,
    u.Edad,
    u.Direccion,
    u.Sexo,
    u.Nombres,
    u.ApellidoPaterno,
    u.ApellidoMaterno
  ];

  conn.query(sql, valores, (err, result) => {
    if (err) {
      console.error('Error al agregar usuario:', err);
      return res.status(500).json({ error: 'Error al agregar usuario' });
    }
    res.status(201).json({ mensaje: 'Usuario agregado exitosamente' });
  });
});


router.put('/:dni', (req, res) => {
  const dni = req.params.dni;
  const u = req.body;
  const conn = db.getConnection();

  const sql = `UPDATE users SET 
    Usuario = ?, 
    Correo = ?, 
    Contrasena = ?, 
    Telefono = ?, 
    Edad = ?, 
    Direccion = ?, 
    Sexo = ?, 
    Nombres = ?, 
    ApellidoPaterno = ?, 
    ApellidoMaterno = ?
    WHERE DNI = ?`;

  const valores = [
    u.Usuario,
    u.Correo,
    u.Contrasena,
    u.Telefono,
    u.Edad,
    u.Direccion,
    u.Sexo,
    u.Nombres,
    u.ApellidoPaterno,
    u.ApellidoMaterno,
    dni
  ];

  conn.query(sql, valores, (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario actualizado exitosamente' });
  });
});

router.delete('/:dni', (req, res) => {
  const dni = req.params.dni;
  const conn = db.getConnection();

  conn.query('DELETE FROM users WHERE DNI = ?', [dni], (err, result) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  });
});

module.exports = router;