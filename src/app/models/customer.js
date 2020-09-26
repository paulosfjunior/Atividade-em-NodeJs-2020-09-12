const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  nome: String,
  email: String,
  senha: String
});

module.exports = mongoose.model('Cliente', customerSchema);
