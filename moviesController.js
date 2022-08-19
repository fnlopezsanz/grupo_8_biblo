const db = require("../database/models");
const { Op } = db.sequelize;

module.exports = {
    list: (req, res) => {
        db.movie.findAll()
        .then(function(peliculas){
            return res.render("moviesList", { movies: peliculas })
        })
    },
    detail: (req, res) => {
        const id = req.params.id;
        db.movie.findByPk(id)
        .then(function(pelicula){
            return res.render("moviesDetail", { movie: pelicula })
        })
    },
    new: (req, res) => {
        db.movie.findAll({
            order: [["release_date", "desc"]],
            limit: 5
        })
        .then(function(movies){
            return res.render("newestMovies", { movies })
        })
    },
    recomended: (req, res) => {
        db.movie.findAll({
            where: {
                rating: {
                  [Op.gte]: 7
                }
              }
        })
        .then(function(movies) {
            return res.render("recommendedMovies", {movies})
        })
    },
    add: (req, res) => {
        return res.render("moviesAdd");
    },
    create: (req, res) => {
        //recibe la info de una peli nueva
        db.movie.create({
            title: req.body.title,
            awards: req.body.awards,
            length: req.body.length,
            release_date: req.body.release_date,
            rating: req.body.rating
        })
        .then(function(){
            return res.redirect("/movies")
        })
    },
    edit: (req, res) => {
        const id = req.params.id;
        db.movie.findByPk(id)
        .then(function(Movie){
            return res.render("moviesEdit", { Movie });
        })
    },
    update: (req, res) => {
        const id = req.params.id;
        db.movie.update({
            title: req.body.title,
            awards: req.body.awards,
            length: req.body.length,
            release_date: req.body.release_date,
            rating: req.body.rating
        },{
            where: {
                id
            }
        })
        .then(function(){
            return res.redirect("/movies");
        })
    },
    delete: (req, res) => {
        db.movie.findByPk(req.params.id)
        .then(function(Movie){
            return res.render("moviesDelete", { Movie });
        })
    },
    destroy: (req, res) => {
        const id = req.params.id;
        db.movie.destroy({ where: { id }})
        .then(function(){
            return res.redirect("/movies");
        })
    },
    moviesDeleted: (req, res) => {
        db.movie.findAll({ 
            where: {
                deleted_at:{
                    [Op.gt]: 0,
                },
            },
            paranoid: false
        })
        .then(function(movies){
            return res.json(movies)
        })
    }
}