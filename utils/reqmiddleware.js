const _ = require('underscore');
// const winston = require('winston');
// const fs = require('fs');
// const path = require('path');
// const logger = require('./showlog');

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

        var resSend = res.send;
        var resRender = res.render;

        res.render = function(page, data, callback) {
            // if(_.isFunction(data)) {
            //     callback = data;
            //     data = {};
            // }
            // if(!_.isFunction(callback)) {
            //     callback = function() {};
            // }
            // data = _.extend(data, {root: ""})
            resRender.call(res, page, data);
            // showLog(data);
        };
        
        res.send = function(data) {

            if ( data instanceof Error){
                var e = data;
                data = {
                    code: -1,
                    message: e.stack || e.message || e.toString,
                    error: e
                };
            } else {
                data = {
                    code: 0,
                    message: "",
                    data: data || ""
                }
            }
            resSend.call(res, data);
            // showLog(data);
        };
        console.log('--------------------------------------------------------')
        next();
    };
}

function verifUser(req, res) {
    var cookies = req.cookies;
    // return false;
}

module.exports = middleware;
