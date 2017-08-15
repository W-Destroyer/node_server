const express = require('express');
const router = express.Router();

const ProductDao = require('../dao/dao_product');

router.get('/showCount', (req, res) => {
    var productDao = ProductDao(req.connection);
    productDao.showCount().then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    })
});

router.get('/listProduct', (req, res) => {
    var data = {
        start: req.query.start,
        length: req.query.length,
        type: req.query.type
    }
    var productDao = ProductDao(req.connection);
    productDao.listProduct(data).then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    })
});

router.post('/addProduct', (req, res) => {
    var data = JSON.parse(req.body.data)
    console.log(data)
    var productDao = ProductDao(req.connection);
    productDao.addProduct(data).then((result) => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    });
})

router.get('/getdetail', (req, res) => {
    var data = {
        productId: req.query.productId
    }
    var productDao = ProductDao(req.connection);
    productDao.getDetail(data).then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    })
})

module.exports = router;