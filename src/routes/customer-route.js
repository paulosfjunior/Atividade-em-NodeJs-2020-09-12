const express = require('express');

const router = express.Router();

const clienteController = require('../controllers/customer-controller');

router.post('/', clienteController.post);

router.get('/', clienteController.get);

router.get('/:customerId', clienteController.getId);

router.put('/:customerId', clienteController.put);

router.delete('/:customerId', clienteController.delete);

module.exports = router;
