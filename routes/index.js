const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');


// posts
router.get('/', postController.postList);

router.get('/post/create', postController.postCreateGet);

router.post('/post/create', postController.postCreatePost);

router.get('/post/:id/update', postController.postUpdateGet);

router.post('/post/:id/update', postController.postUpdatePost);

router.get('/post/:id/delete', postController.postDeleteGet);

router.post('/post/:id/delete', postController.postDeletePost);

router.get('/post/:id', postController.postDetail);

router.get('/posts', postController.postList);


// users
router.get('/sign-up', userController.signUpGet);

router.post('/sign-up', userController.signUpPost);

router.get('/log-in', userController.logInGet);

router.post('/log-in', userController.logInPost);

router.get('/log-out', userController.logOutGet);


module.exports = router;
