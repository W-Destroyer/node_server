exports.user = {
    insert:'INSERT INTO sh_admin(a_id, a_userName, a_password) VALUES(0,?,?);',
    update:'update sh_admin set a_userName=?, s_value=? where s_id=?;',
    delete: 'DELETE FROM sh_admin WHERE a_id=?;',
    queryById: 'SELECT * FROM sh_admin WHERE a_id=?;',
    queryAll: 'SELECT * FROM sh_admin;'
}

exports.sysconfig = {
    insert:'INSERT INTO sh_sysconfig(s_type, s_name, s_value) VALUES(?,?,?);',
    update:'update sh_sysconfig set s_name=?, s_value=? where s_id=?;',
    delete: 'DELETE FROM sh_sysconfig WHERE s_id=?;',
    lastInsert: 'SELECT * FROM sh_sysconfig WHERE s_id=LAST_INSERT_ID()',
    queryById: 'SELECT * FROM sh_sysconfig WHERE s_id=?;',
    queryByType: 'select * from sh_sysconfig where s_type like ?;',
    queryAll: 'SELECT * FROM sh_sysconfig;'
}

exports.classify = {
    insert:'INSERT INTO sh_type(t_id, t_typename, t_desp, t_parentId) VALUES(0,?,?);',
    update:'update sh_type set a_userName=?, s_value=? where s_id=?;',
    delete: 'DELETE FROM sh_type WHERE t_id=?;',
    queryById: 'SELECT * FROM sh_type WHERE t_id=?;',
    queryByName: 'select * from sh_type where t_name like ?;',
    queryAll: 'SELECT * FROM sh_type;'
}

exports.product = {
    insert: 'INSERT INTO sh_products(p_name, p_mintype, p_price, p_colors, p_sizes, p_masterPic, p_picture, p_desp) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
    queryByType: 'SELECT * FROM sh_products WHERE p_mintype=?;',
    queryById: 'SELECT * FROM sh_products WHERE p_id=?;',
    queryAll: 'SELECT p_id,p_name,p_price,t_id,t_typename FROM sh_products left join sh_type on sh_products.p_mintype = sh_type.t_id;'
}

exports.news = {
    insert:'INSERT INTO sh_news(t_id, t_typename, t_desp, t_parentId) VALUES(0,?,?);',
    update:'update sh_news set a_userName=?, s_value=? where s_id=?;',
    delete: 'DELETE FROM sh_news WHERE a_id=?;',
    queryShowCount: 'SELECT n_desc FROM sh_news WHERE n_type=?',
    queryById: 'SELECT * FROM sh_news WHERE s_id=?;',
    queryByName: 'select * from sh_news where s_name like ?;',
    queryAll: 'SELECT * FROM sh_news;'
}

exports.article = {
    insert: 'INSERT INTO sh_article(a_id)',
    queryAll: 'SELECT * FROM sh_article'
}

exports.file = {
    insert: 'INSERT INTO sh_file(f_originalName, f_newName, f_path, f_type) VALUES(?, ?, ?, ?)',
    lastInsert: 'SELECT * FROM sh_file WHERE f_id=LAST_INSERT_ID()',
}
