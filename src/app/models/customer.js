const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  nome: {type: String, required: true},
  email: {type: String, required: true},
  senha: {type: String, required: true}
});

customerSchema.methods.gerarHash = function(senha){
  return bcrypt.hashSync (senha, bcrypt.genSaltSync(8, null));
}

customerSchema.methods.validarSenha = function(senha){
  return bcrypt.compareSync(senha, this.senha);
}

module.exports = mongoose.model('Usuario', customerSchema);
