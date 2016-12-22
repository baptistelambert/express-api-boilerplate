'use strict';
const router = require('express').Router();

/**
 * @api {GET} /
 *
 * @apiVersion 0.1.0
 *
 * @apiGroup Misc
 * @apiPermission none
 *
 * @apiName getApiEndpoint
 * @apiDescription The API root endpoint
 *
 * @apiSuccess {String} message Endpoint success message
 */
router.get('/', function(req, res, next) {
  res.send({
    message: 'Welcome on this API.',
    apidoc: req.protocol + '://' + req.get('host') + req.originalUrl + 'apidoc'
  })
});

module.exports = router;