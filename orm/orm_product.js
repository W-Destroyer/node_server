/**
 *  table sh_product 产品分类 数据表
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

exports.list = data => {
    var type = data.type;
    if (!!type && type != 0)
        return {
            statement: 'SELECT t1.id as id,t1.name as name,price,amount,t2.id as typeId, t2.name as typename,masterPic FROM sh_products t1 left join sh_type t2 on t1.type = t2.id where isShow = 1 AND t1.type = ?;',
            data: [type]
        }
    return {
        statement: 'SELECT t1.id as id,t1.name as name,price,amount,t2.id as typeId, t2.name as typename,masterPic FROM sh_products t1 left join sh_type t2 on t1.type = t2.id where isShow = 1;',
        data: []
    }
}

exports.insert = data => {
    console.log(data)
    var name = data.name;
    var type = data.type;
    var price = data.price;
    var colors = data.colors;
    var sizes = data.sizes;
    var masterPic = data.masterPic;
    var picture = data.picture;
    var describe = data.describe;

    return {
        statement: 'INSERT INTO sh_products(`name`, `type`, `price`, `colors`, `sizes`, `masterPic`, `picture`, `describe`) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
        data: [name, type, price, colors, sizes, masterPic, picture, describe]
    }
}

exports.update = data => {
    
}

exports.delete = data => {
    var ids = data.ids;

    return {
        statement: 'UPDATE sh_products SET `isShow`=0 WHERE id in(' + ids.join(',') + ')',
        data: ids
    }
}

exports.detail = data => {
    var productId = data.productId;

    return {
        statement: 'SELECT t1.id as id,t1.name as name,price,amount,t2.id as typeId, t2.name as typename,masterPic FROM sh_products t1 left join sh_type t2 on t1.type = t2.id where t1.id = ?;',
        data: [productId]
    }
}