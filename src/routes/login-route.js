const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/customer-controller');

router.post('/create', usuarioController.register);

module.exports = router;
