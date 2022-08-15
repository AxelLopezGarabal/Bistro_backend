const express = require('express');
const router = express.Router();

const { DishDao } = require('../../../main/dao/dishDao/DishDao');
const { DishGarnishDao } = require('../../../main/dao/relationDao/dishGarnishDao/DishGarnishDao');
const { MenuDishDao } = require('../../../main/dao/relationDao/menuDishDao/MenuDishDao');
const { Dish } = require('../../../main/model/dish/Dish');

const dao = new DishDao();
const daoR = new DishGarnishDao();
const daoM = new MenuDishDao();

router.get('/dish=:id', (req, res, next) => {
    dao.getById(req.params.id).then(dishR => {
        res.send({
            title: 'The dish requested by id',
            typeOfRequest: "GET",
            data : dishR
        });
    }).catch(getErr => {res.send(getErr.message);});
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
    const temp = req.body;
    dao.getById(req.params.id).then(dishR => {
        dishR.setName(temp.name);
        dishR.setType(temp.price);
        dishR.setPrice(temp.price);
        dishR.setImage(temp.image);
        dao.updateDish(dishR).then(updateRes => {
            res.send({
                title: 'The dish has been updates',
                typeOfRequest: 'PUT',
                dish_Id: req.params.id,
                relatedLinks: [
                    'http://localhost:3001/api/dish='+ req.params.dishId,
                    'http://localhost:3001/api/dish='+ req.params.dishId+"/garnishes"
                ]
            })
        }).catch(updateErr => {res.send(updateErr.message)});
    }).catch(getErr => {res.send(getErr.message)});
});

router.delete('/dish=:id', (req, res, next) => {
    daoM.deleteDishRelation(req.params.id).then(daoMRes => {
        daoR.deleteGarnishes(req.params.id).then(deleteRRes=> {
            dao.deleteDish(req.params.id).then(deleteRes => {
                res.send({
                    title: 'The dish has been deleted',
                    typeOfRequest: 'DELETE',
                    dish_Id: req.params.id
                });
            }).catch(deleteErr => {res.send(deleteErr.message)});
        }).catch(deleteRErr => {res.send(deleteRErr.message)});
    }).catch(daoMErr => {res.send(daoMErr.message)});
});

module.exports = router;