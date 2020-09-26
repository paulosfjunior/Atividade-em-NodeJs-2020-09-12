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
