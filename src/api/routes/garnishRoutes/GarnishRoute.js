const express = require('express');
const router = express.Router();

const { Garnish } = require('../../../main/model/dish/Garnish');
const { GarnishDao } = require('../../../main/dao/garnishDao/GarnishDao');

const dao = new GarnishDao();

router.get('/garnish=:id', (req, res, next) => {
    dao.getById(req.params.id).then(daoResponse => {
        res.send(daoResponse);
    }).catch(err => {
        res.send(err.message);
    });
});

router.post('/garnish', (req, res, next) => {
    const temp = req.body;
    console.log("struture has been check");
    const newGarnish = new Garnish(0, temp.name, temp.price);
    dao.saveGarnish(newGarnish).then(daoResponse => {
        res.status(201).send({
            title: 'a new garnish has been added',
            newGarnishId: daoResponse,
            relatedRequest: 'http://localhost:3001/api/garnish=idGarnish'
        });
    }).catch(err => {
        res.send(err.message);
    })
});

router.put('/garnish=:id', (req, res, next) => {
    const temp = req.body;
    const tempId = req.params.id;
    console.log("id has been check");
    console.log("struture has been check");
    const ads =  {
        requestedId: tempId,
        message: temp
    };    
    res.send(ads);
});

router.delete('/garnish=:id', (req, res, next) => {
    dao.deleteGarnish(req.params.id).then(daoResponse => {
        res.send({
            title: "the garnish has been deleted",
            targetedId: req.params.id
        });
    }).catch(err => {
        res.send(err.message);
    });
});

module.exports = router;