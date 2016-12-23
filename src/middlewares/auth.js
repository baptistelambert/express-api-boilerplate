'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config/main');

module.exports.verifyToken = function(req, res, next) {
  let token = req.get(config.tokenHeader);

  if (token) {
    jwt.verify(token, config.secret, (err, currentUser) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Failed to authenticate token'
        })
      }

      req.currentUser = currentUser;
      next();
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    })
  }
};