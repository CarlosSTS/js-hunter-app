const express = require('express')
const routes = express.Router();

//importando controllers
const ProductController= require('./controllers/ProductController')

routes.post('/product',ProductController.create)

routes.get('/product',ProductController.show)
routes.get('/product/:title',ProductController.index)
routes.delete('/product/:id',ProductController.delete)

module.exports = routes;