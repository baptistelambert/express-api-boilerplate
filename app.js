'use strict';

/*
 * DEPENDENCIES
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const logger = require('morgan');
const boom = require('express-boom');
const expressValidator = require('express-validator');

const app = express();

const config = require('./config/main');

/*
 * DATABASE
 */
require('./config/database');

/*
 * MIDDLEWARES
 */
app.use(logger('dev'));

// Basic CORS with custom token header support
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, " + config.tokenHeader);
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'src/public')));

app.use(boom());

app.use(expressValidator());

/*
 * ROUTING
 */
const routes = require('./src/routes');

_.each(routes, (value) => {
  app.use(value.routePrefix, value.file);
});

// 404 handling
app.use((req, res, next) => {
  res.boom.notFound();
})

/*
 * ERROR HANDLERS
 */

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: err
    })
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  })
});

module.exports = app;

