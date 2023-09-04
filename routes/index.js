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

router.get('/post/:id', postController.detail);

router.get('/posts', postController.list);


// users
router.get('/sign-up', userController.signUpGet);

router.post('/sign-up', userController.signUpPost);

router.get('/log-in', userController.logInGet);

router.post('/log-in', userController.logInPost);

router.get('/log-out', userController.logOutGet);

router.get('/user/join', userController.joinGet);

router.post('/user/join', userController.joinPost);

router.get('/user/admin', userController.adminGet);

router.post('/user/admin', userController.adminPost);

router.get('/user/:id/update', userController.updateGet);

router.post('/user/:id/update', userController.updatePost);

router.get('/user/:id/delete', userController.deleteGet);

router.post('/user/:id/delete', userController.deletePost);

router.get('/user/:id', userController.detail);


module.exports = router;
