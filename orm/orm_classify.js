/**
 *  table sh_type 产品分类 数据表
 *  
 *  field:
 *      id         产品分类ID          int
 *      name       产品分类名称         varchar
 *      describe   产品分类描述         varchar
 *      parentId   产品分类的父类ID     int
 *      grade      
 *      show       是否显示            int 
 *      remark     备注               varchar
 *  
 */

exports.insert = data => {
    // var id = data.id || 0;
    var name = data.name;
    var describe = data.describe;
    var parentId = data.parentId || 0;

    return {
        statement: 'INSERT INTO sh_type(`name`, `describe`, parentId) VALUES(?, ?, ?);',
        data: [name, describe, parentId]
    }
}

exports.update = data => {
    var id = data.id;
    var name = data.name;
    var describe = data.describe;
    var parentId = data.parentId;

    var sql = 'UPDATE sh_type set `name`=?, `describe`=?, `parentId`=? where id=?';
    var sqlData = [name, describe, parentId, id];

    return {
        statement: sql,
        data: sqlData
    }
}

exports.delete = data => {

    var ids = [];
    var q = [];
    data.map(id => {
        ids.push(id);
        q.push('?')
    });

    return {
        statement: 'UPDATE sh_type set `show` = 0 where id in(' + q.join(',') + ')',
        data: ids
    }
}

exports.query = (opts) => {
    var _opts = Object.assign({
        show: 1
    }, opts || {});

    var where = 'WHERE ';

    where += Object.keys(_opts).map(key => {
        return '`' + key + '`' + '=' + _opts[key];
    }).join(' AND ');

    return `SELECT * FROM sh_type ${where};`
}