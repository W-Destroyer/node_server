var express = require('express');
var router = express.Router();

var routeMiddleware = require('../utils/routemiddleware');
var UserDao = require('../dao/dao_user');

router.get('/add', routeMiddleware((req, res, connection, cb) => {
    var data = {
        userName: 'user_' + Math.random(),
        password: '12345678'
    }
    var userDao = UserDao(connection);
    userDao.add(data).then(result => {
        res.send(result)
        cb();
    }).catch(err => {
        res.send(err);
        cb();
    })

}));

router.get('/delete', routeMiddleware((req, res, connection, cb) => {
    var data = {
        id: req.query.id
    }

    var userDao = UserDao(connection);
    userDao.delete(data).then(response => {
        res.send(response);
        cb();
    }).catch(err => {
        res.send(err);
        cb();
    });
}));

router.get('*', (req, res) => {
    res.send({
        code: '-1',
        message: `Don't have this api`
    })
})

module.exports = router;