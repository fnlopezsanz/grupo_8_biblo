const controller = {
    index: (req,res) => {
       res.render("users/home");
    },
    login: (req,res) => {
        res.render("users/login");
    },
    register: (req,res) => {
        res.render("users/register");
    },
    carrito: (req, res) => {
        res.render("users/carrito");
    },
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

module.exports = controller;