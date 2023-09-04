const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Post = require('../models/post');

exports.list = asyncHandler(async (req, res, next) => {
    const posts = await Post.find({}).populate('author').sort({datePosted: -1}).exec();
    res.render('posts/list', {
        title: 'Members Only',
        posts
    });
});

exports.detail = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate('author').exec();

    if (post === null) {
        const err = new Error('Post not found');
        err.status = 404;
        next(err);
    }

    res.render('posts/detail', {
        title: 'View Post',
        post
    })
});

exports.createGet = asyncHandler(async (req, res, next) => {
    if (req.user)
        res.render('posts/form', {
            title: 'Create Post'
        });
    else
        res.redirect('/');
});

exports.createPost = [
    body('title')
        .trim()
        .isLength({ min: 1 })
        .withMessage('You must include a title')
        .isLength({ max: 150 })
        .withMessage('Title cannot be longer than 150 characters')
        .escape(),

    body('content', 'You must include a message in your post')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            author: req.user._id,
            title: req.body.title,
            content: req.body.content
        });

        if (!errors.isEmpty()) {
            res.render('posts/form', {
                title: 'Create Post',
                post,
                errors: errors.array()
            });
            return;
        }

        await post.save();
        res.redirect('/');
    })
]

exports.updateGet = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).exec();

    if (req.user._id.toString() !== post.author.toString())
        return res.redirect(post.url);

    if (post === null) {
        const err = new Error('Post not found');
        err.status = 404;
        next(err);
    }

    res.render('posts/form', {
        title: 'Update Post',
        post
    });
});

exports.updatePost = [
    body('title')
        .trim()
        .isLength({ min: 1 })
        .withMessage('You must include a title')
        .isLength({ max: 150 })
        .withMessage('Title cannot be longer than 150 characters')
        .escape(),

    body('content', 'You must include a message in your post')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            author: req.user._id,
            title: req.body.title,
            content: req.body.content,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            res.render('posts/form', {
                title: 'Create Post',
                post,
                errors: errors.array()
            });
            return;
        }

        await Post.findByIdAndUpdate(req.params.id, post, {});
        res.redirect(post.url);
    })
]

exports.deleteGet = asyncHandler(async (req, res, next) => {
    res.send('');
});

exports.deletePost = asyncHandler(async (req, res, next) => {
    res.send('');
});