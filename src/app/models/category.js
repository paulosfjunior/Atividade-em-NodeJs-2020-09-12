const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  descricao: String
});

module.exports = mongoose.model('Categoria', categorySchema);
