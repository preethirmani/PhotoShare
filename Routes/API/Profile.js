const express = require('express');
const passport = require('passport');
const router = express.Router();

//Load Data Model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const validateProfileInput = require('../../validation/profile');

//@route  POST  /api/profile
//@desc   Create or Edit Profile
//@access Private 
router.post('/', passport.authenticate('jwt', {session:false}), 
  (req, res) => {
  
  //Validating User Input
  const {errors, isValid} = validateProfileInput(req.body);
  if(!isValid) {
    return res.status(404).json(errors);
  }
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.gender) profileFields.gender = req.body.gender;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.phoneNumber) profileFields.phoneNumber = req.body.phoneNumber;
    if(req.body.location) profileFields.location = req.body.location;
                  
    Profile.findOne({user:req.user.id})
           .then(profile => {
             if(profile) {
              //Update Profile
              Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(updatedProfile => res.json(updatedProfile))
              .catch(err => console.log(err))


             } else {
               //Check Handle already exists
               Profile.findOne({handle:req.body.handle})
                      .then(profil => {
                        if(profil) {
                          return res.status(400).json({handle:'Handle Already exists!'})
                        } else {
                          //create New Profile
                            new Profile(profileFields).save()
                                        .then(savedProfile => res.json(savedProfile))
                                        .catch(err => console.log(err));
                        }
                      })
                      .catch(err => console.log(err))
           
             }
           })
           .catch(err => console.log(err))     
    });


//@route  GET  /api/profile/follow/:user_id
//@desc   Follow Other User's Profile & Add Curren't user As Follower
//@access Private

router.get('/follow/:user_id', passport.authenticate('jwt',{session:false}),
(req, res) => {
  
  Profile.findOne({user: req.user.id})
         .populate('user',['avatar'])
         .then(profile => {
           if(profile) {
             //Is the User in following array
             const followingArr = profile.following.filter(item => item.user.toString() === req.params.user_id.toString());
            if(followingArr.length > 0) { 
              res.status(400).json({follow:'Cannot follow...User is already being followed!!!'});
            } else {
              //Find User's Details
              Profile.findOne({user: req.params.user_id})
                    .populate('user',['avatar'])
                  .then(profile2 => {
                    if(profile2) {
                      const newFollow = {
                        user:profile2.user._id,
                        handle:profile2.handle,
                        avatar:profile2.user.avatar
                      };

                      //Add to Current User's following Array
                      profile.following.unshift(newFollow);
                      profile.save()
                             .then(savedProfile => console.log(savedProfile))
                             .catch(err => console.log(err))

                      //Add the Current User into Other User's followers Array
                      const newFollower = {
                        user:profile.user._id,
                        handle:profile.handle,
                        avatar:profile.user.avatar
                      };
                      profile2.followers.unshift(newFollower);
                      profile2.save()
                            .then(savedProfile2 => res.json(savedProfile2))
                            .catch(err => console.log(err))

                    } else {
                        res.status(400).json({user:'User not found'});
                    }
                  })
                  .catch(err => console.log(err))
            }
           } else {
             res.status(400).json({profile:'Profile does not exists'});
           }
         })
         .catch(err => console.log(err))
})
  


//@route  GET  /api/profile/unFollow/:user_id
//@desc   UnFollow Other User's Profile
//@access Private

router.get('/unFollow/:user_id', passport.authenticate('jwt',{session:false}),
(req, res) => {
 
  Profile.findOne({user: req.user.id}) 
        .then(profile => {
          if(profile) {
            //Remove Index for current user's Following Array
            const removeIndex = profile.following.map(item => item.user)
                                        .indexOf(req.params.user_id);
                                        
            if(removeIndex === -1) {
              res.status(404).json({following:'User not found in following array!'});
            }
            //Deleting the user from Following Array
            profile.following.splice(removeIndex,1);
            profile.save()
                   .then(updatedProfile => console.log(updatedProfile))
                   .catch(err => console.log(err))

            Profile.findOne({user: req.params.user_id}) 
                   .then(profile2 => {
                     //Remove Index for Current User
                     const removeIndex2 = profile2.followers.map(item => item.user)
                                                  .indexOf(req.user.id);

                    if(removeIndex2 === -1) {
                      res.status(404).json({followers:'User nof found in followers array'});
                    }
                    profile2.followers.splice(removeIndex2,1);
                    profile2.save()
                            .then(updatedProfile2 => res.json(updatedProfile2))
                            .catch(err => console.log(err))
                   })
                   .catch(err => console.log(err))
          } else {
            res.status(400).json({profile:'Profile does not exist!'})
          }
        })
        .catch(err => console.log(err))
})
  


