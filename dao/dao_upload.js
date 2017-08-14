const fileSql = require('./sqlmap').file;

class UploadDao {
    constructor(connection) {
        this.connection = connection;
    }

    add(data) {
        var originalName = data.name;
        var newName = data.name;
        var path = data.path;
        var type = data.type;
        return new Promise((resolve, reject) => {
            this.connection.query(fileSql.insert, [originalName, newName, path, type], (err, result) => {
                if (err)
                    return reject(err);
                this.connection.query(fileSql.lastInsert, (err, result) => {
                    if (err)
                        return reject(err);
                    resolve(result);
                })
            })
        })
    }

    update(data) {

    }

    delete(data) {

    }
}

module.exports = connection => new UploadDao(connection);