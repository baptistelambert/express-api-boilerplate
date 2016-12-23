'use strict';

const router = require('express').Router();
const AuthController = require('../controllers/auth');

/**
 * @api {POST} /auth/register
 *
 * @apiVersion 0.1.0
 *
 * @apiGroup Auth
 * @apiPermission none
 *
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 *
 * @apiName register
 * @apiDescription Register a User and return an auth token
 */
router.post('/register', AuthController.register);

/**
 * @api {POST} /auth/login
 *
 * @apiVersion 0.1.0
 *
 * @apiGroup Auth
 * @apiPermission none
 *
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 *
 * @apiName login
 * @apiDescription Login and return an auth token
 */
router.post('/login', AuthController.login);

module.exports = router;