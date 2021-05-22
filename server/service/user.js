
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');
const { exceptionparser } = require('../utils/validators');

const { user } = models;
const { errors, refreshTokenExpiry, success, tokenExpiry, secret } = require('../constant/constants');
const BurialSitesService = require('./burial_sites');
const { SITE_STATUS } = require('../constant/enum');
const _ = require('lodash');

class User {
  /**
* @swagger
* path:
*   /users/register:
*     post:
*       description: signup (create new user meta)
*       produces:
*        - application/json
*       parameters:
*        - name: user
*          description: User object
*          in:  body
*          required: true
*          type: string
*          schema:
*           $ref: '#/definitions/UserDetails'
*       responses:
*         201:
*           description: user created successfully
*       tags: ['Users']
*/

  static create(req, res) {
    try {
      const encryptedPassword = bcrypt.hashSync(req.body.password);

      const { name } = req.body;

      return user.create({
        name,
        password: encryptedPassword,
      }).then((userResponse) => {
        const token = jwt.sign({ id: userResponse.id }, secret, {
          expiresIn: tokenExpiry, // expires in 24 hours
        });
        res.status(201).send({
          ...success.USER_CREATION_SUCCESS,
          token
        })
      }).catch(error => res.status(400).send(error));;

    } catch (e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send({ error: message });
    }
  }

  /**
* @swagger
* path:
*   /users:
*     get:
*       description: get all userdetails
*       responses:
*         200:
*           description: user details.
*       tags: ['Users']
*/
  static list(req, res) {
    // const whereClause = pick(req.query, ['name']);
    try {
      return user
        .findAll({
          attributes: {
            exclude: ['password', 'id', 'burialSiteId'],
          },
        })
        .then(users => res.status(200).send(users));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }


  // /users/:id
  static modify(req, res) {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const {
        name, burialSiteId
      } = req.body;
      return user
        .findByPk(req.params.id)
        .then((userResponse) => {
          userResponse
            .update({
              burialSiteId: burialSiteId || userResponse.city,
              password: hashedPassword || userResponse.password,
              name: name || userResponse.name,
            })
            .then((updateduserDetails) => {
              res.status(200).send({
                message: success.USER_UPDATION_SUCCESS.message,
                data: {
                  name: updateduserDetails.name || name,
                  burialSiteId: updateduserDetails.burialSiteId || burialSiteId,
                },
              });
            })
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }


  /**
* @swagger
* path:
*   /users/{id}:
*     delete:
*       description: delete all userdetails belonging to an id
*       parameters:
*         - in: path
*           name: id
*           required: true
*           schema:
*              type: integer
*         - in: header
*           name: x-access-token
*           required: true
*       responses:
*         200:
*           description: userdetails successfully deleted.
*       tags: ['Users']
*/
  static delete(req, res) {
    try {
      return user
        .findByPk(req.params.id)
        .then((details) => {
          if (!details) {
            return res.status(404).send(errors.USER_NOT_FOUND);
          }
          return details
            .destroy()
            .then(() => res.status(200).send(success.USER_DELETED_SUCCESS))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }

  static async isMachineMeltDown(userId, options) {
    let authorizedSites = options.authorizedSitesWithStatus
    if(_.isEmpty(authorizedSites)) {
      authorizedSites = await BurialSitesService.dbGetAuthorizedSites(userId);
    } 
    const isAnyOneMachineMeltDown = _.some(authorizedSites, ({ isActive }) => !isActive);
    return isAnyOneMachineMeltDown
  }


  static async createToken({ id, zoneId }) {
    const tokenObj = { id, zoneId }
    const token = await jwt.sign(tokenObj, secret, {
      expiresIn: tokenExpiry,
    });

    const refreshToken = await jwt.sign(tokenObj, secret, {
      expiresIn: refreshTokenExpiry,
    });
    return { token, refreshToken };
  }
  // /users/login

  static login(req, res) {
    try {
      user
        .findOne({ where: { name: req.body.name } })
        .then((user) => {
          return User.createToken(user).then(userToken => res.status(200).send({
            auth: true,
            zone: user.zoneId,
            token: userToken.token,
            refreshToken: userToken.refreshToken,
          }));
        })
        .catch((e) => {
          res.status(500).send({ error: e.message });
        });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  }


}

module.exports = User;