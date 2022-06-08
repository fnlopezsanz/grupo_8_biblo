const controller = {
    index: (req,res) => {
       res.render("home");
    },
    login: (req,res) => {
        res.render("login");
    },
    register: (req,res) => {
        res.render("register");
    },
    carrito: (req, res) => {
        res.render("carrito");
    },
    detalle: (req,res) => {
        res.render("producto");
    },
    crear: (req,res) => {
        res.render("crearProducto");
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