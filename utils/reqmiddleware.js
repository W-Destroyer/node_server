const _ = require('underscore');
// const winston = require('winston');
// const fs = require('fs');
// const path = require('path');
// const logger = require('./showlog');

const mysql = require('mysql');
const dbConfig = require('../config/db.config');

const pool = mysql.createPool(dbConfig);


/**a
 * [middleware description]
 * @method middleware
 * @param  Object   opts [description]
 * @return {[type]}        [description]
 */

function middleware(opts){

    return function(req, res, next) {
        _.extend(req.query, req.body);
        _.extend(req.query, req.params);
        // var showLog = logger(req);
        console.log(req.query);
        getConnection().then(connection => {

            req.connection = connection;
            
            var send = res.send;
            res.sendJSON = function(data) {

                if ( data instanceof Error)
                    data = formatError(data);
                send.call(res, data);
                // showLog(data);
                connection.release();
            };

            next();
        }).catch(err => {
            res.send(formatError(err));
        })
        
    };
}

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

function formatError(err) {
    return {
        code: -1,
        message: err.stack || err.message || err.toString,
        error: err
    }
}

module.exports = middleware;
