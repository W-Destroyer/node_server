var express = require('express');
var router = express.Router();
var userDao = require('../dao/dao_user');

router.get('/add', function(req, res, next) {
    var data = {
        userName: 'user_' + Math.random(),
        password: '12345678'
    }
    userDao.add(data, response => {
        res.send(response);
    });
});

router.get('/delete', (req, res, next) => {
    var data = {
        id: req.query.id
    }

    userDao.delete(data, response => {
        res.send(response);
    })
});

module.exports = router;