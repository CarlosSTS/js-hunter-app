const express = require('express')
const routes = express.Router();

//importando controllers
const ProductController= require('./controllers/ProductController')

routes.post('/product',ProductController.create)//create

routes.get('/product',ProductController.show)//listagem de todos
routes.get('/product/:id',ProductController.index)//listagem especifica
routes.delete('/product/:id',ProductController.delete)//delete



//rotas

routes.get('/', (req, res) => {
    res.send({
        aluno: 'carlos',
        projeto: 'listagem de produtos'
    })
})


//criação de product
routes.post('/product', )

module.exports = routes;