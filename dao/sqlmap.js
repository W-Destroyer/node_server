exports.user = {
    insert:'INSERT INTO sh_admin(id, userName, password) VALUES(0,?,?);',
    update:'update sh_admin set userName=?, value=? where id=?;',
    updateByName: 'UPDATE sh_admin SET token=?, lastLoginTime=? WHERE userName=?',
    delete: 'DELETE FROM sh_admin WHERE id=?;',
    queryById: 'SELECT * FROM sh_admin WHERE id=?;',
    queryByName: 'SELECT * FROM sh_admin WHERE userName=?',
    queryAll: 'SELECT * FROM sh_admin;'
}

exports.sysconfig = {
    insert:'INSERT INTO sh_sysconfig(type, name, value) VALUES(?,?,?);',
    update:'update sh_sysconfig set name=?, value=? where id=?;',
    delete: 'DELETE FROM sh_sysconfig WHERE id=?;',
    lastInsert: 'SELECT * FROM sh_sysconfig WHERE id=LAST_INSERT_ID()',
    queryById: 'SELECT * FROM sh_sysconfig WHERE id=?;',
    queryByType: 'select * from sh_sysconfig where type like ?;',
    queryAll: 'SELECT * FROM sh_sysconfig;'
}

exports.classify = {
    insert:'INSERT INTO sh_type(t_id, t_typename, t_desp, t_parentId) VALUES(0,?,?);',
    update:'update sh_type set userName=?, value=? where id=?;',
    delete: 'DELETE FROM sh_type WHERE t_id=?;',
    queryById: 'SELECT * FROM sh_type WHERE t_id=?;',
    queryByName: 'select * from sh_type where t_name like ?;',
    queryAll: 'SELECT * FROM sh_type;'
}

exports.product = {
    insert: 'INSERT INTO sh_products(p_name, p_mintype, p_price, p_colors, p_sizes, p_masterPic, p_picture, p_desp) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
    queryByType: 'SELECT * FROM sh_products WHERE p_mintype=?;',
    queryById: 'SELECT * FROM sh_products WHERE p_id=?;',
    queryAll: 'SELECT p_id,p_name,p_price,p_amount,t_id,t_typename,p_masterPic FROM sh_products left join sh_type on sh_products.p_mintype = sh_type.t_id;'
}

exports.news = {
    insert:'INSERT INTO sh_news(t_id, t_typename, t_desp, t_parentId) VALUES(0,?,?);',
    update:'update sh_news set userName=?, value=? where id=?;',
    delete: 'DELETE FROM sh_news WHERE id=?;',
    queryShowCount: 'SELECT n_desc FROM sh_news WHERE n_type=?',
    queryById: 'SELECT * FROM sh_news WHERE id=?;',
    queryByName: 'select * from sh_news where name like ?;',
    queryAll: 'SELECT * FROM sh_news;'
}

exports.article = {
    insert: 'INSERT INTO sh_article(id)',
    queryAll: 'SELECT * FROM sh_article'
}

