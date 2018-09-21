const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('GET /wiki');
})

router.post('/', (req, res, next) => {
    res.send('POST /wiki');
})

router.get('/add', (req, res, next) => {
    res.send('GET /wiki/add');
})


module.exports = router;