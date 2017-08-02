var express = require('express');
var router = express.Router();

var UserDao = require('../dao/dao_user');
var SysConfigDao = require('../dao/dao_sysconfig')

router.get('/getCompanyName', (req, res) => {
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.getCompanyName().then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    })
});

router.post('/setCompanyName', (req, res) => {
    var data = req.body;
    console.log(data);
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.setCompanyName(data).then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err)
    })
})

router.get('/listFriendLink', (req, res) => {
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.listFriendLink().then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    })
})

router.post('/saveFriendLink', (req, res) => {
    var data = req.body;
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.saveFriendLink(data).then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    });
})

router.get('/friendlink/listall', (req, res) => {
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.listFriendLink().then(result => {
        res.sendJSON(result)
    }).catch(err => {
        res.sendJSON(err);
    })
})

router.get('/delete', (req, res, next) => {
    
})

router.get('/banner/listall', (req, res) => {
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.listBanner().then(result => {
        res.sendJSON(result)
    }).catch(err => {
        res.sendJSON(err);
    })
})

router.get('*', (req, res) => {
    res.send({
        code: '-1',
        message: `Don't have this api`
    })
})

module.exports = router;