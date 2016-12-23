'use strict';

const User = require('../models/User');
const UserValidator = require('../validators/UserValidator');

module.exports.register = function(req, res, next) {
  req.check(UserValidator.checkCredentials);

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      return res.boom.badRequest(null, result.mapped());
    }

    let email = req.body.email.trim().toLowerCase();
    let password = req.body.password.trim();

    User.findOne({ email: email }, (err, existingUser) => {
      if (err) return next(err);

      if (existingUser) {
        return res.status(400).send({
          success: false,
          error: 'Registration failed. Email already in use'
        });
      }

      let user = new User({
        email: email,
        password: password
      });

      user.save((err, user) => {
        if (err) return next(err);

        let sanitizedUserInfos = User.sanitizeUserInfos(user);

        res.status(201).json({
          success: true,
          message: 'Registration succeed',
          token: User.generateToken(sanitizedUserInfos),
          user: sanitizedUserInfos
        });
      });
    });
  });
};

module.exports.login = function(req, res, next) {
  req.check(UserValidator.checkCredentials);

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      return res.boom.badRequest(null, result.mapped());
    }

    let email = req.body.email.trim().toLowerCase();
    let password = req.body.password.trim();

    User.findOne({ email: email }, (err, user) => {
      if (err) return next(err);

      if (!user) {
        return res.status(400).send({
          success: false,
          error: 'Authentication failed. User not found'
        });
      }

      user.comparePassword(password, (err, isMatching) => {
        if (err) return next(err);

        if (!isMatching) {
          return res.status(400).send({
            success: false,
            error: 'Authentication failed. Invalid password'
          });
        }

        let sanitizedUserInfos = User.sanitizeUserInfos(user);

        res.status(200).json({
          success: true,
          message: 'Authentication succeed',
          token: User.generateToken(sanitizedUserInfos),
          user: sanitizedUserInfos
        })
      });
    });
  })
};