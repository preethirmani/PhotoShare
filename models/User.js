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
  }
});

module.exports = User = mongoose.model('users', newUser);