const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
  const data = await jwt.verify(token, global.SALT_KEY);
  return data;
}

//funcao de middleware
exports.authorize = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-acess-token'];

  if (!token) {
    res.status(401).json({
      message: 'Acesso restrito'
    });
  } else {
    jwt.verify(token, global.SALT_KEY, function (error, decode) {
      if (error) {
        res.status(401).json({
          message: 'token invalido',
          Error: error
        });
      } else {
        next();
      }
    })
  }
}
