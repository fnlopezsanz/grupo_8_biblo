const express = require("express");
const app = express();
const path = require("path")
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000

const mainRoutes = require("./routes/mainRoutes");
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes");

const mainController = require("./controllers/mainController");
const usersController = require("./controllers/usersController");
const productsController = require("./controllers/productsController");

app.use(express.static(path.join(__dirname, "./public")));

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/views"));


app.use("/", mainRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
}); 