const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

function getDirByDay(date) {
    var yy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    return yy + (mm < 10 ? '0' + mm : mm) + dd;
}

router.post('/productImages', (req, res) => {

    var data = {};
    var files = [];

    var form = new formidable.IncomingForm({
        encoding: 'utf-8',
        keepExtensions: true,
        maxFieldsSize: 2 * 1024 * 1024,
        uploadDir: path.resolve('upload/' + getDirByDay(new Date()))
    });

    form.parse(req)
        .on('progress', () => {
            // console.log(arguments)
        }).on('field', (name, value) => {
            // console.log(arguments)

        }).on('file', (name, file) => {
            // console.log(arguments)

        }).on('end', () => {
            res.sendJSON({
                code: 0,
                data: 'success'
            })
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