const express = require('express');
const router = express.Router();

const { Garnish } = require('../../../main/model/dish/Garnish');
const { GarnishDao } = require('../../../main/dao/garnishDao/GarnishDao');

const dao = new GarnishDao();

router.get('/garnish=:id', (req, res, next) => {
    dao.getById(req.params.id).then(daoResponse => {
        res.send({
            title: 'The garnish requested by id',
            typeOfRequest: "GET",
            data : daoResponse
        });
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
            title: 'A new garnish has been added',
            typeOfRequest: 'POST',
            newGarnishId: daoResponse,
            relatedLinks: ['http://localhost:3001/api/garnish='+ daoResponse]
        });
    }).catch(err => {
        res.send(err.message);
    })
});

router.put('/garnish=:id', (req, res, next) => {
    const temp = req.body;
    const tempId = req.params.id;
    dao.getById(tempId).then(retrivedGarnish => {
        retrivedGarnish.setName(temp.name);
        retrivedGarnish.setPrice(temp.price);

        return retrivedGarnish;
    }).then(updetedGarnish => {
        dao.updateGarnish(updetedGarnish).then(response => {
            res.status(200).send({
                title: 'The garnish has been updated',
                typeOfRequest: "PUT",
                newGarnishId: response,
                relatedLinks: ['http://localhost:3001/api/garnish='+ response]
            });
        }).catch(updateErr => {
            res.send(updateErr.message);
        });
    }).catch(getErr => {
        res.send(getErr.message);
    })
    
});

router.delete('/garnish=:id', (req, res, next) => {
    dao.deleteGarnish(req.params.id).then(daoResponse => {
        res.send({
            title: "The garnish has been deleted",
            typeOfRequest: "DELETE",
            targetedId: req.params.id,
        });
    }).catch(err => {
        res.send(err.message);
    });
});

module.exports = router;