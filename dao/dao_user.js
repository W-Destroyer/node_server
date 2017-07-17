var pool = require('./db_connection');
var sql = require('./sqlmap').user;


class UserDao {
    
    constructor(connection) {
        this.connection = connection;
    }

    add(data) {

        var userName = data.userName || 'zhang';
        var password = data.password || '1234567890';
        return new Promise((resolve, reject) => {
            this.connection.query(sql.insert, [userName, password], function(err, result) {
                if(err instanceof Error)
                    return reject(err);
                resolve({
                    code: 0,
                    message: '添加成功！'
                })
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

module.exports = connection => new UserDao(connection);