'use strict';

const config = {};

config.db = {
  db: 'express-api-boilerplate',
  host: '127.0.0.1',
  user: '',
  pw: '',
  port: '27017'
}

config.hashSaltRounds = 10;

config.secret = 'ThisIsASecretKeyThatYouShouldChange';

module.exports = config;