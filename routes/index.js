const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');


// posts
router.get('/', postController.list);

router.get('/post/create', postController.createGet);

router.post('/post/create', postController.createPost);

router.get('/post/:id/update', postController.updateGet);

router.post('/post/:id/update', postController.updatePost);

router.get('/post/:id/delete', postController.deleteGet);

router.post('/post/:id/delete', postController.deletePost);

router.get('/post/:id', postController.detail);

router.get('/posts', postController.list);


// users
router.get('/sign-up', userController.signUpGet);

router.post('/sign-up', userController.signUpPost);

router.get('/log-in', userController.logInGet);

router.post('/log-in', userController.logInPost);

router.get('/log-out', userController.logOutGet);


module.exports = router;
