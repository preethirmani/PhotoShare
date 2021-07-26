const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  handle: {
    type: String,
    required:true
  },
  bio: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  following: [
    {
      userId: {
        type: String,
        required: true,
      }
    }
  ],

    followers: [
    {
      userId: {
        type: String,
        required: true,
      }
    }
  ],

   social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  }

});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);