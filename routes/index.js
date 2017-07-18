var express = require('express');
var router = express.Router();

var routeMiddleware = require('../utils/routemiddleware');
var UserDao = require('../dao/dao_user');

router.get('/add', (req, res, next) => {
    var data = {
        userName: 'user_' + Math.random(),
        password: '12345678'
    }
    var userDao = UserDao(req.connection);
    userDao.add(data).then(result => {
        res.sendJSON(result)
    }).catch(err => {
        res.sendJSON(err);
    })
})

router.get('/delete', (req, res, next) => {
    var data = {
        id: req.query.id
    }

    var userDao = UserDao(connection);
    userDao.delete(data).then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    });
})

module.exports = router;