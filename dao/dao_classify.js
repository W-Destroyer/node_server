var classifySql = require('./sqlmap').classify;


class ClassifyDao {
    
    constructor(connection) {
        this.connection = connection;
    }

    list(data) {
        // var name = data.name
        return new Promise((resolve, reject) => {
            this.connection.query(classifySql.queryAll, function(err, result) {
                console.log(err)
                if(err instanceof Error)
                    return reject(err);
                resolve({
                    code: 0,
                    data: result
                });
            });
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

module.exports = connection => new ClassifyDao(connection);
