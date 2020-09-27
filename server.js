const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

const uri = 'mongodb+srv://usuarioaula:usuarioaula@cluster0.31v9c.mongodb.net/aulanodepos?retryWrites=true&w=majority';

const indexRoute = require('./src/routes/index-route');
const productRoute = require('./src/routes/product-route');
const categoryRoute = require('./src/routes/category-route');
const customerRoute = require('./src/routes/customer-route');
const loginRoute = require('./src/routes/login-route');

mongoose.connect(uri,  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', indexRoute);
app.use('/api/produtos', productRoute);
app.use('/api/categorias', categoryRoute);
app.use('/api/usuarios', customerRoute);
app.use('/api/login/', loginRoute);

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
