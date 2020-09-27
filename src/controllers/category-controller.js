const repository = require('../repositories/category-repository');

exports.post = async function (req, res) {
  await repository.post({
    nome: req.body.nome,
    descricao: req.body.descricao
  }).then(() => {
    res.status(201).send({
      message: 'Categoria cadastrada com sucesso!'
    });
  }).catch((error) => {
    res.status(500).send({
        message:`Falha ao processar a requisição: ${error}`
    })
  });
}

exports.get = async function (req, res) {
  await repository.get()
  .then((resultado) => {
    if (resultado) {
      res.status(200).send({
        message: resultado
      });
    } else {
      res.status(200).send({
        message: 'Nenhuma categoria cadastrada.'
      })
    }
  }).catch((error) => {
    res.status(500).send({
      message:`Falha ao processar a requisição: ${error}`
    });
  });
}

exports.getId = async function (req, res) {
  const id = req.params.categoryId;

  await repository.getId({
    _id: id
  }).then((resultado) => {
    if (resultado) {
      res.status(200).send({
        message: resultado
      });
    } else {
      res.status(200).send({
        message: 'Nenhuma categoria cadastrada com esse ID.'
      })
    }
  }).catch((error) => {
    res.status(500).send({
      message:`Falha ao processar a requisição: ${error}`
    });
  });
}

exports.put = async function (req, res) {
  const id = req.params.categoryId;
  await repository.put(
    {
      _id: id
    },
    {
      nome: req.body.nome,
      descricao: req.body.descricao
    }
  ).then(() => {
    res.status(201).send({
      message: 'Categoria alterada com sucesso!'
    });
  }).catch((error) => {
    res.status(500).send({
        message:`Falha ao processar a requisição: ${error}`
    })
  });
}

exports.delete = async function (req, res) {
  const id = req.params.categoryId;

  await repository.delete({
    _id: id
  }).then(() => {
    res.status(201).send({
      message: 'Categoria removida com sucesso!'
    });
  }).catch((error) => {
    res.status(500).send({
        message:`Falha ao processar a requisição: ${error}`
    })
  });
}
