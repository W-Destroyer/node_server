var classifySql = require('./sqlmap').classify;
var classifyORM = require('../orm/orm_classify');

class ClassifyDao {
    
    constructor(connection) {
        this.connection = connection;
        
        this.SQL = {

        }
    }

    listClassify(data) {
        // var name = data.name
    
        return new Promise((resolve, reject) => {
            this.connection.query(classifyORM.query(), function(err, result) {
                if(err instanceof Error)
                    return reject(err);
                resolve(result);
            });
        })
    }

    list(data) {
        var sql = classifyORM.query();
        console.log(sql)
        return new Promise((resolve, reject) => {
            this.connection.query(classifyORM.query(), (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve(result);
            })
        })
    }

    create(data) {
        var sql = classifyORM.insert(data);
        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve(result);
            })
        })
    }

    update(data) {
        var sql = classifyORM.update(data);
        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve(result);
            });
        })
    }

    delete(data) {
        var sql = classifyORM.delete(data);
        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve(result);
            })
        })
    }
}

module.exports = connection => new ClassifyDao(connection);
