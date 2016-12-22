'use strict';

var endpoints = {};

endpoints.index = {
  routePrefix: '/',
  file: require('./misc')
}

module.exports = endpoints;