var sysconfigSql = require('./sqlmap').sysconfig;


class SysConfigDao {
    
    constructor(connection) {
        this.connection = connection;
    }

    getCompanyName() {
        return new Promise((resolve, reject) => {
            this.connection.query(sysconfigSql.queryByType, ['basicinfo'], (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                var companyName = result.find(item => item['s_name'] == 'companyName');
                resolve({
                    code: 0,
                    data: companyName
                });
            })
        })
    }

    setCompanyName(data) {
        return this.getCompanyName().then(result => {
            if (!result)
                return new Promise((resolve, reject) => {
                    this.connection.query(sysconfigSql.insert, ['basicinfo', 'companyName', data.companyName], (err, result) => {
                        if(err instanceof Error)
                            reject(err);
                        resolve({
                            code: 0,
                            data: data.companyName
                        })
                    })
                });
            return new Promise((resolve, reject) => {
                var id = result['s_id'];
                this.connection.query(sysconfigSql.update, ['companyName', data.companyName, id], (err, result) => {
                    console.log(result)
                    if(err instanceof Error)
                        reject(err);
                    resolve({
                        code: 0,
                        data: data.companyName
                    })
                })
            });
        });
    }

    listFriendLink(data) {
        // var name = data.name
        return new Promise((resolve, reject) => {
            this.connection.query(sysconfigSql.queryByType, ['friendLink'], (err, result) => {
                if(err instanceof Error)
                    return reject(err);
                resolve({
                    code: 0,
                    data: result
                });
            });
        })
    }

    saveFriendLink(data) {
        return new Promise((resolve, reject) => {
            if (data.id === -1) {
                this.connection.query(sysconfigSql.insert, ['friendLink', data.name, data.address], (err, result) => {
                    if (err instanceof Error)
                        return reject(err);
                    this.connection.query(sysconfigSql.lastInsert, (err, result) => {
                        if(err instanceof Error)
                            return reject(err);
                        resolve({
                            code: 0,
                            data: result
                        })
                    })
    
                })
            } else {
                this.connection.query(sysconfigSql.update, [data.name, data.address, data.id], (err, result) => {
                    if (err instanceof Error)
                        return reject(err);
                    this.connection.query(sysconfigSql.queryById, [data.id], (err, result) => {
                        if (err instanceof Error)
                            return reject(err)
                        resolve({
                            code: 0,
                            data: result[0]
                        })
                    });
                })
            }
        })
    }

    listBanner(data) {
        return new Promise((resolve, reject) => {
            this.connection.query(sysconfigSql.queryByType, ['banner'], (err, result) => {
                if(err instanceof Error)
                    return reject(err);
                resolve(result);
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

module.exports = connection => new SysConfigDao(connection);
