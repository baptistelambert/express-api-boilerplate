'use strict';

/*
 * DEPENDENCIES
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const boom = require('express-boom');

const app = express();

/*
 * MIDDLEWARES
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'src/public')));

app.use(boom());

/*
 * ROUTING
 */
const routes = require('./src/routes');

_.each(routes, function(value) {
  app.use(value.routePrefix, value.file);
});

// 404 handling
app.use(function(req, res, next) {
  res.boom.notFound();
})

/*
 * ERROR HANDLERS
 */

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      error: err
    })
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  })
});

module.exports = app;

