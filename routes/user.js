const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const UserDao = require('../dao/dao_user');

const crypto = require('crypto-js')

router.get('/login', (req, res) => {
    res.sendJSON({
        code: 0,
        data: '登录成功'
    })
});

router.post('/login', (req, res) => {
    var userData = {
        username: req.body.username,
        password: crypto.SHA256(req.body.password).toString()
    }
    var lastLoginTime = Date.now();
    var token = jwt.sign({
        username: userData.username
    }, lastLoginTime.toString());

    var userDao = UserDao(req.connection);
    userDao.login(userData).then(() => {
        return userDao.setToken({
            username: userData.username,
            lastLoginTime: lastLoginTime,
            token: token
        });
    }).then(() => {
        res.sendJSON({
            code: 0,
            data: {
                token: token
            }
        });
    }).catch(err => {
        res.sendJSON(err);
    });
})

router.get('/verifyLogin', (req, res) => {
    var token = req.query.token;
    res.sendJSON({
        code: 0,
        data: 'token有效'
    })
})

module.exports = router;