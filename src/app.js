const express = require("express");
const app = express();
const path = require("path")
const PORT = process.env.PORT || 3000

const mainRoutes = require("./routes/mainRoutes");
const mainController = require("./controllers/mainController")


app.use(express.static(path.join(__dirname, "./public")));


app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/views/users"));



app.use("/", mainRoutes);


/* app.get("/", (req, res) => {
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

*/

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
}); 