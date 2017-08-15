var sysconfigSql = require('./sqlmap').sysconfig;
var productSql = require('./sqlmap').product;

class ProductDao {
    
    constructor(connection) {
        this.connection = connection;
    }

    showCount() {
        return new Promise((resolve, reject) => {
            this.connection.query(sysconfigSql.queryByType, ['product'], (err, result) => {
                if(err instanceof Error)
                    return reject(err);
                var showCount = result.find(item => item['s_name'] == 'showcount');
                resolve({
                    code: 0,
                    data: showCount['s_value']
                });
            });
        })
    }

    listProduct(data) {
        var start = data.start;
        var length = data.length;
        var type = data.type;
        return new Promise((resolve, reject) => {
            var queryProductSql = type == 0 ? productSql.queryAll : productSql.queryByType;
            this.connection.query(queryProductSql, [type], (err, result) => {
                if(err instanceof Error)
                    return reject(err);
                var total = result.length;
                var productList = result.slice(start, length);
                resolve({
                    code: 0,
                    data: {
                        total: total,
                        productList: productList
                    }
                });
            });
        })
    }

    addProduct(data) {
        var name = data.name;
        var type = data.type.id;
        var price = data.price;
        var colors = JSON.stringify(data.colors);
        var sizes = JSON.stringify(data.sizes);
        var masterPic = JSON.stringify(data.masterPic);
        var picture = JSON.stringify(data.productImages);
        var describe = data.describe;
        return new Promise((resolve, reject) => {
            this.connection.query(productSql.insert, [name, type, price, colors, sizes, masterPic, picture, describe], (err, result) => {
                if (err)
                    return reject(err)
                resolve({
                    code: 0,
                    data: '保存成功！'
                })
            })
        })
    }

    getDetail(data) {
        var productId = data.productId;
        console.log(productId)
        return new Promise((resolve, reject) => {
            this.connection.query(productSql.queryById, [productId], (err, result) => {
                if(err instanceof Error)
                    return reject(err);
                resolve(result[0])
            })
        })

    }
}

module.exports = connection => new ProductDao(connection);
