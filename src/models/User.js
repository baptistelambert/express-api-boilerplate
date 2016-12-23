'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../../config/main');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(config.hashSaltRounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    })
  })
});

UserSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatching) => {
    if (err) return next(err);

    next(null, isMatching);
  });
};

UserSchema.statics.generateToken = function(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: config.tokenExpiration
  });
};

UserSchema.statics.sanitizeUserInfos = function(user) {
  return {
    _id: user._id,
    email: user.email,
    admin: user.admin
  };
}

module.exports = mongoose.model('User', UserSchema);