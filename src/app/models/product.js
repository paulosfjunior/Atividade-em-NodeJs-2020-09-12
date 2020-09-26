const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  nome: String,
  preco: Number,
  descricao: String,
  categoria: {
    type: Schema.Types.ObjectId,
    ref:'Categoria'}
  });

module.exports = mongoose.model('Produto', productSchema);
