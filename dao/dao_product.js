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
