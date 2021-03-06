const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  handle: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref:'users'
      },
      handle: String
    }
  ],
  comments: [{
    user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  handle: {
    type: String
  },
  avatar: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
  }]
});

module.exports = Post = mongoose.model('posts', postSchema);