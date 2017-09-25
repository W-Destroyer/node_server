/**
 * Table sysconfig 系统配置表
 */

// 公司名称
exports.updateCompanyName = data => {
    var name = data.name;

    return {
        statement: 'UPDATE sh_sysconfig set value = ? WHERE `type` = "basicinfo" AND `name` = "companyName"',
        data: [name]
    }
}

exports.queryCompanyName = () => {

    return {
        statement: 'SELECT id, name, value, sort FROM sh_sysconfig WHERE `type` = "basicinfo" AND `name` = "companyName"',
        data: []
    }
}

// 友情链接 相关
exports.createFriendLink = data => {
    var name = data.name;
    var value = data.value;

    return {
        statement: 'INSERT INTO sh_sysconfig(type, name, value) VALUES("friendLink", ?, ?)',
        data: [name, value]
    }
}

exports.updateFriendLink = data => {
    var id = data.id;
    var name = data.name;
    var value = data.value;

    return {
        statement: 'UPDATE sh_sysconfig SET name = ?, value = ? WHERE id = ?',
        data: [name, value, id]
    }
}

exports.queryFriendLink = data => {

    return {
        statement: 'SELECT id, name, value, sort FROM sh_sysconfig WHERE `type` = "friendLink" AND isShow = 1',
        data: []
    }
}

exports.deleteFriendLink = data => {
    var id = data.id;

    return {
        statement: 'DELETE FROM sh_sysconfig WHERE id = ?',
        data: [id]
    }
}

// 轮播图相关
exports.createBanner = data => {

    return {
        statement: 'INSERT INTO sh_sysconfig(type, name, value) VALUES(baseinfo, friendLink, ?)',
        data: []
    }
}

exports.updateBanner = data => {

    return {
        statement: 'UPDATE sh_sysconfig SET VALUE = ? WHERE id = ?',
        data: []
    }
}

exports.queryBanner = data => {

    return {
        statement: 'SELECT id, name, value, sort FROM sh_sysconfig where type = "banner" AND isShow = 1',
        data: []
    }
}

exports.deleteBanner = data => {

    return {
        statement: 'DELETE FROM sh_sysconfig WHERE id in()',
        data: []
    }
}
