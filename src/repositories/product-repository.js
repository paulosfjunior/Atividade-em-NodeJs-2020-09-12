const Produto = require('../app/models/product');

exports.post = async (dados) => {
  const produto = new Produto(dados);
  return await produto.save();
}

exports.get = async () => {
  return await Produto.find();
}

exports.getId = async (id) => {
  return await Produto.findById(id);
}

exports.put = async (id, dados) => {
  return await Produto.findByIdAndUpdate(id, { $set: dados })
}

exports.delete = async (id) => {
  return await Produto.findByIdAndRemove(id);
}
