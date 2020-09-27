const SLog = require('../app/models/log');

exports.post = async (dados) => {
  const sLog = new SLog(dados);
  return await sLog.save();
}

exports.get = async () => {
  return await SLog.find();
}

exports.getId = async (id) => {
  return await SLog.findById(id);
}
