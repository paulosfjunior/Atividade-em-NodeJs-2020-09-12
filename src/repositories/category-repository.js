const Categoria = require('../app/models/category');

exports.post = async (dados) => {
  const categoria = new Categoria(dados);
  return await categoria.save();
}

exports.get = async () => {
  return await Categoria.find();
}

exports.getId = async (id) => {
  return await Categoria.findById(id);
}

exports.put = async (id, dados) => {
  return await Categoria.findByIdAndUpdate(id, { $set: dados })
}

exports.delete = async (id) => {
  return await Categoria.findByIdAndRemove(id);
}
