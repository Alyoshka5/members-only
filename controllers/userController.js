const asyncHandler = require('express-async-handler');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Post = require('../models/post');

exports.signUpGet = (req, res, next) => {
  if (req.user) return res.redirect('/');
  res.render('users/account-form', {
    title: 'Sign Up',
    action: 'create'
  });
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
        res.render('users/account-form', {
          title: 'Sign Up',
          user,
          action: 'create',
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
	const user = await User.findById(req.params.id).exec();

	if (!(req.user && (['member', 'admin'].includes(req.user.status) || req.user._id.toString() === user._id.toString()))) {
		return res.redirect('/');
	}

	const postsByUser = await Post.find({ author: user._id }).exec();

	res.render('users/detail', {
		title: 'View User',
		user,
		postsByUser
	})
});

exports.updateGet = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();

  if (user === null) {
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }

	if (!(req.user && req.user._id.toString() === user._id.toString())) {
		return res.redirect(user.url);
	}

  res.render('users/account-form', {
    title: 'Update account',
    user,
    action: 'update'
  });

});

exports.updatePost = [
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

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const existingUser = await User.findById(req.params.id).exec();

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.username,
      status: req.body.status,
      _id: req.params.id
    });

    const userWithEmail = await User.findOne({ email: user.email }).exec();
    if (userWithEmail && user.email !== existingUser.email)
      errors.errors.push({ msg: 'A user with this email already exists' });

    if (!errors.isEmpty()) {
      res.render('users/account-form', {
        title: 'Update Account',
        user,
        action: 'update',
        errors: errors.array()
      });
      return;
    }
  
    await User.findByIdAndUpdate(req.params.id, user, {});
    res.redirect(user.url);
  })
]

exports.deleteGet = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();
  if (!(req.user && req.user._id.toString() === user._id.toString())) return res.redirect(user.url);

  res.render('users/delete', { title: 'Delete Account' });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  await User.findByIdAndRemove(req.params.id);
  await Post.deleteMany({ author: req.params.id });

  res.redirect('/');
});
