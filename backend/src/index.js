const express =require('express');
const cors= require('cors')
const routes = require('./routes')
const app = express();

//usando json
app.use(express.json());

app.use(cors({
    origin : 'http://localhost:3000'
}));
//importação de rotas
app.use(routes);


//servidor
app.listen(3333,()=>{
    console.log('porta 3333')
})