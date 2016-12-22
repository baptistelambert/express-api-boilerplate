'use strict';

var endpoints = {};

endpoints.index = {
  routePrefix: '/',
  file: require('./misc')
}

endpoints.books = {
  routePrefix: '/books',
  file: require('./books')
}

module.exports = endpoints;