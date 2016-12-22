'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

BookSchema.statics.fetchAll = function() {
  return new Promise((resolve, reject) => {
    this.find({}, (err, data) => {
      if (err) return reject(err);

      resolve(data);
    })
  });
};

module.exports = mongoose.model('Book', BookSchema);