const mongoose = require('mongoose');
const Produto = require('../app/models/product');
const Categoria = require('../app/models/category');

exports.post = async function (req, res) {
  const idCategoria = mongoose.Types.ObjectId(req.body.idCategoria)
  const categoria = await Categoria.findById(idCategoria, (err, categoria) => categoria)

  if (categoria) {
    const produto = new Produto();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;
    produto.categoria = idCategoria;

    produto.save(function (error) {
      if (error)
        res.send(`Erro ao tentar salvar um novo produto ${error}`);

      res.status(201).json({ message: 'produto inserido com sucesso' });
    });
  } else {
    res.send(`Erro ao tentar salvar um novo produto, categoria com o id: ${idCategoria} não cadastrado`);
  }
}

exports.get = function (req, res) {
  Produto.find(function (err, prods) {
    if (err)
      res.send(err);

    res.status(200).json({
      message: 'retorno ok de todos os produtos',
      allProducts: prods
    });
  });
}

exports.getId = function (req, res) {
  const id = req.params.productId;
  Produto.findById(id, function (err, produto) {
    if (err) {
      res.status(500).json({
        message: 'Erro ao tentar encontrar produto; ID mal formato',
      });
    } else if (produto == null) {
      res.status(400).json({
        message: 'Produto não econtrado para o Id passado'
      });
    } else {
      res.status(200).json({
        message: 'Produto encontrado',
        produto: produto
      });
    }
  });
}

exports.put = function (req, res) {
  const id = req.params.productId;
  console.log(id);
  Produto.findById(id, async function (err, produto) {
    if (err) {
      res.status(500).json({
        message: 'Erro ao tentar econtrar produto, id mal formado'
      });
    } else if (produto == null) {
      res.status(400).json({
        message: 'Produto nao econtrado para o id passado'
      });
    } else {
      const idCategoria = mongoose.Types.ObjectId(req.body.idCategoria)
      const categoria = await Categoria.findById(idCategoria, (err, categoria) => categoria)

      produto.nome = req.body.name;
      produto.preco = req.body.preco;
      produto.descricao = req.body.descricao;

      if (categoria) {
        produto.save(function (error) {
          if (error)
            res.send(`Erro ao entar atualizar o produto ${error}`);

          res.status(200).json({
            message: 'produto atualizado com sucesso'
          });
        });
      } else {
        res.send(`Erro ao tentar salvar um novo produto, categoria com o id: ${idCategoria} não cadastrado`);
      }
    }
  });
}

exports.delete = function (req, res) {
  Produto.findByIdAndRemove(req.params.productId, (error, produto) => {
    if (error)
      res.status(500).send(`Erro ao deletar ${error}`)

    const response = {
      message: 'Produto removido com sucesso',
      id: produto.id
    };
    return res.status(200).send(response);
  });
}
