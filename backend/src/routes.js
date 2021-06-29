const express = require('express')
const routes = express.Router();

//importando controllers
const ProductController= require('./controllers/ProductController')

routes.post('/product',ProductController.create)//create

routes.get('/product',ProductController.show)//listagem de todos
routes.get('/product/:title',ProductController.index)//listagem especifica
routes.delete('/product/:id',ProductController.delete)//delete

module.exports = routes;