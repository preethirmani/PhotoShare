const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys');
const passport = require('passport');
const nodeMailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const router = express.Router();

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateforgotPasswordInput = require('../../validation/forgot-password');
const validateChangePasswordInput = require('../../validation/change-password');

const transporter = nodeMailer.createTransport(sendGridTransport({
  auth:{
    api_key:key.apiKey
  }
}));


//@route  POST  /api/users/register
//@desc   User Registration
//@access Public 
router.post('/register', (req, res) =>  {
//Validation

const {errors, isValid} = validateRegisterInput(req.body);
if(!isValid) {
  return res.status(400).json(errors)
}

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
            username: req.body.username,
            avatar
          });

          //Password Encryption
         bcrypt.genSalt(10, (err, salt) => {
           if(err)  throw err;
           bcrypt.hash(req.body.password, salt, (err, hash) => {
             if(err) throw err;
             newUser.password = hash;
             newUser.save()
                    .then(user => {
                      transporter.sendMail({
                        to:user.email,
                        from:'iinfo.photoshare@gmail.com',
                        subject:'Registered Suuccessfully!',
                        html:'<h1>Welcome to Photoshare!!!</h1>'
                      })
                      return res.json(user)})
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

  //Validation
  const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors)
    }

  User.findOne({email:req.body.email})
      .then(user => {
          if(!user) {
            return res.status(400).json({email:'User does not exist...Please register!'});
          } else {
            bcrypt.compare(req.body.password, user.password, (err, success) => {
              if(err) throw err;
              if(success) {
                //create payload
                const payload = {
                  id: user.id,
                  name: user.name,
                  username: user.username,
                  avatar: user.avatar
                };

                //sign a token
                jwt.sign(payload, key.secretOrKey,
                  {expiresIn:3600}, (err, token) => {
                    res.json({token:'Bearer '+token});
                  });

              } else {
                return res.status(404).json({password:'Incorrect Password!'});
              }
            })
          }
      })
      .catch(err => console.log(err))
});

//@route  GET  /api/users/current
//@desc   User Authorization
//@access Private 
router.get('/current', 
            passport.authenticate('jwt',{session:false}),
            (req, res) => {
              res.json(req.user);
            });


//@route  POST  /api/users/forgotPassword
//@desc   User ForgotPassword
//@access Public 
router.post('/forgotPassword',(req, res) => {

  //Validation
  const {errors, isValid} = validateforgotPasswordInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email:req.body.email})
      .then(user => {
        if(!user) {
          return res.status(400).json({email:'User does not exist... Please register!'});
        } else {
          //Generate token(OTP)
          crypto.randomBytes(4,(err, buffer) => {
            if(err) throw err;
            const token = buffer.toString('hex');
            user.resetToken = token;
            user.expiredToken = Date.now() + 3600000;
            

            //Email token(OTP)
            transporter.sendMail({
              to:user.email,
              from:'iinfo.photoshare@gmail.com',
              subject:'Password Reset',
              html:`
              <p>Please click on the link to reset your password :
              <a href='http://localhost:5500/api/users/forgotPassword/${token}'>link</a>
              </p>`
            });

            //Encrypt OTP
            bcrypt.genSalt(10, (err, salt) => {
              if(err) throw err;
              bcrypt.hash(token, salt, (err, hash) => {
                if(err) throw err;
                user.password = hash;
                user.save()
                    .then(updatedUser => res.json(updatedUser))
                    .catch(err => console.log(err));
              })
            });
          });
        }
      })
      .catch(err => console.log(err));
});

//@route  POST  /api/users/changePassword
//@desc   User Change Password
//@access Public 

router.post('/changePassword', (req,res) => {
 //Validation
  const {errors, isValid} = validateChangePasswordInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
      .then(user => {
        if(!user) {
          return res.status(400).json({email:'User does not exist... Please register!'});
        } else {
          bcrypt.compare(req.body.oldPassword,user.password, (err, success) => {
            //NewPassword Encyption
            bcrypt.genSalt(10, (err, salt) => {
              if(err) throw err;
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                if(err) throw err;
                user.password = hash;
                user.save()
                    .then(updatedUser => res.json(updatedUser))
                    .catch(err => console.log(err))
              })
            })
          });
        }

      })
      .catch(err => console.log(err))
})

module.exports = router;