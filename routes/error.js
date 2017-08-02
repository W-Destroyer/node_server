const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
    var err = new Error(req.url + ' Not Found');
    res.sendJSON(err);
});

module.exports = router;