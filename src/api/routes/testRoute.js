const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    const ads = [
        {title: 'Hello, world (again)!'}
    ];    
    res.send(ads);
});

module.exports = router;