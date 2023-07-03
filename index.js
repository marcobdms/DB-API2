
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


// ================================ TABLA PRODUCTOS ================================ //


// Obtener todos los productos
app.get('/listarproductos', (req, res) => {
  db.query('SELECT * FROM productos', (error, results) => {
    if (error) throw error;
    res.render('listarproductos', { productos: results });
  });
});

app.get('/listarfabricantes', (req, res) => {
  db.query('SELECT * FROM fabricantes', (error, results) => {
    if (error) throw error;
    res.render('listarfabricantes', { fabricantes: results });
  });
});

app.get('/listarcategorias', (req, res) => {
  db.query('SELECT * FROM categorias', (error, results) => {
    if (error) throw error;
    res.render('listarcategorias', { categorias: results });
  });
});

// Mostrar formulario para agregar un producto
app.get('/agregarproducto', (req, res) => {
  res.render('agregarproducto');
});

// Agregar un producto a la base de datos
app.post('/agregarproducto', (req, res) => {
  const { nombre, precio, stock } = req.body;
  db.query('INSERT INTO productos SET ?', { nombre, precio, stock }, (error, result) => {
    if (error) throw error;
    res.redirect('/listarproductos');
  });
});

// Mostrar formulario para editar un producto
app.get('/editarproducto/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM productos WHERE id = ?', id, (error, result) => {
    if (error) throw error;
    res.render('/editarproducto', { productos: result[0] });
  });
});

// Actualizar un producto en la base de datos
app.post('/editarproducto/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, precio, stock } = req.body;
  db.query('UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?', [nombre, precio, stock, id], (error, result) => {
    if (error) throw error;
    res.redirect('/listarproductos');
  });
});

// Eliminar un producto de la base de datos
app.get('/eliminarproducto/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM productos WHERE id = ?', id, (error, result) => {
    if (error) throw error;
    res.redirect('/listarproductos');
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});


// ================================ TABLA FABRICANTES ================================ //

