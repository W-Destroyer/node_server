var pool = require('./db_connection');
var sql = require('./sqlmap').user;


class UserDao {
    add(data, cb) {

        var userName = data.userName || 'zhang';
        var password = data.password || '1234567890';

        pool.getConnection((err, connection) => {
            if(err instanceof Error)
                return cb(err);
            connection.query(sql.insert, [userName, password], function(err, result) {
                connection.release();
                if(err instanceof Error)
                    return cb(err);
                cb({
                    code: 0,
                    message: '添加成功！'
                })
            });

        });
    }

    delete(data, cb) {
        var id = data.id;
        console.log(id)
        pool.getConnection((err, connection) => {
            if(err instanceof Error)
                return cb(err);
            console.log(sql.delete)
            connection.query(sql.delete, [id], function(err, result) {
                connection.release();
                console.log(err)
                if(err instanceof Error)
                    return cb(err);
                cb({
                    code: 0,
                    message: '删除成功！'
                })
            });

        });
    }
}

module.exports = new UserDao();