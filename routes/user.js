const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const UserDao = require('../dao/dao_user');

const crypto = require('crypto-js')

const cert = 'hahhahahhaha';

router.post('/login', (req, res) => {
    var userData = {
        username: req.body.username,
        password: crypto.SHA256(req.body.password).toString()
    }
    var lastLoginTime = Date.now();
    var token = jwt.sign({
        username: userData.username,
        lastLoginTime: lastLoginTime
    }, cert);

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
    jwt.verify(token, cert, (err, decoded) => {
        if (err)
            return res.sendJSON(new Error('invalid token'));
        
        var userDao = UserDao(req.connection);
        userDao.getTokenByName(decoded.username).then(result => {
            if (result['a_token'] === token)
                return res.sendJSON({
                    code: 0,
                    data: 'token is valid'
                });
            return res.sendJSON(new Error('invalid token'));
        }).catch(err => {
            res.sendJSON(err);
        })
    });
})

module.exports = router;