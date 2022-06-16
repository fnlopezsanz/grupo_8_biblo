const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const readJsonFile = (path) => {
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const productsController = {
    detalle: (req,res) => {
        res.render("products/detalleProducto");
    },
    crear: (req,res) => {
        res.render("products/crearProducto");
    },
    editar: (req,res) => {
        res.render("products/editarProducto");
    },
    guardar: function (req,res) {
      let producto = {
        nombre: req.body.nombre,
        descripción: req.body.descripcion,
        género: req.body.genero,
        páginas: req.body.paginas,
        precio: req.body.precio,
        imagen: req.body.imagen
      };
      
      //GUARDARLA
      
      res.redirect('/');
    }
};

module.exports = productsController;