const express = require('express');
const passport = require('passport');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/posts');

// @route POST /api/posts
// @desc create post
// @access Private
router.post('/', passport.authenticate('jwt',{session:false}),
(req,res) =>{
  console.log('Create Post called!');
  // Check Validation
  const {errors, isValid} = validatePostInput(req.body);
    if (!isValid) {
      console.log('Validation failed');
      return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
           .then(profile => {
           
                const newPost = new Post({
                user: req.user.id,
                name: req.body.name,
                image: req.body.image,
                avatar: req.body.avatar,
                text: req.body.text,
                handle: req.user.username
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

// @route GET api/posts/currentUser
// @desc Get posts for current user
// @access private
router.get('/currentUser', passport.authenticate('jwt',{session: false}),
(req, res) => {
  console.log('Inside current user::');
  console.log('Current user user id '+req.user.id)
  Post.find({user:req.user.id})
      .then(posts => {
        if(!posts) {
          console.log('No Posts');
          return res.status(404).json({posts:'No Posts found for the user!'});
        } 
        return res.json(posts);
      })
      .catch(err => console.log(err))
});


// @route GET api/posts/handle/:handle
// @desc Get posts by post handle
// @access private
router.get('/handle/:handle', passport.authenticate('jwt',{session: false}),
(req, res) => {
  
  Post.find({handle:req.params.handle})
      .then(posts => {
        if(!posts) {
          return res.status(404).json({posts:'No Posts found for the user!'});
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


// @route POST api/posts/like/:id
// @desc Like post 
// @access private
router.post('/like/:id', passport.authenticate('jwt',{session: false}),
(req, res) => {
  Profile.findOne({user: req.user.id}) 
         .then(profile => {
           Post.findById(req.params.id)
               .then(post => {
                if(post){
                   if(
                   post.likes.filter(like => 
                    (like.user.toString() === req.user.id)).length >= 1) {
                      return res.status(400).json({post:'Post already liked'});
                    } else {
                      const newLike = {
                        user: req.user.id,
                        handle: (profile.handle)?profile.handle:''
                      }
                      post.likes.unshift(newLike);
                      post.save()
                          .then(post => res.json(post));
                    }
                } else {
                  return res.status(404).json({postNotFound:'No Post Found!'});
                }
               })
               .catch(err => console.log(err))
         })
         .catch(err => console.log(err))
});


// @route POST api/posts/unLike/:id
// @desc UnLike post 
// @access private
router.post('/unLike/:id', passport.authenticate('jwt',{session: false}),
(req, res) => {
  Profile.findOne({user: req.user.id}) 
         .then(profile => {
           Post.findById(req.params.id)
               .then(post => {
                if(post){
                  if(
                    post.likes.filter(like => 
                      like.user.toString() === req.user.id) === 0) {
                        return res.status(400).json({
                          notLiked:'You have not liked this post!'
                        }) 
                        } else {
                          const removeIndex = post.likes.map(item =>
                            item.user.toString()).indexOf(req.user.id);
                          post.likes.splice(removeIndex,1);
                          post.save()
                              .then(post => res.json(post))
                              .catch(err => console.log(err));
                        }
                      } else {
                        return res.status(400).json({postNotFound:'Post Not Found!'})
                      }
                })
               .catch(err => console.log(err))
         })
         .catch(err => console.log(err))
});

// @route POST api/posts/comment/:id
// @desc comment a post 
// @access private
router.post('/comment/:id', passport.authenticate('jwt',{session:false}),
(req,res) => {

  // Check Validation
  const {errors, isValid} = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
  Profile.findOne({user:req.user.id}) 
         .then(profile=> {

          Post.findById(req.params.id)
              .then(post => {
        if(!post) {
          return res.status(400).json({notFound:'Post not found!'});
        } else {
          const newComment = {
            user: req.user.id,
            name: req.body.name,
            avatar: req.body.avatar,
            text: req.body.text,
            handle: (profile.handle)?profile.handle:''
            
          };
          post.comments.unshift(newComment);
          post.save()
              .then(updatedPost => res.json(updatedPost))
              .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));

         })
         .catch(err => console.log(err))
  

});

// @route DELETE api/posts/comment/delete/:post_id/:comment_id
// @desc delete comment a post 
// @access private

router.delete('/comment/delete/:post_id/:comment_id', 
passport.authenticate('jwt',{session: false}),
(req,res) => {
  
  Post.findById(req.params.post_id)
      .then(post => {
        if(!post) {
          return res.status(400).json({postNotFound:'Post not found!'})
        } else {
          if(post.comments.filter(comment => (
            comment._id.toString() === req.params.comment_id)) === 0) {
              return res.status(400).json({commentNotFound:'Comment Not Found!'});
            } else {
              const removeIndex = post.comments.map(item =>
                item._id).indexOf(req.params.comment_id);
                post.comments.splice(removeIndex,1);
                post.save()
                    .then(updatedPost => res.json(updatedPost))
                    .catch(err => console.log(err));
            }
          }
        })
      .catch(err => console.log(err));
});


module.exports = router;