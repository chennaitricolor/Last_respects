
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const { secret } = require('../constant/constants');
const models = require('../models');
const { user } = models;
const _ = require('lodash');


function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
    const userDetails = await user.findByPk(parseInt(decoded.id));
    if(_.isEmpty(userDetails)) {
      return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = parseInt(decoded.id);
    req.isAdmin = userDetails.isAdmin;
    req.zoneId = decoded.zoneId;
    next();
  });
}

function verifySuperUser(req, res, next) {
  if(req.isAdmin) {
    next()
  } else {
    return res.status(403).send({ auth: false, message: 'Unauthorized to access the resource' });
  }
}

module.exports = {
  verifySuperUser,
  verifyToken
};