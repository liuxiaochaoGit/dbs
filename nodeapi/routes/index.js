const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

// test socket
router.get('/socket', function (req, res) {
    res.render('socketTest', {title: 'SOCKET'});
});


module.exports = router;
