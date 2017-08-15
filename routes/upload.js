const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const UploadDao = require('../dao/dao_upload');

function getDirByDay(date) {
    var yy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    return yy + (mm < 10 ? '0' + mm : mm) + dd;
}

function mkdir(dir) {
    return new Promise((resolve, reject) => {
        mkdirp(dir, e => {
            if (e)
                return reject(e);
            resolve()
        })
    })
}

router.post('/productImages', (req, res) => {
    var dateDir = getDirByDay(new Date());
    var pathDir = `upload/${dateDir}`;

    var form = new formidable.IncomingForm({
        encoding: 'utf-8',
        keepExtensions: true,
        maxFieldsSize: 2 * 1024 * 1024,
        uploadDir: path.resolve('upload/temp')
    })

    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.sendJSON(err);
        }
        var uploadType = fields.type;
        var title = fields.title;
        var dateDir = getDirByDay(new Date());
        var pathDir = `upload/${uploadType}/${dateDir}`;
        var pathArr = files[title].path.split('/');
        var fileName = pathArr[pathArr.length - 1].replace('upload', uploadType);

        mkdir(pathDir).then(() => {
            fs.renameSync(files[title].path, path.resolve(`${pathDir}/${fileName}`))
            var picUri = `http://localhost:8080/${uploadType}/${dateDir}/${fileName}`;
            var uploadDao = UploadDao(req.connection);
            uploadDao.add({
                type: uploadType,
                name: files[title].name,
                path: picUri
            }).then((result) => {
                res.sendJSON({
                    code: 0,
                    data: {
                        id: result[0]['f_id'],
                        path: result[0]['f_path'],
                    }
                })
            }).catch(err => {
                res.sendJSON(err);
            })
        }).catch(err => {
            res.sendJSON(err);
        });
    });

    // 直接输出stream到文件中
    // var _writeStream = new fs.WriteStream(path.resolve('upload/111.png'));
    // req.on('data', chunk => {
    //     console.log(chunk)
    //     _writeStream.write(chunk);
    // });

    // req.on('end', () => {
    //     _writeStream.end();
    //     res.setHeader('Content-Type', 'application/json');
    //     res.sendJSON({
    //         code: 0,
    //         data: 'success'
    //     })
    // });

})

module.exports = router;