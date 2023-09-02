const express = require('express');

router = express.Router();

router.get('/', (req, res, next) => {
    res.redirect('/');
})

module.exports = router;