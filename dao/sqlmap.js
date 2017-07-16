const user = {
    insert:'INSERT INTO sh_admin(a_id, a_userName, a_password) VALUES(0,?,?);',
    update:'update sh_admin set name=?, age=? where id=?;',
    delete: 'DELETE FROM sh_admin WHERE a_id=?;',
    queryById: 'SELETE * FROM sh_admin WHERE a_id=?;',
    queryAll: 'SELETE * FROM sh_admin;'
}

exports.user = user;