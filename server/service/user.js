
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');
const { exceptionparser, validate, user: userValidator } = require('../utils/validators');

const { user } = models;
const { refreshTokenExpiry, success, tokenExpiry, secret, USER_ALREADY_EXISTS, USER_NOT_FOUND, INCORRECT_USERNAME_PASSWORD, SALT_ROUNDS } = require('../constant/constants');
const BurialSitesService = require('./burial_sites');
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

  static async create(req, res) {
    try {
      validate(userValidator.create(req.body))
      let { name, password } = req.body;
      name = _.toLower(name)
      const userDetails = await user.findOne({ where: { name }});
      if(!_.isEmpty(userDetails)) {
        throw USER_ALREADY_EXISTS
      }
      password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      const newUserDetails = {
        name,
        password,
      };
      await user.create(newUserDetails)
      res.status(201).send({
        ...success.USER_CREATION_SUCCESS,
        auth: false
      })

    } catch (e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send(message);
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
            exclude: ['password'],
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
      const hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
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
  static async delete(req, res) {
    try {
      const userDetails = await user.findByPk(parseInt(req.params.id))
      if(_.isEmpty(userDetails)) {
        throw USER_NOT_FOUND;
      }
      await userDetails.destroy()
      res.status(200).send(success.USER_DELETED_SUCCESS);
    } catch (e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send(message);
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

  static async login(req, res) {
    try {
      validate(userValidator.create(req.body))
      let { name, password } = req.body;
      name = _.toLower(name)
      const userDetails = await user.findOne({ where: { name } })
      if(_.isEmpty(userDetails)) {
        throw INCORRECT_USERNAME_PASSWORD
      }
      const isMatch = await bcrypt.compare(password, userDetails.password);
      if(!isMatch) {
        throw INCORRECT_USERNAME_PASSWORD
      }
      const userToken = await User.createToken(userDetails);
      res.status(200).send({
        auth: true,
        token: userToken.token,
        refreshToken: userToken.refreshToken,
      })
    } catch (e) {
      const { code, message } = exceptionparser(e);
      res.status(code).send(message);
    }
  }


}

module.exports = User;