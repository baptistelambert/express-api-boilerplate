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

config.tokenHeader = 'X-AUTH-TOKEN';

config.tokenExpiration = 60 * 60 * 3 // 3 hours

module.exports = config;