const express = require('express');
const router = express.Router();

const NewsDao = require('../dao/dao_news');

router.get('/list', (req, res) => {
    var data = {
        length: req.query.length
    }

    var newsDao = NewsDao(req.connection);
    newsDao.list(data).then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    })
});

router.get('/showcount', (req, res) => {
    var newsDao = NewsDao(req.connection);
    newsDao.showCount().then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    })
})

module.exports = router;