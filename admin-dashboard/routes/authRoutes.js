const express = require('express');
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware')
const jwt = require('jsonwebtoken');


// const authController = require('../controllers/authController');
const {signUp, login, adminProfile} = require('../controllers/authController');

const router = express.Router();

// local routes

router.post('/signup',signUp)
router.post('/login',login)
router.get('/admin-profile',authMiddleware,adminProfile)



// google routes

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {session: false}),
  (req, res) => {
    console.log(req.user._id,'jwt executing ')
    const token = jwt.sign({ id: req.user._id},process.env.JWT_SECRET)
    console.log(req.user,token,'jwt in auth')
      // res.redirect('/auth/profile'); // Redirect to a profile page or another route
      res.redirect(`http://localhost:5173?token=${token}`); // Redirect to a profile page or another route
  }
);




module.exports = router
