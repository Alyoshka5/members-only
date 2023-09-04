const asyncHandler = require('express-async-handler');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.signUpGet = (req, res, next) => {
  if (req.user) return res.redirect('/');
  res.render('users/sign-up', { title: 'Sign Up' });
};

exports.signUpPost = [
  body('firstName', 'First name must be between 1 and 50 characters')
    .trim()
    .isString()
    .isLength({ min: 1, max: 50 })
    .escape(),
    
  body('lastName', 'Last name must be between 1 and 50 characters')
    .trim()
    .isString()
    .isLength({ min: 1, max: 50 })
    .escape(),
    
  body('username', 'Must provide a valid email address')
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape(),
    
  body('password', 'Password must be at least 8 characters long')
    .isLength({ min: 8 }),

  body('confirmPassword')
    .custom((password, { req }) => {
      return password === req.body.password;
    })
    .withMessage('Passwords must match'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.username,
        password: hashedPassword
      });
  
      const userWithEmail = await User.findOne({ email: user.email }).exec();
      if (userWithEmail)
        errors.errors.push({ msg: 'A user with this email already exists' });
  
      if (!errors.isEmpty()) {
        res.render('users/sign-up', {
          title: 'Sign Up',
          user,
          errors: errors.array()
        });
        return;
      }
    
      await user.save();
      req.login(user, function(err) {
        if (err) next(err);
        return res.redirect('/');
      });
    });
  })
]

exports.logInGet = (req, res, next) => {
  if (req.user) return res.redirect('/');
  res.render('users/log-in', { title: 'Log In' });
}

exports.logInPost = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in'
})

exports.logOutGet = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect('/');
  })
}

exports.detail = asyncHandler(async (req, res, next) => {
	res.send('');
});

exports.updateGet = asyncHandler(async (req, res, next) => {
  res.send('');
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  res.send('');
});

exports.deleteGet = asyncHandler(async (req, res, next) => {
  res.send('');
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  res.send('');
});
