const express = require('express');
const passport = require('passport');
const router = express.Router();

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route  POST  /api/profile
//@desc   Create or Edit Profile
//@access Private 
router.post('/', passport.authenticate('jwt', {session:false}), 
  (req, res) => {
    console.log('req.user.id::'+req.user.id);
     console.log('req.body.handle::'+req.body.handle);
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


//@route  POST  /api/profile/follow/:user_id
//@desc   Follow Other's Profile
//@access Private

router.get('/follow/:user_id', passport.authenticate('jwt',{session:false}),
(req, res) => {
  
  Profile.findOne({user: req.user.id})
         .populate('user',['avatar'])
         .then(profile => {
           if(profile) {
             //Is the User in following array
            if((profile.following.map(followng => followng.user === req.params.user_id)).length > 0) { 
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

                      //Add to User's followers Array
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
  
  Profile.findOne({user: req.user.id})
        .then(profile => {
          if(profile) {
            //Extracting Current User's followers id
            const followrs = profile.following.map(item => item.user.toString());
            console.log(followrs);
            Profile.find()
            .then(profiles => {
              if(!profiles) {
                res.status(404).json({profiles:'Sorry No Suggestions!!!'})
              } else {
                //Filter out Current User Profile and Current User's Followers
                console.log(profiles);
                const suggestions = profiles.filter(item => {
                  item.id !== profile.id && !(followrs.include(item.following.user.toString())) 
                })
                return res.json('Suggestion::'+suggestions);
              }
            })
          } else {
            res.status(400).json({profile:'Profile does not exist'});
          }
        })
        .catch(err => console.log(err));
});

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