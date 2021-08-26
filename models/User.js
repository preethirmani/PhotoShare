const mongoose = require('mongoose');
const schema = mongoose.Schema;

const newUser = new schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  oldPassword: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String
  },
  resetToken: String,
  expiredToken: Date
});

module.exports = User = mongoose.model('users', newUser);