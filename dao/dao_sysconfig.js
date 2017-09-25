var sysconfigSql = require('./sqlmap').sysconfig;
var sysconfigORM = require('../orm/orm_sysconfig');

class SysConfigDao {
    
    constructor(connection) {
        this.connection = connection;
    }

    // 公司名称相关
    getCompanyName() {
        var sql = sysconfigORM.queryCompanyName();
        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                var companyName = result[0] ? result[0].value : '';
                resolve(companyName);
            })
        })
    }

    setCompanyName(data) {
        var sql = sysconfigORM.updateCompanyName({
            name: data.name
        });

        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve();
            })
        })
    }

    // 友情链接相关
    listFriendLink(data) {

        var sql = sysconfigORM.queryFriendLink();
        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if(err instanceof Error)
                    return reject(err);
                resolve(result);
            });
        })
    }

    createFriendLink(data) {
        var sql = sysconfigORM.createFriendLink({
            name: data.name,
            value: data.value
        });

        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve();
            });
        })
    }

    updateFriendLink(data) {
        var sql = sysconfigORM.updateFriendLink({
            id: data.id,
            name: data.name,
            value: data.value
        });

        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve();
            })
        })
    }

    deleteFriendLink(data) {
        var sql = sysconfigORM.deleteFriendLink({
            id: data.id
        });

        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve();
            })
        })
    }

    // 轮播图 相关
    listBanner(data) {
        var sql = sysconfigORM.queryBanner(data);

        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if(err instanceof Error)
                    return reject(err);
                resolve(result);
            })
        })
    }

    createBanner(data) {
        var sql = sysocnfigORM.createBanner(data);

        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve()
            });
        });
    }

    updateBanner(data) {
        var sql = sysconfigORM.updateBanner(data);

        return new Promise((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve();
            });
        });
    }

    deleteBanner(data) {
        var sql = sysconfigORM.deleteBanner(data);

        return new Promsie((resolve, reject) => {
            this.connection.query(sql.statement, sql.data, (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve();
            });
        });
    }
}

module.exports = connection => new SysConfigDao(connection);
