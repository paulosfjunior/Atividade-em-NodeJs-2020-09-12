const express = require('express');

const router = express.Router();

const categoriaController = require('../controllers/category-controller');

router.post('/', categoriaController.post);

router.get('/', categoriaController.get);

router.get('/:categoryId', categoriaController.getId);

router.put('/:categoryId', categoriaController.put);

router.delete('/:categoryId', categoriaController.delete);

module.exports = router;