//@route  GET  /api/profile
//@desc   Get Current User's Profile
//@access Private
router.get('/', passport.authenticate('jwt', {session:false}), 
(req, res) => {
  Profile.findOne({user: req.user.id})
         .populate('user',['name','avatar'])
         .then(profile => {
           if(!profile){
             res.status(400).json({profile:'Profile not found'});
           } else {
             res.json(profile);
           }
         })
         .catch(err => console.log(err))
});

//@route  GET  /api/profile/id/:id
//@desc   Get user's profile by id
//@access Private
router.get('/id/:id', passport.authenticate('jwt', {session:false}),
(req, res) => {
  Profile.findOne({user:req.params.id})
          .populate('user', ['name','email','avatar'])
          .then(profile => {
            if(profile) {
              res.json(profile);
            } else {
              res.status(400).json({profile:'Profile not found!'});
            }
          })
          .catch(err => console.log(err))
});

//@route  GET  /api/profile/handle/:handle
//@desc   Get user's profile by handle
//@access Private

router.get('/handle/:handle', passport.authenticate('jwt', {session:false}),
(req, res) => {
  Profile.findOne({handle:req.params.handle})
          .populate('user', ['name','email','avatar'])
          .then(profile => {
            if(profile) {
              res.json(profile);
            } else {
              res.status(400).json({profile:'Profile not found!'});
            }
          })
          .catch(err => console.log(err))
});



//@route  GET  /api/profile/suggestions
//@desc   Recommendations For Current User
//@access Private

router.get('/suggestions', passport.authenticate('jwt', {session:false}), 
(req, res) => {
  console.log('user from authentication:'+req.user.name);
  Profile.findOne({user:req.user.id})
        .then(profile => {
          if(!profile) {
            res.status(400).json({profile:'Profile does not exist!'})
          } else {
            Profile.find()
                   .populate('user',['name','avatar'])
                   .then(profiles => {
                     if(!profiles) {
                       res.status(400).json({profiles:'No Suggestions!'});
                     } else {
                       console.log('profile.following.length::' + profile.following.length);
                       if(profile.following.length >= 1) {
                         const followersArr = profile.following.map(item => item.user.toString());
                         console.log("followersArr.Length"+ followersArr.length);
                         const suggestions = profiles.filter(item => 
                                              (item.id !== profile.id) && 
                                              (followersArr.includes(item.user._id) == false) );
                        console.log("profiles.Length"+ profiles.length);
                        console.log("suggestions.Length"+ suggestions.length);
                         res.json(suggestions);

                     } else {
                       res.json(profiles);
                     }
                     }

                   })
                   .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));  
});


//@route  GET  /api/profile/followers
//@desc   Get list of followers
//@access Private
router.get('/followers', passport.authenticate('jwt', {session:false}),
(req, res) => {
  Profile.findOne({user: req.user.id})
         .then(profile => {
           if(!profile) {
            res.status(400).json({profile:'Profile does not exist!'})
           } else {
             res.json(profile.followers);
           }
         })
         .catch(err => console.log(err))
})

//@route  GET  /api/profile/following
//@desc   Get list of following users info
//@access Private
router.get('/following', passport.authenticate('jwt', {session:false}),
(req, res) => {
  Profile.findOne({user: req.user.id})
         .then(profile => {
           if(!profile) {
            res.status(400).json({profile:'Profile does not exist!'})
           } else {
             res.json(profile.following);
           }
         })
         .catch(err => console.log(err))
})


//@route  DELETE  /api/profile/delete
//@desc   Delete Profile
//@access Private

router.delete('/delete', passport.authenticate('jwt', {session: false}),
(req,res) => {
  Profile.findOneAndRemove({user: req.user.id})
        .then(() => {
          User.findOneAndRemove({_id: req.user.id})
          .then(() => res.json({msg:'success'}))
        })
        .catch(err => console.log(err));
}
)


module.exports = router;