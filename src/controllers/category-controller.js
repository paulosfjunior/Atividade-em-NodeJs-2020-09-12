const repository = require('../repositories/category-repository');
const sLog = require('../repositories/log-repository');

exports.post = async function (req, res) {
  const dados = {
    nome: req.body.nome,
    descricao: req.body.descricao
  };

  await repository.post(dados)
  .then(() => {
    sLog.post({
      tabela: 'categorias',
      descricao: `Categoria cadastrada com sucesso! [${dados}]`
    });

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
    sLog.post({
      tabela: 'categorias',
      descricao: `Categorias buscadas! [${resultado}]`
    });

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
    sLog.post({
      tabela: 'categorias',
      descricao: `Categoria buscada por ID ${id}! [${resultado}]`
    });

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
  const dados = {
    nome: req.body.nome,
    descricao: req.body.descricao
  };

  await repository.put(
    {
      _id: id
    },
    dados
  ).then(() => {
    sLog.post({
      tabela: 'categorias',
      descricao: `Categoria alterada com sucesso! ID: ${id} [${dados}]`
    });

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
    sLog.post({
      tabela: 'categorias',
      descricao: `Categoria removida com sucesso! [${id}]`
    });

    res.status(201).send({
      message: 'Categoria removida com sucesso!'
    });
  }).catch((error) => {
    res.status(500).send({
        message:`Falha ao processar a requisição: ${error}`
    })
  });
}
