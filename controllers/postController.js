const asyncHandler = require('express-async-handler');

exports.postList = asyncHandler(async (req, res, next) => {
    res.render('posts/list', { title: 'Members Only' });
});