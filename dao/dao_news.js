var newsSql = require('./sqlmap').news;
var articleSql = require('./sqlmap').article;


class NewsDao {
    
    constructor(connection) {
        this.connection = connection;
    }

    list(data) {
        // var name = data.name
        var len = parseInt(data.length);
        return new Promise((resolve, reject) => {
            this.connection.query(articleSql.queryAll, function(err, result) {
                console.log(err)
                if(err instanceof Error)
                    return reject(err);
                console.log(result)
                resolve(result.splice(0, len));
            });
        })
    }

    showCount() {
        return new Promise((resolve, reject) => {
            this.connection.query(newsSql.queryShowCount, ['config'], (err, result) => {
                if(err instanceof Error)
                    return reject(err);
                resolve({
                    code: 0,
                    data: result[0]['n_desc']
                });
            })
        })
    }

    delete(data, cb) {
        var id = data.id;
        console.log(id);
        console.log(sql.delete);
        return new Promise((resolve, reject) => {
            this.connection.query(sql.delete, [id], function(err, result) {
                if(err instanceof Error)
                    return reject(err);
                resolve({
                    code: 0,
                    message: '删除成功！'
                })
            });
        })
    }
}

module.exports = connection => new NewsDao(connection);
