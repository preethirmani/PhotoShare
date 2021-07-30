const express = require('express');
const passport = require('passport');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile')

// @route POST /api/posts
// @desc create post
// @access Private
router.post('/', passport.authenticate('jwt',{session:false}),
(req,res) =>{
    Profile.findOne({user: req.user.id})
           .then(profile => {
            
            const newPost = new Post({
            user: req.user.id,
            name: req.body.name,
            avatar: req.body.avatar,
            text: req.body.text,
            handle: (profile)?profile.handle:''
          }); 
         
          newPost.save()
                .then(post => res.json(post))
                .catch(err => console.log(err))
         })
          .catch(err => console.log(err));
});

//@route  GET  /api/posts
//@desc   User's Posts
//@access Public 

router.get('/', passport.authenticate('jwt', {session:false}),
(req, res) => {
  Post.find()
      .then(posts => res.json(posts))
      .catch(err => console.log(err))

});

// @route GET api/posts/id/:id
// @desc Get posts by post id
// @access private
router.get('/id/:id', passport.authenticate('jwt',{session: false}),
(req, res) => {
  Post.findById(req.params.id)
      .then(posts => {
        if(!posts) {
          return res.status(404).json({posts:'No Posts found for the id!'});
        } 
        res.json(posts);
      })
      .catch(err => console.log(err))
});


// @route DELETE api/posts/delete/:id
// @desc delete posts by post id
// @access private

router.delete('/delete/:id', passport.authenticate('jwt', {session:false}),
(req, res) => {
  Profile.findOne({user: req.user.id})
         .then(profile => {

          Post.findById(req.params.id) 
              .then(post => {
        //check for post owner
                if(post.user.toString()  !== req.user.id) {
                  return res.status(400).json({notAuthorized:'User not authorized!'});
                } else {
                  //Delete
                  post.remove()
                      .then(() => res.json({msg:"Success!"}))
                      .catch(err => console.log(err));
                }
              })
              .catch(err => console.log(err));

         })
        .catch(err => console.log(err))
});


module.exports = router;