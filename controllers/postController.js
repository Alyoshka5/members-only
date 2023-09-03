const asyncHandler = require('express-async-handler');

exports.list = asyncHandler(async (req, res, next) => {
    res.render('posts/list', { title: 'Members Only' });
});

exports.detail = asyncHandler(async (req, res, next) => {
    res.send('');
});

exports.createGet = asyncHandler(async (req, res, next) => {
    res.send('');
});

exports.createPost = asyncHandler(async (req, res, next) => {
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