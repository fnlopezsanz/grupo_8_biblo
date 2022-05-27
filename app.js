const express = require("express");
const path = require("path")

const app = express();

const PORT = process.env.PORT || 3000

const publicPath = path.join(__dirname, "/public");
app.use(express.static(publicPath));

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
});

app.get("/", (req, res) => {
    const home = path.join(__dirname, "/views/home.html");
    res.sendFile(home);
});

app.get("/producto", (req, res) => {
    const home = path.join(__dirname, "/views/producto.html");
    res.sendFile(home);
});

app.get("/carrito", (req, res) => {
    const carrito = path.join(__dirname, "/views/carrito.html");
    res.sendFile(carrito);
});

app.get("/register", (req, res) => {
    const register = path.join(__dirname, "/views/register.html");
    res.sendFile(register);
});

app.get("/login", (req, res) => {
    const login = path.join(__dirname, "/views/login.html");
    res.sendFile(login);
});
