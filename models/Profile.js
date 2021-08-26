const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  handle: {
    type: String
  },
  
  gender: {
    type: String
  },
  website: {
    type: String
  },
   bio: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  location: {
    type: String
  },
  following: [
    {
      user: {
        type: String,
        required: true
      },
      handle: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      }
    }
  ],
  followers: [
    {
      user: {
        type: String,
        required: true
      },
       handle: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      }
    }
  ]
   
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);