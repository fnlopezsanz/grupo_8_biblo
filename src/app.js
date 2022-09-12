const express = require("express");
const app = express();
const path = require("path")
const methodOverride = require("method-override");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 4000

const userLogMiddleware = require("./middlewares/userLogMiddleware");


app.use(methodOverride('_method'));
app.use(express.json());
app.use(session({ secret: '¡sh!', resave: false, saveUninitialized: false }));

app.use(cookieParser());

app.use(userLogMiddleware);

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "./public")));

const mainRoutes = require("./routes/mainRoutes");
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes");

const mainController = require("./controllers/mainController");
const usersController = require("./controllers/usersController");
const productsController = require("./controllers/productsController");

const apiProductsRoutes = require('./routes/api/apiProductsRoute');
const apiUsersRoutes = require('./routes/api/apiUsersRoute');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));



app.use("/", mainRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/api/products", apiProductsRoutes);
app.use("/api/users", apiUsersRoutes);


app.use((req, res, next) => {
    res.status(404).redirect("/")
})

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
}); 