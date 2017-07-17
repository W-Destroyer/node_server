const mysql = require('mysql');
const dbConfig = require('../config/db.config');

const pool = mysql.createPool(dbConfig);

function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err)
                reject(err);
            else
                resolve(connection);
        })
    });
}

function routeMiddleware(cb) {
    return function(req, res) {
        var url = req.url;
        var ip = req.ip;
        var startTime = Date.now();
        var userAgent = req.headers['user-agent'];
        var method = req.method;
        console.log({
            url: url,
            ip: ip,
            userAgent: userAgent
        })
        getConnection().then(connection => {
            // 很难受 暂时还不能使用async和await
            // 目前使用的Node版本为稳定版 6.8 
            // async和await在Node7.6中实现支持
            // try {
            //     await cb(connection, req, res);
            //     connection.release();
            // } catch(err) {
            //     res.send(err);
            // }
            cb(req, res, connection, () => connection.release())
        }).catch(err => {
            res.send(err);
        })
    }
}

module.exports = routeMiddleware;