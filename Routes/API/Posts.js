const express = require('express');
const router = express.Router();

//@route  GET  /api/posts/test
//@desc   User's Posts
//@access Public 

router.get('/test', (req, res) => res.json({
  msg: 'Post Route works!'
}));

module.exports = router;