const Cliente = require('../app/models/customer');

exports.post = function (req, res) {
  const cliente = new Cliente();
  cliente.nome = req.body.nome;
  cliente.email = req.body.email;
  cliente.senha = req.body.senha;

  cliente.save(function (error) {
    if (error)
      res.send(`Erro ao tentar salvar uma novo cliente ${error}`);

    res.status(201).json({ message: 'cliente inserida com sucesso' });
  });
}

exports.get = function (req, res) {
  Cliente.find(function (err, cust) {
    if (err)
      res.send(err);

    res.status(200).json({
      message: 'retorno ok de todas os clientes',
      allCustomers: cust
    });
  });
}

exports.getId = function (req, res) {
  const id = req.params.customerId;

  Cliente.findById(id, function (err, cliente) {
    if (err) {
      res.status(500).json({
        message: 'Erro ao tentar encontrar cliente; ID mal formato',
      });
    } else if (cliente == null) {
      res.status(400).json({
        message: 'Cliente não econtrado para o Id passado'
      });
    } else {
      res.status(200).json({
        message: 'Cliente encontrado',
        cliente: cliente
      });
    }
  });
}

exports.put = function (req, res) {
  const id = req.params.customerId;

  Cliente.findById(id, function (err, cliente) {
    if (err) {
      res.status(500).json({
        message: 'Erro ao tentar econtrar cliente, id mal formado'
      });
    } else if (cliente == null) {
      res.status(400).json({
        message: 'Cliente nao econtrado para o id passado'
      });
    } else {
      cliente.nome = req.body.nome;
      cliente.email = req.body.email;
      cliente.senha = req.body.senha;

      cliente.save(function (error) {
        if (error)
        res.send(`Erro ao tentar salvar um novo cliente ${error}`);

        res.status(200).json({
          message: 'cliente atualizado com sucesso'
        });
      });
    }
  });
}

exports.delete = function (req, res) {
  Cliente.findByIdAndRemove(req.params.customerId, (err, cliente) => {
    if (err)
      res.status(500).send(`Erro ao deletar ${err}`)

    const response = {
      message: 'Cliente removido com sucesso',
      id: cliente.id
    };
    return res.status(200).send(response);
  });
}
