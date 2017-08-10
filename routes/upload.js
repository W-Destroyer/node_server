const express = require('express');
const router = express.Router();
const formidable = require('formidable');


router.post('/prodcutImages', (req, res) => {
    var form = new formidable.IncomingForm({
        encoding: 'utf-8',
    });

    form.parse(req)
        .on('progress', () => {

        }).on('field', (name, value) => {

        }).on('file', (name, file) => {

        }).on('end', () => {
            
        })

})

module.exports = router;