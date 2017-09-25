const express = require('express');
const router = express.Router();

const ClassifyDao = require('../dao/dao_classify');
/**
 * [description]
 * @param  {[type]} '/listall' [description]
 * @param  {[type]} (req,      res           [description]
 * @return {[type]}            [description]
 */
router.get('/listall', (req, res) => {
    var data = req.query;
    var classifyDao = ClassifyDao(req.connection);
    classifyDao.list().then(result => {

        res.sendJSON({
            code: 0,
            data: buildClassifyTree(result)
        });
    }).catch(err => {
        res.sendJSON(err);
    })
});

function buildClassifyTree(data) {

    var classifyTree = data.filter(item => item.parentId === 0);
    var children = data.filter(item => item.parentId !== 0);

    classifyTree.map(item => {
        return buildTreeChildren(item, children);
    });

    function buildTreeChildren(parent, children) {
        var thisChildren = children.filter(child => child.parentId === parent.id);
        if (thisChildren.length === 0)
            return parent;

        var otherChildren = children.filter(child => child.parentId !== parent.id);

        thisChildren.map(item => {
            return buildTreeChildren(item, otherChildren);
        });

        parent.children = thisChildren;
        return parent;
    }

    return classifyTree
    
}

/**
 * [description]
 * @param  {[type]} '/create' [description]
 * @param  {[type]} (req,     res           [description]
 * @return {[type]}           [description]
 */
router.post('/create', (req, res) => {
    var data = req.body;
    var classifyDao = ClassifyDao(req.connection);
    classifyDao.create(data).then(result => {
        res.sendJSON({
            code: 0,
            data: result,
            message: '添加成功！'
        });
    }).catch(err => res.sendJSON(err));
});

/**
 * [description]
 * @param  {[type]} '/update' [description]
 * @param  {[type]} (req,     res           [description]
 * @return {[type]}           [description]
 */
router.post('/update', (req, res) => {
    var data = req.body;
    var classifyDao = ClassifyDao(req.connection);
    classifyDao.update(data).then(result => {
        res.sendJSON({
            code: 0,
            data: '',
            message: '修改成功！'
        });
    }).catch(err => res.sendJSON(err));
});

/**
 * [description]
 * @param  {[type]} '/delete' [description]
 * @param  {[type]} (req,     res           [description]
 * @return {[type]}           [description]
 */
router.post('/delete', (req, res) => {
    var data = req.body.data;
    var classifyDao = ClassifyDao(req.connection);
    classifyDao.delete(data).then(result => {
        res.sendJSON({
            code: 0,
            data: result,
            message: '删除成功！'
        })
    }).then(err => res.sendJSON(err));
});

module.exports = router;