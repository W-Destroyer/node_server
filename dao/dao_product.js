var sysconfigSql = require('./sqlmap').sysconfig;
var productSql = require('./sqlmap').product;

var productORM = require('../orm/orm_product');

class ProductDao {
    
    constructor(connection) {
        this.connection = connection;
        this.SQL = {

        }
    }

    list(data) {
        var sql = productORM.list({
            start: data.start,
            length: data.length,
            type: data.type
        });

        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if(err instanceof Error)
                    return reject(err);
                var total = result.length;
                var productList = result.splice(data.start, data.length);
                resolve({
                    total: total,
                    productList: productList
                });
            });
        });
    }

    create(data) {
        var sql = productORM.insert({
            name: data.name,
            type: data.type,
            price: data.price,
            colors: JSON.stringify(data.colors),
            sizes: JSON.stringify(data.sizes),
            masterPic: data.masterPic,
            picture: JSON.stringify(data.productImages),
            describe: data.describe
        });

        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err)
                    return reject(err);
                resolve();
            })
        });
    }

    update(data) {

        return new Promise((resolve, reject) => {

        });
    }

    delete(data) {
        var sql = productORM.delete(data);
        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve(result);
            })
        });
    }

    detail(data) {
        var sql = productORM.detail({
            productId: data.productId
        })
        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve(result[0]);
            })
        });
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
