const express = require('express');

const router = express.Router();

const categoriaController = require('../controllers/log-controller');

router.get('/', categoriaController.get);

router.get('/:logId', categoriaController.getId);

module.exports = router;
