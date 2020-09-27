const Usuario = require('../app/models/customer');

exports.post = async (dados) => {
  const usuario = new Usuario(dados);
  return await usuario.save();
}

exports.get = async () => {
  return await Usuario.find();
}

exports.getId = async (id) => {
  return await Usuario.findById(id);
}

exports.put = async (id, dados) => {
  return await Usuario.findByIdAndUpdate(id, { $set: dados })
}

exports.delete = async (id) => {
  return await Usuario.findByIdAndRemove(id);
}

exports.register = async(dados) => {
  const consulta = await Usuario.find({ email: dados.email });

  if(consulta){
    throw {
      status: 400,
      message: 'Usuario ja cadastrado.'
    };
  }

  const usuario = new Usuario();
  usuario.nome = nome;
  usuario.email = email;
  usuario.senha = usuario.gerarHash(senha);

  return await usuario.save();
}
