const mysql = require('mysql');
const dbConfig = require('../config/db.config');

function createPool() {
    return mysql.createPool(dbConfig);
}

module.exports = createPool();