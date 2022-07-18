const express = require("express");
const app = express();
const path = require("path")
const methodOverride = require("method-override");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000

app.use(methodOverride('_method'));
app.use(session({secret: '¡sh!'}));
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const mainRoutes = require("./routes/mainRoutes");
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes");

const mainController = require("./controllers/mainController");
const usersController = require("./controllers/usersController");
const productsController = require("./controllers/productsController");

app.use(express.static(path.join(__dirname, "./public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


app.use("/", mainRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
}); 