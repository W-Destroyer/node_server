const express = require('express');
const router = express.Router();

const ClassifyDao = require('../dao/dao_classify');

router.get('/listall', (req, res) => {
    var classifyDao = ClassifyDao(req.connection);
    classifyDao.list().then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    })
});

module.exports = router;