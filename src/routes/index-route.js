const express = require('express')
const mongoose = require('mongoose');

const router = express.Router();

router.use(function(req, res, next){
    console.log("Interceptação pelo Middleware ok");
    next();
});

router.get('/', (req, res) => res.send("rota teste ok"));

module.exports = router;
