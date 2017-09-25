/**
 * Table files 文件管理
 * @type {Object}
 */

exports.insert = data => {
    var originalName = data.originalName;
    var newName = data.newName;
    var path = data.path;
    var type = data.type;

    return {
        statement: 'INSERT INTO sh_file(originalName, newName, path, type) VALUES(?, ?, ?, ?)',
        data: [originalName, newName, path, type]
    }
}

exports.getLastInsertId = () => {
    return 'SELECT * FROM sh_file WHERE id=LAST_INSERT_ID()'
}