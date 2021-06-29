const connection = require('../database/connection');

module.exports = {

    //CRIANDO PRODUCT
    async create(req, res) {
        const { title, description, url } = req.body;
        const [id] = await connection('product').insert({
            title,
            description,
            url,
        })

        return res.json([id]);
    },
        //TODOS OS PRODUCT
    async show(req, res) {
        const { page = 1 } = req.query;
        const [count] = await connection('product').count();
        const product = await connection('product')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['product.*']);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(product);
    },

    //PRODUCT ESPECIFICO
    async index(req, res) {
        const { title } = req.params;
        const product_title = await connection('product')
            .where('title', title)
            .select('*')

        if (!product_title)
            return res.status(400).json({ error: 'No product found with this title' })
        return res.json(product_title)
    },
    //DELETANDO PRODUCT
    async delete(req, res) {

        const { id } = req.params;
        const title = req.headers.authorization;

        const product = await connection('product')
            .where('id', id)
            .select('title')
            .first();

        if (product.title !== title) {
            return res.status(401).json({ error: 'Operation not permitted.' })
        }
        await connection('product').where('id', id).delete()
        return res.status(204).send()

    },  
}