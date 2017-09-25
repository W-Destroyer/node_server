var express = require('express');
var router = express.Router();

var UserDao = require('../dao/dao_user');
var SysConfigDao = require('../dao/dao_sysconfig')

/**
 * getCompanyName 获取公司名称
 * @param  {[type]} '/getCompanyName' [description]
 * @param  {[type]} (req,             res           [description]
 * @return {[type]}                   [description]
 */
router.get('/getCompanyName', (req, res) => {
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.getCompanyName().then(result => {
        res.sendJSON({
            code: 0,
            data: result
        });
    }).catch(err => {
        res.sendJSON(err);
    })
});

/**
 * setCompanyName 设置公司名称
 * @param  {[type]} '/setCompanyName' [description]
 * @param  {[type]} (req,             res           [description]
 * @return {[type]}                   [description]
 */
router.post('/setCompanyName', (req, res) => {
    var data = {
        name: req.body.data
    };
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.setCompanyName(data).then(result => {
        res.sendJSON({
            code: 0,
            data: '',
            message: '修改成功！'
        });
    }).catch(err => {
        res.sendJSON(err)
    })
})

/**
 * friendLink/list 获取友情链接列表
 * @param  {[type]} '/listFriendLink' [description]
 * @param  {[type]} (req,             res           [description]
 * @return {[type]}                   [description]
 */
router.get('/friendLink/list', (req, res) => {
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.listFriendLink().then(result => {
        res.sendJSON({
            code: 0,
            data: result
        });
    }).catch(err => {
        res.sendJSON(err);
    })
});

/**
 * friendLink/create 新增友情链接
 * @param  {[type]} '/saveFriendLink' [description]
 * @param  {[type]} (req,             res           [description]
 * @return {[type]}                   [description]
 */
router.post('/friendLink/create', (req, res) => {
    var data = req.body;
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.createFriendLink(data).then(result => {
        res.sendJSON({
            code: 0,
            data: '', //result
            message: '添加成功！'
        });
    }).catch(err => {
        res.sendJSON(err);
    });
})

/**
 * friendLink/update  修改友情链接
 * @param  {[type]} '/friendLink/update' [description]
 * @param  {[type]} (req,                res           [description]
 * @return {[type]}                      [description]
 */
router.post('/friendLink/update', (req, res) => {
    var data = req.body;
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.updateFriendLink(data).then(result => {
        res.sendJSON({
            code: 0,
            data: '',
            message: '修改成功！'
        })
    }).catch(err => {
        res.sendJSON(err);
    })
})

/**
 * friendLink/delete 删除友情链接
 * @param  {[type]} '/delFriendLink' [description]
 * @param  {[type]} (req,            res           [description]
 * @return {[type]}                  [description]
 */
router.post('/friendLink/delete', (req, res) => {
    var data = req.body;
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.deleteFriendLink(data).then(result => {
        res.sendJSON({
            code: 0,
            data: '', //result
            message: '删除成功！'
        });
    }).catch(err => {
        res.sendJSON(err);
    });
});

/**
 * banner/list 获取轮播图列表
 * @param  {[type]} '/banner/listall' [description]
 * @param  {[type]} (req,             res           [description]
 * @return {[type]}                   [description]
 */
router.get('/banner/list', (req, res) => {
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDao.listBanner().then(result => {
        res.sendJSON({
            code: 0,
            data: result
        });
    }).catch(err => {
        res.sendJSON(err);
    });
});

/**
 * banner/create 新建轮播图
 * @param  {[type]} '/banner/create' [description]
 * @param  {[type]} (req,            res           [description]
 * @return {[type]}                  [description]
 */
router.post('/banner/create', (req, res) => {
    var data = req.body;
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDap.createBanner(data).then(result => {
        res.sendJSON({
            code: 0,
            data: '',
            message: '添加成功！'
        });
    }).catch(err => {
        res.sendJSON(err);
    });
});

/**
 * banner/update 修改轮播图
 * @param  {[type]} '/banner/update' [description]
 * @param  {[type]} (req,            res           [description]
 * @return {[type]}                  [description]
 */
router.post('/banner/update', (req, res) => {
    var data = req.body;
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDap.updateBanner(data).then(result => {
        res.sendJSON({
            code: 0,
            data: '',
            message: '修改成功！'
        });
    }).catch(err => {
        res.sendJSON(err);
    });
});

/**
 * banner/delete 删除轮播图
 * @param  {[type]} '/banner/delete' [description]
 * @param  {[type]} (req,            res           [description]
 * @return {[type]}                  [description]
 */
router.post('/banner/delete', (req, res) => {
    var data = req.body;
    var sysConfigDao = SysConfigDao(req.connection);
    sysConfigDap.deleteBanner(data).then(result => {
        res.sendJSON({
            code: 0,
            data: '',
            message: '删除成功！'
        });
    }).catch(err => {
        res.sendJSON(err);
    });
});

module.exports = router;