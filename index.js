
// index.js
const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home');
  });

// Obtener todos los usuarios
app.get('/listarproductos', (req, res) => {
  db.query('SELECT * FROM productos', (error, results) => {
    if (error) throw error;
    res.render('listarproductos', { productos: results });
  });
});

// Mostrar formulario para agregar un usuario
app.get('/agregar', (req, res) => {
  res.render('agregar');
});

// Agregar un usuario a la base de datos
app.post('/agregar', (req, res) => {
  const { nombre, correo } = req.body;
  db.query('INSERT INTO usuarios SET ?', { nombre, correo }, (error, result) => {
    if (error) throw error;
    res.redirect('/');
  });
});

// Mostrar formulario para editar un usuario
app.get('/editar/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM usuarios WHERE id = ?', id, (error, result) => {
    if (error) throw error;
    res.render('editar', { usuario: result[0] });
  });
});

// Actualizar un usuario en la base de datos
app.post('/editar/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, correo } = req.body;
  db.query('UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?', [nombre, correo, id], (error, result) => {
    if (error) throw error;
    res.redirect('/');
  });
});

// Eliminar un usuario de la base de datos
app.get('/eliminar/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM usuarios WHERE id = ?', id, (error, result) => {
    if (error) throw error;
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
