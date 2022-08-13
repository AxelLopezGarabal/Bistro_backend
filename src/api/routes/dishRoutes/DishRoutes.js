const express = require('express');
const router = express.Router();

const { DishDao } = require('../../../main/dao/dishDao/DishDao');
const { DishGarnishDao } = require('../../../main/dao/relationDao/dishGarnishDao/DishGarnishDao');
const { Dish } = require('../../../main/model/dish/Dish');

const dao = new DishDao();
const daoR = new DishGarnishDao();

router.get('/dish=:id', (req, res, next) => {
    dao.getById(req.params.id).then(dishR => {
        res.send({
            title: 'The dish requested by id',
            typeOfRequest: "GET",
            data : dishR
        });
    }).catch(getErr => {res.send(getErr);});
});

router.get('/dish=:id/garnishes', (req, res, next) => {
    daoR.getGarnishes(req.params.id).then(garnishesR => {
        res.send({
            title: 'The garnishes of the dish with the id',
            typeOfRequest: "GET",
            data : garnishesR
        });
    }).catch(getRErr => {res.send(getRErr.message)});
});

router.post('/dish', (req, res, next) => {
    const temp = req.body;
    console.log("struture has been check");
    const newDish = new Dish(0, temp.name, temp.type, [], temp.price, temp.image);
    dao.saveDish(newDish).then(daoRes => {
        res.send({
            title: 'A new dish has been added',
            typeOfRequest: 'POST',
            id: daoRes,
            relatedLinks: ['http://localhost:3001/api/garnish='+ daoRes]
        });
    }).catch(saveErr => {res.send(saveErr.message)});
});

router.post('/dish=:dishId/relatedToGarnish=:garnishId', (req, res, next) => {
    daoR.saveGarnish(req.params.dishId, req.params.garnishId).then(daoResponse => {
        res.send({
            title: 'A new dish has been added',
            typeOfRequest: 'POST',
            dish_Id: req.params.dishId,
            garnish_Id: req.params.garnishId,
            relatedLinks: [
                'http://localhost:3001/api/garnish='+ req.params.garnishId,
                'http://localhost:3001/api/dish='+ req.params.dishId,
                'http://localhost:3001/api/dish='+ req.params.dishId+"/garnishes"
            ]
        });
    }).catch(saveRErr => {res.send(saveRErr.message)});
});

router.put('/dish=:id', (req, res, next) => {

});

router.delete('/dish=:id', (req, res, next) => {
    daoR.deleteGarnishes(req.params.id).then(deleteRRes=> {
        dao.deleteDish(req.params.id).then(deleteRes => {
            res.send({
                title: 'The dish has been deleted',
                typeOfRequest: 'DELETE',
                dish_Id: req.params.id
            });
        }).catch(deleteErr => {res.send(deleteErr.message)});
    }).catch(deleteRErr => {res.send(deleteRErr.message)});
});

module.exports = router;