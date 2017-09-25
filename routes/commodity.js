const express = require('express');
const router = express.Router();

const ProductDao = require('../dao/dao_product');
const ClassifyDao = require('../dao/dao_classify');

router.get('/showCount', (req, res) => {
    var productDao = ProductDao(req.connection);
    productDao.showCount().then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    });
});

router.get('/listProduct', (req, res) => {
    var data = {
        start: req.query.start,
        length: req.query.length,
        type: req.query.type
    }
    // console.log()
    console.log(data)
    var productDao = ProductDao(req.connection);
    productDao.listProduct(data).then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    });
});

router.get('/getdetail', (req, res) => {
    var data = {
        productId: req.query.productId
    }
    var productDao = ProductDao(req.connection);
    productDao.getDetail(data).then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    });
});

router.get('/listClassify', (req, res) => {
    var classifyDao = ClassifyDao(req.connection);
    classifyDao.listClassify().then(result => {
        res.sendJSON({
            code: 0,
            data: result
        });
    }).catch(err => {
        res.sendJSON(err);
    });
});

module.exports = router;