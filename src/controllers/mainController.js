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
    }
}

module.exports = controller;