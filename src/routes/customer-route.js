const express = require('express');

const router = express.Router();

const usuarioController = require('../controllers/customer-controller');

router.post('/', usuarioController.post);

router.get('/', usuarioController.get);

router.get('/:customerId', usuarioController.getId);

router.put('/:customerId', usuarioController.put);

router.delete('/:customerId', usuarioController.delete);

module.exports = router;
