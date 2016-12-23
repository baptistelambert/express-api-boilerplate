'use strict';

module.exports.checkCredentials = {
  'email': {
    in: 'body',
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid email'
    }
  },
  'password': {
    in: 'body',
    notEmpty: true,
    isLength: {
      options: [{ min: 6, max: 30 }],
      errorMessage: 'Password must be between 6 and 30 characters long'
    },
    errorMessage: 'Invalid password'
  }
};