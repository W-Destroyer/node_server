const express = require('express');
const router = express.Router();

const ProductDao = require('../dao/dao_product');
/**
 * 根据条件获取产品列表
 * 路由 '/product/list'
 * param {
 *     start: 
 *     length: 
 *     type: 
 * }
 * @return {[Object]}         [description]
 */
router.get('/listall', (req, res) => {
    var data = {
        start: req.query.start,
        length: req.query.length,
        type: req.query.type
    }
    var productDao = ProductDao(req.connection);
    productDao.list(data).then(result => {
        res.sendJSON({
            code: 0,
            data: result
        });
    }).catch(err => res.sendJSON(err));
});

/**
 * 新建产品
 * @param  {[type]} '/create' [description]
 * @param  {[type]} (req,     res)          [description]
 * @return {[type]}           [description]
 */
router.post('/create', (req, res) => {
    var data = req.body.data;
    var productDao = ProductDao(req.connection);
    productDao.create(data).then((result) => {
        res.sendJSON({
            code: 0,
            data: result,
            message: '添加成功！'
        });
    }).catch(err => {
        res.sendJSON(err);
    });
});

/**
 * 更新产品
 * @param  {[type]} '/update' [description]
 * @param  {[type]} (req,     res           [description]
 * @return {[type]}           [description]
 */
router.post('/update', (req, res) => {

});
/**
 * 删除产品
 * @param  {[type]} '/delete' [description]
 * @param  {[type]} (req,     res           [description]
 * @return {[type]}           [description]
 */
router.post('/delete', (req, res) => {
    var data = {
        ids: req.body.ids
    };

    var productDao = ProductDao(req.connection);
    productDao.delete(data).then(result => {
        res.sendJSON({
            code: 0,
            // data: result
            message: '删除成功！'
        })
    }).catch(err => res.sendJSON(err));
});

/**
 * 获取产品显示个数
 * @param  {[type]} '/showCount' [description]
 * @param  {[type]} (req,        res           [description]
 * @return {[type]}              [description]
 */
router.get('/showCount', (req, res) => {
    var productDao = ProductDao(req.connection);
    productDao.showCount().then(result => {
        res.sendJSON({
            code: 0,
            data: result
        });
    }).catch(err => res.sendJSON(err));
});

/**
 * 获取产品详情
 * @param  {[type]} '/detail' [description]
 * @param  {[type]} (req,     res           [description]
 * @return {[type]}           [description]
 */
router.get('/detail', (req, res) => {
    var data = {
        productId: req.query.productId
    }
    var productDao = ProductDao(req.connection);
    productDao.detail(data).then(result => {
        res.sendJSON({
            code: 0,
            data: result
        });
    }).catch(err => res.sendJSON(err));
});



router.get('/showCount', (req, res) => {
    var productDao = ProductDao(req.connection);
    productDao.showCount().then(result => {
        res.sendJSON(result);
    }).catch(err => {
        res.sendJSON(err);
    })
});

// router.get('/listProduct', (req, res) => {
//     var data = {
//         start: req.query.start,
//         length: req.query.length,
//         type: req.query.type
//     }
//     var productDao = ProductDao(req.connection);
//     productDao.listProduct(data).then(result => {
//         res.sendJSON(result);
//     }).catch(err => {
//         res.sendJSON(err);
//     })
// });

// router.post('/addProduct', (req, res) => {
//     var data = JSON.parse(req.body.data)
//     console.log(data)
//     var productDao = ProductDao(req.connection);
//     productDao.addProduct(data).then((result) => {
//         res.sendJSON(result);
//     }).catch(err => {
//         res.sendJSON(err);
//     });
// })

// router.get('/getdetail', (req, res) => {
//     var data = {
//         productId: req.query.productId
//     }
//     var productDao = ProductDao(req.connection);
//     productDao.getDetail(data).then(result => {
//         res.sendJSON(result);
//     }).catch(err => {
//         res.sendJSON(err);
//     })
// })

module.exports = router;