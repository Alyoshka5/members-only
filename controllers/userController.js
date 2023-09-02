const asyncHandler = require('express-async-handler');

const User = require('../models/user');

exports.signUpGet = (req, res, next) => {
    res.render('users/sign-up');
};

exports.signUpPost = asyncHandler(async (req, res, next) => {
    try {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.username,
        password: req.body.password
      });
  
      await user.save();
      res.redirect('/');
    } catch (err) {
      return next(err);
    }
})