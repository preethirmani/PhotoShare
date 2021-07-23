const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const router = express.Router();


//@route  POST  /api/users/register
//@desc   User Registration
//@access Public 
router.post('/register', (req, res) =>  {
  User.findOne({email:req.body.email})
      .then(user => {
        if(user) {
          return res.status(400).json({email: 'User already exists!'})
        } else {

          // Avatar Generation
          const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
          });

          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
          });

          //Password Encryption
          bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
                User.password = hash;
                newUser.save()
                       .then(user => res.json(user))
                       .catch(err => console.log(err))
              
            });
          });
        }
      })
      .catch(err => console.log(err))
});

//@route  POST  /api/users/login
//@desc   User Registration
//@access Public 
module.exports = router;