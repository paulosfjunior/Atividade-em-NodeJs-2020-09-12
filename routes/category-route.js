const express = require('express');
const router = express.Router();
const Categoria = require('../app/models/category');
const mongoose = require('mongoose');
const { route } = require('./index-router');

router.post('/', function (req, res) {
  const categoria = new Categoria();
  categoria.descricao = req.body.descricao;

  categoria.save(function (error) {
    if (error)
      res.send(`Erro ao tentar salvar uma nova categoria ${error}`);

    res.status(201).json({ message: 'categoria inserida com sucesso' });
  });
});

router.get('/', function (req, res) {
  Categoria.find(function (err, prods) {
    if (err)
      res.send(err);

    res.status(200).json({
      message: 'retorno ok de todas as categorias',
      allProducts: prods
    });
  });
});

router.get('/:categoryId', findById);

router.put('/:categoryId', function (req, res) {
  const id = req.params.categoryId;

  Categoria.findById(id, function (err, categoria) {
    if (err) {
      res.status(500).json({
        message: 'Erro ao tentar econtrar categoria, id mal formado'
      });
    } else if (categoria == null) {
      res.status(400).json({
        message: 'Categoria nao econtrada para o id passado'
      });
    } else {
      categoria.descricao = req.body.descricao;

      categoria.save(function (error) {
        if (error)
        res.send(`Erro ao tentar salvar uma nova categoria ${error}`);

        res.status(200).json({
          message: 'categoria atualizada com sucesso'
        });
      });
    }
  });
});

router.delete('/:categoryId', function (req, res) {
  Categoria.findByIdAndRemove(req.params.categoryId, (err, categoria) => {
    if (err)
      res.status(500).send(`Erro ao deletar ${err}`)

    const response = {
      message: 'Categoria removida com sucesso',
      id: categoria.id
    };
    return res.status(200).send(response);
  });
});

function findById (req, res) {
  const id = req.params.categoryId;

  Categoria.findById(id, function (err, categoria) {
    if (err) {
      res.status(500).json({
        message: 'Erro ao tentar encontrar categoria; ID mal formato',
      });
    } else if (categoria == null) {
      res.status(400).json({
        message: 'Categoria não econtrada para o Id passado'
      });
    } else {
      res.status(200).json({
        message: 'Categoria encontrada',
        categoria: categoria
      });
    }
  });
}

module.exports = router;
