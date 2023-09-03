const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');


/* GET home page. */
router.get('/', postController.postList);

router.get('/sign-up', userController.signUpGet);

router.post('/sign-up', userController.signUpPost);

router.get('/log-in', userController.logInGet);

router.post('/log-in', userController.logInPost);

router.get('/log-out', userController.logOutGet);


module.exports = router;
