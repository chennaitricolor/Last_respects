
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const { secret } = require('../constant/constants');


function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    console.log("token",token, decoded.id)
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;