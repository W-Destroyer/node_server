const fileSql = require('./sqlmap').file;
const uploadORM = require('../orm/orm_upload');

class UploadDao {
    constructor(connection) {
        this.connection = connection;
    }

    add(data) {
        var sql = uploadORM.insert({
            originalName: data.name,
            newName: data.name,
            path: data.path,
            type: data.type
        });

        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err)
                    return reject(err);
                var getLastInsertId = uploadORM.getLastInsertId();
                this.connection.query(getLastInsertId, (err, result) => {
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