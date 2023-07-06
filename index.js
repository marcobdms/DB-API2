
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

// Mostrar formulario para agregar un producto
app.get('/agregarproducto', (req, res) => {
  res.render('agregarproducto');
});

// Agregar un producto a la base de datos
app.post('/agregarproducto', (req, res) => {
  const { Nombre, Precio, Stock } = req.body;
  db.query('INSERT INTO productos SET ?', { Nombre, Precio, Stock }, (error, result) => {
    if (error) throw error;
    res.redirect('/listarproductos');
  });
});

// Mostrar formulario para editar un producto
app.get('/editarproductos/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM productos WHERE id = ?', id, (error, result) => {
    if (error) throw error;
    res.render('editarproductos', { producto: result[0] });
  });
});

// Actualizar un producto en la base de datos
app.post('/editarproductos/:id', (req, res) => {
  const id = req.params.id;
  const { Nombre, Precio, Stock } = req.body;
  db.query('UPDATE productos SET Nombre = ?, Precio = ?, Stock = ? WHERE id = ?', [Nombre, Precio, Stock, id], (error, result) => {
    if (error) throw error;
    res.redirect('/listarproductos');
  });
});

// Eliminar un producto de la base de datos
app.get('/eliminarproductos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM productos WHERE id = ?', id, (error, result) => {
    if (error) throw error;
    res.redirect('/listarproductos');
  });
});

//  ordenar por precio
app.get('/ordenarprecios/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM productos WHERE id = ? ORDER BY precio ASC', id, (error, result) => {
    if (error) throw error;
    res.render('editarproductos', { producto: result[0] });
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});



// ================================ TABLA FABRICANTES ================================ //


app.get('/listarfabricantes', (req, res) => {
  db.query('SELECT * FROM fabricantes', (error, results) => {
    if (error) throw error;
    res.render('listarfabricantes', { fabricantes: results });
  });
});

// Mostrar formulario para agregar un fabricante
app.get('/agregarfabricante', (req, res) => {
  res.render('agregarfabricante');
});

// Agregar un fabricante a la base de datos
app.post('/agregarfabricante', (req, res) => {
  const { Nombre } = req.body;
  db.query('INSERT INTO fabricantes SET ?', { Nombre }, (error, result) => {
    if (error) throw error;
    res.redirect('/listarfabricantes');
  });
});

// Mostrar formulario para editar un fabricante
app.get('/editarfabricante/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM fabricantes WHERE id = ?', id, (error, result) => {
    if (error) throw error;
    res.render('editarfabricante', { fabricante: result[0] });
  });
});

// Actualizar un fabricante en la base de datos
app.post('/editarfabricante/:id', (req, res) => {
  const id = req.params.id;
  const { Nombre } = req.body;
  db.query('UPDATE fabricantes SET Nombre = ? WHERE id = ?', [Nombre, id], (error, result) => {
    if (error) throw error;
    res.redirect('/listarfabricantes');
  });
});

// Eliminar un fabricante de la base de datos
app.get('/eliminarfabricante/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM fabricantes WHERE id = ?', id, (error, result) => {
    if (error) throw error;
    res.redirect('/listarfabricantes');
  });
});

// ================================ TABLA Categorias ================================ //


app.get('/listarcategorias', (req, res) => {
  db.query('SELECT * FROM categorias', (error, results) => {
    if (error) throw error;
    res.render('listarcategorias', { categorias: results });
  });
});

// Mostrar formulario para agregar una categoria
app.get('/agregarcategoria', (req, res) => {
  res.render('agregarcategoria');
});

// Agregar un fabricante a la base de datos
app.post('/agregarcategoria', (req, res) => {
  const { Nombre } = req.body;
  db.query('INSERT INTO categorias SET ?', { Nombre }, (error, result) => {
    if (error) throw error;
    res.redirect('/listarcategorias');
  });
});

// Mostrar formulario para editar un fabricante
app.get('/editarcategoria/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM categorias WHERE id = ?', id, (error, result) => {
    if (error) throw error;
    res.render('editarcategoria', { categoria: result[0] });
  });
});

// Actualizar un fabricante en la base de datos
app.post('/editarcategoria/:id', (req, res) => {
  const id = req.params.id;
  const { Nombre } = req.body;
  db.query('UPDATE categorias SET Nombre = ? WHERE id = ?', [Nombre, id], (error, result) => {
    if (error) throw error;
    res.redirect('/listarcategorias');
  });
});

// Eliminar un fabricante de la base de datos
app.get('/eliminarcategoria/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM categorias WHERE id = ?', id, (error, result) => {
    if (error) throw error;
    res.redirect('/listarcategorias');
  });
});