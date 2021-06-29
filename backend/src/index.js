const express = require('express');
const cors = require('cors')
const routes = require('./routes')
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(routes);

app.listen(3333, () => {
    console.log('porta 3333')
})