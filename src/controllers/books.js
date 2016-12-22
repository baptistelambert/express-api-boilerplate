'use strict';

const Book = require('../models/Book');

module.exports.all = function(req, res, next) {
  Book.fetchAll().then((data) => {
    res.json(data);
  })
};

module.exports.create = function(req, res, next) {
  const title = req.body.title.trim();

  if (!title || title.length === 0) {
    res.status(400).send({ error: 'Title is invalid' });
  }

  let book = new Book({ title: req.body.title })

  book.save((err, data) => {
    if (err) return res.boom.badImplementation(null, err);

    res.json(data);
  })
};