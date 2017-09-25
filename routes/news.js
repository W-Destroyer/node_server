const express = require('express');
const router = express.Router();

const NewsDao = require('../dao/dao_news');

/**
 * 获取显示数量
 * @param  {[type]} '/showcount' [description]
 * @param  {[type]} (req,        res           [description]
 * @return {[type]}              [description]
 */
router.get('/showcount', (req, res) => {
    var newsDao = NewsDao(req.connection);
    newsDao.showCount().then(result => {
        res.sendJSON({
            code: 0,
            data: result
        });
    }).catch(err => {
        res.sendJSON(err);
    })
});

/**
 * 获取新闻列表
 * @param  {[type]} '/list' [description]
 * @param  {[type]} (req,   res           [description]
 * @return {[type]}         [description]
 */
router.get('/list', (req, res) => {
    var data = {
        length: req.query.length
    }

    var newsDao = NewsDao(req.connection);
    newsDao.list(data).then(result => {
        res.sendJSON({
            code: 0,
            data: result
        });
    }).catch(err => {
        res.sendJSON(err);
    })
});

/**
 * 添加新闻
 * @param  {[type]} '/create' [description]
 * @param  {[type]} (req,     res           [description]
 * @return {[type]}           [description]
 */
router.post('/create', (req, res) => {

    var newsDao = NewsDao(req.connection);

});

/**
 * 更新新闻
 * @param  {[type]} '/update' [description]
 * @param  {[type]} (req,     res           [description]
 * @return {[type]}           [description]
 */
router.post('/update', (req, res) => {

    var newsDao = NewsDao(req.connection);
});

/**
 * 删除新闻
 * @param  {[type]} '/delete' [description]
 * @param  {[type]} (req,     res           [description]
 * @return {[type]}           [description]
 */
router.post('/delete', (req, res) => {

    var newsDao = NewsDao(req.connection);

});


module.exports = router;