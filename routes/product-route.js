const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Produto = require('../app/models/product');
const Categoria = require('../app/models/category');
const { route } = require('./index-router');

router.post('/', function(req, res){
    const idCategoria = mongoose.Types.ObjectId(req.body.idCategoria)
    const categoria = Categoria.findById(idCategoria, (err, categoria) => categoria)

    if (categoria) {
        const produto = new Produto();
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;
        produto.categoria = idCategoria;
    
        produto.save(function(error){
            if(error)
                res.send(`Erro ao tentar salvar um novo produto ${error}`);
    
            res.status(201).json({message:'produto inserido com sucesso'});
        });
    } else {
        res.send(`Erro ao tentar salvar um novo produto, categoria com o id: ${idCategoria} não cadastrado`);
    }
});

router.get('/', function(req, res){
    Produto.find(function(err, prods){
        if(err)
            res.send(err);

        res.status(200).json({
            message: "retorno ok de todos os produtos",
            allProducts: prods
        });
    });
});

router.get('/:productId', function(req, res){
    const id = req.params.productId;
    Produto.findById(id, function(err, produto){
        if(err){
            res.status(500).json({
                message: "Erro ao tentar encontrar produto; ID mal formato",
            });
        }else if (produto==null){
            res.status(400).json({
                message: "Produto não econtrado para o Id passado"
            });
        }else{
            res.status(200).json({
                message:"Produto encontrado",
                produto: produto
            });
        }
    });
});

router.put('/:productId', function(req, res){
    const id = req.params.productId;
    console.log(id);
    Produto.findById(id, function(err, produto){
        if (err){
            res.status(500).json({
                message:"Erro ao tentar econtrar produto, id mal formado"
            });
        }else if(produto==null){
            res.status(400).json({
                message:"Produto nao econtrado para o id passado"
            });
        }else{
            produto.nome = req.body.name;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;

            produto.save(function(error){
                if (error)
                res.send("Erro ao entar atualizar o produto", errror);

                res.status(200).json({
                    message: "produto atualizado com sucesso"
                });
            });
        }
    });
});

router.delete('/:productId', function(req, res){
    Produto.findByIdAndRemove(req.params.productId, (err, produto) => {
        if(err) 
            res.status(500).send("Erro ao deletar ", err)

        const response ={
            message: "Produto removido com sucesso",
            id: produto.id
        };
        return res.status(200).send(response);
    });
});

module.exports = router;
