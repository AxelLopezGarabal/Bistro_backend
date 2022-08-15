const express = require('express');
const router = express.Router();

const { MenuDao } = require('../../../main/dao/menuDao/MenuDao');
const { MenuDishDao } = require('../../../main/dao/relationDao/menuDishDao/MenuDishDao');

const dao = new MenuDao();
const daoR = new MenuDishDao();

router.get('/menu=:id', (req, res, next) => {
    dao.getMenu(req.params.id).then(daoResponse => {
        daoR.getDishes(req.params.id).then(dishesR => {
            res.send({
                title: 'The dishes of the menu',
                typeOfRequest: "GET",
                menuId: req.params.id,
                data : dishesR
            });
        }).catch(getRErr => {res.send(getRErr.message)});
    }).catch(daoErr => {res.send(daoErr.message)});
});

router.post('/menu', (req, res, next) => {
    dao.saveMenu().then(daoRes => {
        res.send({
            title: 'The dishes of the menu',
            typeOfRequest: "POST",
            menuId: daoRes
        })
    }).catch(saveErr => {res.send(saveErr.message)});
});

router.post('/menu=:menuId/relateToDish=:dishId', (req, res, next) => {
    daoR.saveDish(req.params.menuId, req.params.dishId).then(daoRes => {
        res.send({
            title: 'The dishes of the menu',
            typeOfRequest: "POST",
            menuId: req.params.menuId,
            dishId: req.params.dishId
        })
    }).catch(saveRErr => {res.send(saveRErr.message)});
});

router.delete('/menu=:id', (req, res, next) => {
    daoR.deleteDishes(req.params.id).then(daoRRes => {
        dao.deleteMenu(req.params.id).then(daoRes => {
            res.send({
                title: 'The menu has been deleted',
                typeOfRequest: 'DELETE',
                menu_Id: req.params.id
            });
        }).catch(daoErr => {res.send(daoErr.message)});
    }).catch(deleteRErr => {res.send(deleteRErr.message)});
});

router.delete('/menu=:menuId/dish=:dishId', (req, res, next) => {
    daoR.deleteDish(req.params.menuId, req.params.menuId).then(daoRRes => {
        res.send({
            title: 'The dish has been deleted from the menu',
            typeOfRequest: 'DELETE',
            menu_Id: req.params.menuId,
            dish_Id: req.params.dishId
        });
    }).catch(daoRErr => {res.send(daoRErr.message)});
})

module.exports = router;