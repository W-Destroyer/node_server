var userSql = require('./sqlmap').user;


class UserDao {
    
    constructor(connection) {
        this.connection = connection;
    }

    login(data) {
        var username = data.username;
        var password = data.password;

        return new Promise((resolve, reject) => {
            this.connection.query(userSql.queryByName, [username], (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                if (!result.length)
                    return reject(new Error('用户名或密码错误！'));
                if (result[0]['a_password'] !== password)
                    return reject(new Error('用户名或密码错误！'));
                resolve();
            })
        })
    }

    setToken(data) {
        var username = data.username;
        var lastLoginTime = data.lastLoginTime;
        var token = data.token;
        return new Promise((resolve, reject) => {
            this.connection.query(userSql.updateByName, [token, lastLoginTime, username], (err, result) => {
                if (err instanceof Error)
                    return reject(err);
                resolve();
            })
        })
    }

    getUserInfoByName(username) {
        // var username = data.username,
        return new Promise((resolve, reject) => {
            this.connection.query(userSql.queryByName, [username], (err, result) => {
                if (err instanceof Error)
                    reject(err);
                resolve(result[0]);
            })
        })
    }

    add(data) {

        var userName = data.userName || 'zhang';
        var password = data.password || '1234567890';
        return new Promise((resolve, reject) => {
            this.connection.query(userSql.insert, [userName, password], function(err, result) {
                if(err instanceof Error)
                    return reject(err);
                resolve({
                    code: 0,
                    message: '添加成功！'
                })
            });
        })
    }

    delete(data) {
        var id = data.id;
        console.log(id);
        console.log(userSql.delete);
        return new Promise((resolve, reject) => {
            this.connection.query(userSql.delete, [id], function(err, result) {
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