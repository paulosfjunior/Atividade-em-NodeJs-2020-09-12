const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  tabela: String,
  descricao: String
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
