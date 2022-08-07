var assert = require('assert');
const { DishGarnishDao } = require('../../../main/dao/relationDao/dishGarnishDao/DishGarnishDao');
const { DishDao } = require('../../../main/dao/dishDao/DishDao');
const { GarnishDao } = require('../../../main/dao/garnishDao/GarnishDao');
const { Dish } = require('../../../main/model/dish/Dish');
const { Garnish } = require('../../../main/model/dish/Garnish');

describe('Tests of the DishGarnish_DAO module', function () {

    var dao = new DishGarnishDao();
    var dishDao = new DishDao();
    var garnishDao = new GarnishDao();

    const dish = new Dish(0, "pizza", "main", [], 750.0, "./pizza");
    const garnish1 = new Garnish(0, "Tomato sauce", 200.0);
    const garnish2 = new Garnish(0, "Chease", 400.0);

    describe('#getAllGarnishes', function () {
        it('gets an employee passed as parameter', function () {
            dishDao.saveDish(dish).then(idDish => {
                garnishDao.saveGarnish(garnish1).then(idGar1 => {
                    dao.saveGarnish(idDish, idGar1).then(res => {
                        garnishDao.saveGarnish(garnish2).then(idGar2 => {
                            dao.saveGarnish(idDish, idGar2).then(res => {
                                dao.getGarnishes(idDish).then(garnishes => {
                                    assert.equal(garnishes.length, 2);
                                    assert.equal(garnishes[0].getId(), idGar1);
                                    assert.equal(garnishes[1].getId(), idGar2);
                                }).then(res => {
                                    dao.deleteGarnishes(idDish).then(res => {
                                        dishDao.deleteDish(idDish);
                                        garnishDao.deleteGarnish(idGar1);
                                        garnishDao.deleteGarnish(idGar2);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    describe('#saveGarnish', function () {
        it('gets an employee passed as parameter', function () {
            dishDao.saveDish(dish).then(idDish => {
                garnishDao.saveGarnish(garnish1).then(idGar1 => {
                    dao.saveGarnish(idDish, idGar1).then(res => {
                        dao.getGarnishes(idDish).then(res => {
                            assert.equal(res.length, 1);
                            assert.equal(res[0].getId(), idGar1);
                        }).then(res => {
                            dao.deleteGarnish(idDish, idGar1).then(res => {
                                garnishDao.deleteGarnish(idGar1);
                                dishDao.deleteDish(idDish);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('#deleteGarnish', function () {
        it('gets an employee passed as parameter', function () {
            dishDao.saveDish(dish).then(idDish => {
                garnishDao.saveGarnish(garnish1).then(idGar1 => {
                    dao.saveGarnish(idDish, idGar1).then(res => {
                        garnishDao.saveGarnish(garnish2).then(idGar2 => {
                            dao.saveGarnish(idDish, idGar2).then(res => {
                                dao.getGarnishes(idDish).then(garnishes => {
                                    assert.equal(garnishes.length, 2);
                                    assert.equal(garnishes[0].getId(), idGar1);
                                    assert.equal(garnishes[1].getId(), idGar2);
                                }).then(res => {
                                    dao.deleteGarnish(idDish, idGar2).then(res => {
                                        dao.getGarnishes(idDish).then(garnishes => {
                                            assert.equal(garnishes.length, 1);
                                            assert.equal(garnishes[0].getId(), idGar1);
                                        }).then(res => {
                                            dao.deleteGarnishes(idDish).then(res => {
                                                dishDao.deleteDish(idDish);
                                                garnishDao.deleteGarnish(idGar1);
                                                garnishDao.deleteGarnish(idGar2);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });


    describe('#deleteGarnishes', function () {
        it('gets an employee passed as parameter', function () {
            dishDao.saveDish(dish).then(idDish => {
                garnishDao.saveGarnish(garnish1).then(idGar1 => {
                    dao.saveGarnish(idDish, idGar1).then(res => {
                        garnishDao.saveGarnish(garnish2).then(idGar2 => {
                            dao.saveGarnish(idDish, idGar2).then(res => {
                                dao.getGarnishes(idDish).then(garnishes => {
                                    assert.equal(garnishes.length, 2);
                                    assert.equal(garnishes[0].getId(), idGar1);
                                    assert.equal(garnishes[1].getId(), idGar2);
                                }).then(res => {
                                    dao.deleteGarnishes(idDish).then(res => {
                                        dao.getGarnishes(idDish).then(garnishes => {
                                            assert.equal(garnishes.length, 0);
                                        }).then(res => {
                                            dishDao.deleteDish(idDish);
                                            garnishDao.deleteGarnish(idGar1);
                                            garnishDao.deleteGarnish(idGar2);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

});