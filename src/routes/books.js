'use strict';

const router = require('express').Router();
const BooksController = require('../controllers/books');

/**
 * @api {GET} /books
 *
 * @apiVersion 0.1.0
 *
 * @apiGroup Books
 * @apiPermission none
 *
 * @apiName getAllBooks
 * @apiDescription Get all books
 */
router.get('/', BooksController.all);

/**
 * @api {POST} /books
 *
 * @apiVersion 0.1.0
 *
 * @apiGroup Books
 * @apiPermission none
 *
 * @apiParam {String} title Title of the book
 *
 * @apiName createBook
 * @apiDescription Create a book
 */
router.post('/', BooksController.create);

module.exports = router;