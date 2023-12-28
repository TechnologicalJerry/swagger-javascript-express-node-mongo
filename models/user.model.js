const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   firstName: {
      type: String,
      default: '',
      required: true,
   },
   lastName: {
      type: String,
      default: '',
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
   },
   phone: {
      type: Number,
      required: true,
      unique: true
   }
});

const user = new mongoose.model('User', schema); module.exports = user;