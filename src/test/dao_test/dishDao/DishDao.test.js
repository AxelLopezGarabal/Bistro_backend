var assert = require('assert');
const { DishDao } = require('../../../main/dao/dishDao/DishDao');
const { Dish } = require('../../../main/model/dish/Dish');

describe('Tests of the Garnish_DAO module', function () {

    var dao = new DishDao();
    const dish = new Dish(0, "Pizza", "main", [], 400.0, "./pizzaImage");
    const dishP = new Dish(3, "Hamburgesa", "main", [], 1000.0, "./hamburgesa");

    describe('#saveDish', function () {
        it('adds an employee passed as parameter', function () {
            dao.saveDish(dish).then(res => {
              lastId = res;
              return lastId;
            }).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    dao.deleteDish(res);
                });
            });
        });
    });

    describe('#getById', function(){
        it('get the employee from the db using the id passed as parameter', function () {
            dao.saveDish(dishP).then(result => {
                dao.getById(result).then(res => {
                    assert.equal(res.getId(), result);
                    assert.equal(res.getName(), dishP.getName());
                    assert.equal(res.getPrice(), dishP.getPrice());
                    assert.equal(res.getType(), dishP.getType());
                    assert.equal(res.getImage(), dishP.getImage());

                    return res.getId();
                }).then(res => {
                    dao.deleteDish(res);
                });
            });
        });
    });


    describe('#deleteEmployee', function () {
        it('deletes an employee passed as parameter', function () {
            dao.saveDish(dish).then(res => {
                dao.deleteDish(res).then(result => {
                    assert.equal(result.affectedRows, 1);
                });
            });
        });
    });


    describe('#update Employee', function () {
        it('update an employee passed as parameter', function () {
            dao.saveDish(dish).then(res => {
                lastId = res;
                return lastId;
            }).then(res => {
                dao.getById(res).then(result => {
                    assert.equal(result.getId(), res);
                    assert.equal(result.getName(), dish.getName());
                    assert.equal(result.getPrice(), dish.getPrice());

                    return result;
                }).then(res => {
                    res.setName("1/4 de libra");
                    res.setPrice(550.5);
                        
                    dao.updateDish(res).then(res => {
                        dao.getById(res).then(res => {
                            assert.notEqual(res.getName(), dish.getName());
                            assert.notEqual(res.getPrice(), dish.getPrice());

                            assert.equal(res.getName(), "1/4 de libra");
                            assert.equal(res.getPrice(), 550.5);
                            assert.equal(res.getImage(), dish.getImage());
                            assert.equal(res.getType(), dish.getType());

                            return res.getId();
                        }).then(res => {
                            dao.deleteDish(res);
                        });
                    });
                })
            });
            
        });
    });

});