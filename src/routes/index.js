'use strict';

var endpoints = {};

endpoints.index = {
  routePrefix: '/',
  file: require('./misc')
}

endpoints.auth = {
  routePrefix: '/auth',
  file: require('./auth')
}

endpoints.books = {
  routePrefix: '/books',
  file: require('./books')
}

module.exports = endpoints;