const mongoose = require('mongoose');
const config = require('../config/database');

// Store Schema
const StoreScheme = mongoose.Schema({

  name: {
    type: String,
    required:true
  },
  address: {
    type: String,
    required:true
  },
  logoPath: {
    type: String,
    required:true
  }
});

const Store = module.exports = mongoose.model('Store', StoreScheme);

module.exports.getUserById = function (id, callback) {
  Store.findById(id, callback);
}


module.exports.addStore = function (newStore) {
  newStore.save();

}


