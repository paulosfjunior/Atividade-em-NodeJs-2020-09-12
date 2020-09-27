const express = require('express');

const router = express.Router();

const produtoController = require('../controllers/product-controller');
const authService = require('../services/auth-service');

router.post('/', authService.authorize, produtoController.post);

router.get('/', produtoController.get);

router.get('/quantidade/', produtoController.count);

router.get('/:productId', produtoController.getId);

router.put('/:productId', produtoController.put);

router.delete('/:productId', produtoController.delete);

module.exports = router;
