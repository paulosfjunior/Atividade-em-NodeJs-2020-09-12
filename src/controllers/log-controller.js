const repository = require('../repositories/log-repository');

exports.get = async function (req, res) {
  await repository.get()
  .then((resultado) => {
    if (resultado) {
      res.status(200).send({
        message: resultado
      });
    } else {
      res.status(200).send({
        message: 'Nenhum log cadastrado.'
      })
    }
  }).catch((error) => {
    res.status(500).send({
      message:`Falha ao processar a requisição: ${error}`
    });
  });
}

exports.getId = async function (req, res) {
  const id = req.params.logId;

  await repository.getId({
    _id: id
  }).then((resultado) => {
    if (resultado) {
      res.status(200).send({
        message: resultado
      });
    } else {
      res.status(200).send({
        message: 'Nenhuma log cadastrado com esse ID.'
      })
    }
  }).catch((error) => {
    res.status(500).send({
      message:`Falha ao processar a requisição: ${error}`
    });
  });
}
