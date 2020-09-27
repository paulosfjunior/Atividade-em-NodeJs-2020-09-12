const repository = require('../repositories/customer-repository');
const sLog = require('../repositories/log-repository');

exports.post = async function (req, res) {
  const dados = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha
  }

  await repository.post(dados)
  .then(() => {
    sLog.post({
      tabela: 'usuarios',
      descricao: `Usuario cadastrado com sucesso! [${dados}]`
    });

    res.status(201).send({
      message: 'Usuario cadastrado com sucesso!'
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
      tabela: 'usuarios',
      descricao: `Usuarios buscados! [${resultado}]`
    });

    if (resultado) {
      res.status(200).send({
        message: resultado
      });
    } else {
      res.status(200).send({
        message: 'Nenhum usuario cadastrado.'
      })
    }
  }).catch((error) => {
    res.status(500).send({
      message:`Falha ao processar a requisição: ${error}`
    });
  });
}

exports.getId = async function (req, res) {
  const id = req.params.customerId;

  await repository.getId({
    _id: id
  }).then((resultado) => {
    sLog.post({
      tabela: 'usuarios',
      descricao: `Usuarios buscados por ID ${id}! [${resultado}]`
    });

    if (resultado) {
      res.status(200).send({
        message: resultado
      });
    } else {
      res.status(200).send({
        message: 'Nenhum usuario cadastrado com esse ID.'
      })
    }
  }).catch((error) => {
    res.status(500).send({
      message:`Falha ao processar a requisição: ${error}`
    });
  });
}

exports.put = async function (req, res) {
  const id = req.params.customerId;
  const dados = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha
  }

  await repository.put(
    {
      _id: id
    },
    
  ).then(() => {
    sLog.post({
      tabela: 'usuarios',
      descricao: `Usuarios alterado com sucesso! ID: ${id} [${dados}]`
    });

    res.status(201).send({
      message: 'Usuario alterado com sucesso!'
    });
  }).catch((error) => {
    res.status(500).send({
        message:`Falha ao processar a requisição: ${error}`
    })
  });
}

exports.delete = async function (req, res) {
  const id = req.params.customerId;

  await repository.delete({
    _id: id
  }).then(() => {
    sLog.post({
      tabela: 'usuarios',
      descricao: `Usuario removido com sucesso! [${id}]`
    });

    res.status(201).send({
      message: 'Usuario removido com sucesso!'
    });
  }).catch((error) => {
    res.status(500).send({
        message:`Falha ao processar a requisição: ${error}`
    })
  });
}

exports.register = async (req, res) => {
  const dados = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha
  }

  await repository.register(dados)
  .then(() => {
    sLog.post({
      tabela: 'usuarios',
      descricao: `Usuario cadastrado com sucesso! [${dados}]`
    });

    res.status(201).send({
      message: 'Usuario cadastrado com sucesso!'
    });
  }).catch((error) => {
    res.status(500).send({
        message:`Falha ao processar a requisição: ${error}`
    })
  });
}
