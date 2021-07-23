const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys');
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
           if(err)  throw err;
           bcrypt.hash(req.body.password, salt, (err, hash) => {
             if(err) throw err;
             newUser.password = hash;
             newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
           })
         })
        }
      })
      .catch(err => console.log(err))
});

//@route  POST  /api/users/login
//@desc   User Login
//@access Public 

router.post('/login', (req, res) => {
  User.findOne({email:req.body.email})
      .then(user => {
          if(!user) {
            return res.status(400).json({email:'User not found...Please register!'});
          } else {
            bcrypt.compare(req.body.password, user.password, (err, success) => {
              if(err) throw err;
              if(success) {
                //create payload
                const payload = {
                  id: user.id,
                  name: user.name,
                  avatar: user.avatar
                };

                //sign a token
                jwt.sign(payload, key.secretOrKey,
                  {expiresIn:3600}, (err, token) => {
                    res.json({bearer:'Bearer '+token});
                  });

              } else {
                return res.status(404).json({password:'Incorrect Password!'});
              }
            })
          }
      })
      .catch(err => console.log(err))
});


//@route  POST  /api/users/forgotPassword
//@desc   User ForgotPassword
//@access Public 

module.exports = router;